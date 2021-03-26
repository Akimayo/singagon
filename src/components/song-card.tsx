import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { Link } from "gatsby-plugin-react-i18next";
import React from "react";

interface SongCardProps {
	name: string;
	path: string;
	artists: string;
	photos: string[];
	inSong?: boolean;
	youtubeLink?: string;
}
const SongCard: React.FC<SongCardProps> = ({
	name,
	path,
	artists,
	photos,
	inSong,
	youtubeLink,
}) => {
	const photoFiles = useStaticQuery(graphql`
		query {
			allFile(
				filter: { ext: { eq: ".png" }, dir: { glob: "**/images/artists" } }
			) {
				edges {
					node {
						name
						childImageSharp {
							gatsbyImageData(
								height: 250
								placeholder: NONE
								formats: [WEBP, PNG]
							)
						}
					}
				}
			}
		}
	`).allFile.edges;
	const photoMap = new Map<string, any>();
	photoFiles.forEach(p =>
		photoMap.set(p.node.name, p.node.childImageSharp.gatsbyImageData)
	);
	const ytimg =
		youtubeLink &&
		`url('https://i.ytimg.com/vi_webp/${youtubeLink
			.match(/(\?v=([\w\d_\-]+)|\.be\/([\w\d_\-]+))/)
			.slice(2)
			.reduce((all, p) => all + (p || ""), "")}/0.webp')`;
	return (
		<Link
			to={`/sing/${path}`}
			className={"s-songcard" + (inSong ? " s-songcard--in-song" : "")}
		>
			<div
				className="s-songcard__images"
				style={youtubeLink && { backgroundImage: ytimg }}
			>
				{photos.map(
					(p, i) =>
						p && (
							<GatsbyImage
								image={photoMap.get(p)}
								alt={p}
								key={i}
								objectPosition="center bottom"
								objectFit="contain"
							/>
						)
				)}
			</div>
			<h3 className="s-songcard__title">{name}</h3>
			<p className="s-songcard__subtitle">{artists}</p>
		</Link>
	);
};
export default SongCard;
