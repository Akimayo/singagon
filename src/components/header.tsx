import * as React from "react";
import { Link, useTranslation } from "gatsby-plugin-react-i18next";
import { graphql, useStaticQuery } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Header: React.FC<
	React.PropsWithChildren<{ siteTitle?: string; mini?: React.ReactNode }>
> = ({ siteTitle = "", mini }) => {
	const { t } = useTranslation();
	const name = useStaticQuery(graphql`
		query {
			site {
				siteMetadata {
					name
				}
			}
		}
	`).site.siteMetadata.name;
	return (
		<header className={"s-header" + (mini ? " s-header--small" : "")}>
			<div className="s-header__title">
				<Link to={!!mini ? "/sing" : "/"}>
					<h1>{siteTitle}</h1>
					{mini && (
						<h1>
							<FontAwesomeIcon icon={faArrowLeft} />&nbsp;
							{name}
						</h1>
					)}
				</Link>
			</div>
			<nav className="s-header__links">
				{mini || (
					<>
						<Link to="/sing">{t("sing")}</Link>
						<Link to="/about">{t("about")}</Link>
					</>
				)}
			</nav>
		</header>
	);
};
export default Header;
