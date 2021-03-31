import { graphql } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";
import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import SongList from "../components/song-list";

const Sing: React.FC = () => {
	const { t } = useTranslation();
	const title = t("nav.sing");
	return (
		<Layout>
			<SEO title={title} />
			<h1>{title}</h1>
			<p>Pick a song from our ever-growing collection!</p>
			<SongList queryable />
		</Layout>
	);
};
export default Sing;

export const query = graphql`
	query($language: String!) {
		locales: allLocale(filter: { language: { eq: $language } }) {
			edges {
				node {
					ns
					data
					language
				}
			}
		}
	}
`;
