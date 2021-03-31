/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";
import { useTranslation } from "react-i18next";
interface SEOProps {
	description?: string;
	lang?: string;
	meta?: any[];
	title: string;
}
const SEO: React.FC<SEOProps> = ({
	description = "",
	lang = "en",
	meta = [],
	title,
}) => {
	const { t } = useTranslation();
	const { site } = useStaticQuery(
		graphql`
			query {
				site {
					siteMetadata {
						name
						author
					}
				}
			}
		`
	);

	const metaDescription = description || t("app-description");
	const defaultTitle = site.siteMetadata?.name;

	return (
		<Helmet
			htmlAttributes={{
				lang,
			}}
			title={title}
			titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
			meta={[
				{
					name: `description`,
					content: metaDescription,
				},
				{
					property: `og:title`,
					content: title,
				},
				{
					property: `og:description`,
					content: metaDescription,
				},
				{
					property: `og:type`,
					content: `website`,
				},
				{
					name: `twitter:card`,
					content: `summary`,
				},
				{
					name: `twitter:creator`,
					content: site.siteMetadata?.author || ``,
				},
				{
					name: `twitter:title`,
					content: title,
				},
				{
					name: `twitter:description`,
					content: metaDescription,
				},
			].concat(meta)}
		/>
	);
};
export default SEO;
