import { graphql, useStaticQuery } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";
import React, { useCallback, useState } from "react";
import SongCard from "./song-card";

interface SongListProps {
	select?: number;
	randomizeCallback?: () => number;
	filterCallback?: (s: { node: DataNodeType }) => boolean;
	queryable?: boolean;
	inSong?: boolean;
	className?: string;
}
interface DataNodeType {
	name: string;
	childSongsJson: {
		artists: {
			name: string;
			photo?: string;
		}[];
		name: string;
	};
}
interface DataType {
	allFile: {
		edges: {
			node: DataNodeType;
		}[];
	};
}
const SongList: React.FC<SongListProps> = ({
	select,
	queryable,
	inSong,
	randomizeCallback,
	className,
	filterCallback,
}) => {
	const { t } = useTranslation();
	const result = (useStaticQuery(graphql`
		query {
			allFile(
				filter: { childSongsJson: { name: { ne: null } } }
				sort: { fields: childSongsJson___name, order: ASC }
			) {
				edges {
					node {
						name
						childSongsJson {
							artists {
								name
								photo
							}
							name
						}
					}
				}
			}
		}
	`) as DataType).allFile.edges;
	const data = select
		? result
				.filter(filterCallback || (() => true))
				.sort(randomizeCallback || (() => Math.random()))
				.slice(0, select)
		: result;
	const [query, setQuery] = useState(data);
	const [isSearching, setSearching] = useState(false);
	const search = useCallback(
		(ev: React.ChangeEvent<HTMLInputElement>) => {
			Promise.resolve(ev.currentTarget.value)
				.then(v => {
					setSearching(true);
					return v;
				})
				.then(v =>
					setQuery(
						v.length < 1
							? data
							: data.filter(e =>
									v.split(/[^\w\d]+/).every(t => e.node.name.includes(t))
							  )
					)
				)
				.then(() => setSearching(false))
				.catch(() => {
					setSearching(false);
					setQuery(data);
				});
		},
		[setQuery]
	);
	return (
		<>
			{inSong || (
				<div className="s-songcard-list__header">
					<h2>{t(select ? "songs.selected" : "songs.all")}</h2>
					{queryable && (
						<input
							type="search"
							onChange={search}
							placeholder={t("songs.search")}
						/>
					)}
				</div>
			)}
			<div
				className={
					"s-songcard-list " +
					(inSong ? "s-songcard-list--in-song " : "") +
					className
				}
			>
				{query.length ? (
					query.map((e, i) => (
						<SongCard
							key={i}
							path={e.node.name}
							artists={e.node.childSongsJson.artists
								.map(a => a.name)
								.join(", ")}
							photos={e.node.childSongsJson.artists.map(a => a.photo)}
							name={e.node.childSongsJson.name}
							inSong={inSong}
						/>
					))
				) : (
					<p>{t("songs.not-found")}</p>
				)}
			</div>
		</>
	);
};
export default SongList;
