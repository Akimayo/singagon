import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";

import Header from "./header";
import "../styles/main.scss";

const Layout: React.FC = ({ children }) => {
	const data = useStaticQuery(graphql`
		query SiteTitleQuery {
			site {
				siteMetadata {
					name
				}
			}
		}
	`);

	return (
		<>
			<Header siteTitle={data.site.siteMetadata?.name} />
			<main className="s-body">{children}</main>
			<footer className="s-footer">
				© {new Date().getFullYear()}, Built with
				{` `}
				<a href="https://www.gatsbyjs.com">Gatsby</a>
			</footer>
		</>
	);
};
export default Layout;
