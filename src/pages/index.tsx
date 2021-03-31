import * as React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import SongList from "../components/song-list";
import { graphql } from "gatsby";
import { useTranslation } from "react-i18next";

const IndexPage = ({ data }) => {
	const { t } = useTranslation();
	const title = t("app-sub-title", {appName: data.site.siteMetadata.name});
	return (
		<Layout>
			<SEO title={title} />
			<h1>{title}</h1>
			<p>{t("app-description")}</p>
			<SongList select={6} />
		</Layout>
	);
};
export default IndexPage;
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
		site {
			siteMetadata {
				name
			}
		}
	}
`;
