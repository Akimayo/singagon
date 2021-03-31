import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";

import Header from "./header";
import "../styles/main.scss";
import { useTranslation } from "react-i18next";

const Layout: React.FC = ({ children }) => {
	const data = useStaticQuery(graphql`
		query SiteTitleQuery {
			site {
				siteMetadata {
					name
					author
				}
			}
		}
	`);
	const { t } = useTranslation();

	return (
		<>
			<Header siteTitle={data.site.siteMetadata?.name} />
			<main className="s-body">{children}</main>
			<footer className="s-footer">
				<div>
					&copy; {new Date().getFullYear()}, {t("app-by", { note: "🎶" }) + " "}
					<a href="https://twitter.com/ciesla_michal" target="_blank">{data.site.siteMetadata?.author}</a>
				</div>
				<div>
					{t("app-built-with") + " "}
					<a href="https://www.gatsbyjs.com" target="_blank">
						Gatsby
					</a>
				</div>
			</footer>
		</>
	);
};
export default Layout;
