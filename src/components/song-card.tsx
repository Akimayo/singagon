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
}
const SongCard: React.FC<SongCardProps> = ({
	name,
	path,
	artists,
	photos,
	inSong,
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
	return (
		<Link
			to={`/sing/${path}`}
			className={"s-songcard" + (inSong ? " s-songcard--in-song" : "")}
		>
			<div className="s-songcard__images">
				{photos.map(
					(p, i) => p && <GatsbyImage image={photoMap.get(p)} alt={p} key={i} />
				)}
			</div>
			<h3 className="s-songcard__title">{name}</h3>
			<p className="s-songcard__subtitle">{artists}</p>
		</Link>
	);
};
export default SongCard;
