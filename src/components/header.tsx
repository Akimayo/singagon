import React, { useState } from "react";
import { Link, useI18next, useTranslation } from "gatsby-plugin-react-i18next";
import { graphql, useStaticQuery } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowLeft,
	faBars,
	faLanguage,
} from "@fortawesome/free-solid-svg-icons";
import SVGLogo from "../images/logo.svg";

const Header: React.FC<
	React.PropsWithChildren<{ siteTitle?: string; mini?: React.ReactNode }>
> = ({ siteTitle = "", mini }) => {
	const { t } = useTranslation();
	const { languages, language, originalPath } = useI18next();
	const { site, allFile } = useStaticQuery(graphql`
		query {
			site {
				siteMetadata {
					name
				}
			}
			allFile(
				filter: { dir: { glob: "**/locales" }, name: { eq: "languages" } }
			) {
				edges {
					node {
						childLocale {
							data
						}
					}
				}
			}
		}
	`);
	const name = site.siteMetadata.name;
	const [isExpanded, setExpanded] = useState(false);
	const [isChoosingLanguage, setChoosingLanguage] = useState(false);
	const languageNames = JSON.parse(allFile.edges[0].node.childLocale.data);
	return (
		<>
			<div
				className={"s-lang" + (isChoosingLanguage ? " active" : "")}
				onClick={() => setChoosingLanguage(false)}
			>
				<div role="dialog">
					<h3>{t("nav.locales")}</h3>
					<div className="s-lang__list" role="list">
						{languages.map(l => {
							const current = l === language;
							return (
								<Link
									to={originalPath}
									language={l}
									onClick={current && (() => setChoosingLanguage(false))}
								>
									{current && <FontAwesomeIcon icon={faLanguage} />}
									{languageNames[l] || l.toUpperCase()}
								</Link>
							);
						})}
					</div>
				</div>
			</div>
			<header
				className={
					"s-header" +
					(mini ? " s-header--small" : "") +
					(isExpanded ? " active" : "")
				}
			>
				<div className="s-header__title">
					<Link to={!!mini ? "/sing" : "/"} onClick={() => setExpanded(false)}>
						{!!mini || <SVGLogo />}
						<span id="pgname">{siteTitle}</span>
						{mini && (
							<span>
								<FontAwesomeIcon icon={faArrowLeft} />
								&nbsp;
								{name}
							</span>
						)}
					</Link>
				</div>
				<nav className="s-header__links">
					{mini || (
						<>
							<Link to="/sing" onClick={() => setExpanded(false)}>
								{t("nav.sing")}
							</Link>
							<Link to="/about" onClick={() => setExpanded(false)}>
								{t("nav.about")}
							</Link>
							<Link
								to="https://github.com/Akimayo/singagon#Contributing"
								target="_blank"
								onClick={() => setExpanded(false)}
							>
								{t("nav.contribute")}
							</Link>
							<div
								className="s-header__control"
								tabIndex={0}
								title={t("nav.locales")}
								role="button"
								onClick={() => {
									setChoosingLanguage(true);
									setExpanded(false);
								}}
							>
								<FontAwesomeIcon icon={faLanguage} />
							</div>
							<div
								className="s-header__control s-header__hamburger"
								tabIndex={0}
								title={t("nav.menu")}
								role="button"
								onClick={() => setExpanded(!isExpanded)}
							>
								<FontAwesomeIcon icon={faBars} />
							</div>
						</>
					)}
				</nav>
			</header>
		</>
	);
};
export default Header;
