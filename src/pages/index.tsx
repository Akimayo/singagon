import * as React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import SongList from "../components/song-list";
import { graphql, useStaticQuery } from "gatsby";

const IndexPage = () => {
	const data = useStaticQuery(graphql`
		query {
			site {
				siteMetadata {
					description
					title
				}
			}
		}
	`);
	return (
		<Layout>
			<SEO title="Home" />
			<h1>{data.site.siteMetadata.title}</h1>
			<p>{data.site.siteMetadata.description}</p>
			<SongList select={6} />
		</Layout>
	);
};
export default IndexPage;
