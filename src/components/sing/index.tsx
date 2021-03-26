import { graphql } from "gatsby";
import { Link } from "gatsby-plugin-react-i18next";
import React, { useCallback, useEffect, useState } from "react";
import ReactP5 from "react-p5-wrapper";
import {
	faYoutube as IconYouTube,
	faSoundcloud as IconSoundCloud,
	faSpotify as IconSpotify,
} from "@fortawesome/free-brands-svg-icons";
import {
	faMusic as IconAppleMusic,
	faExternalLinkAlt,
	faRedoAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../../styles/main.scss";
import Header from "../header";
import SEO from "../seo";
import sketch from "./background";
import SongList from "../song-list";
import { GatsbyImage } from "gatsby-plugin-image";

interface Song {
	name: string;
	available: {
		on: "YouTube" | "SoundCloud" | "Spotify" | "Apple Music";
		link: string;
	}[];
	artists: {
		name: string;
		photo?: string;
		link?: string;
		voices?: number[];
		color?: string;
	}[];
	lyrics: string[][];
}
const icons = {
	YouTube: IconYouTube,
	SoundCloud: IconSoundCloud,
	Spotify: IconSpotify,
	"Apple Music": IconAppleMusic,
};
export default ({ data }) => {
	/** @var photos: All photos retrieved from artists folder as a dictionary with filenames as keys */
	const photos = new Map<string, any>();
	data.allFile.edges.forEach(e =>
		photos.set(e.node.name, e.node.childImageSharp.gatsbyImageData)
	);
	/** @var song: Only song data */
	const song: Song = data.file.childSongsJson;
	/** @var vocalists: Only artists that sing */
	const vocalists = song.artists.filter(a => a.voices && a.voices.length);
	/** @var spacer: Blank lyric lines, used to pad top and bottom */
	const spacer = Array(song.lyrics[0].length).fill(null);
	/** @var padTop: Number of padding lines added to the top */
	const padTop = 2;
	/** @var lines: Prepared objects of lyric lines */
	const lines = [
		...Array(padTop).fill(spacer),
		...song.lyrics,
		spacer.map((_, i) => (i < vocalists.length ? "END" : null)),
	].map(l =>
		vocalists.map(a => ({
			main: l[a.voices[0]],
			sub: a.voices.length > 1 && a.voices.slice(1).map(n => l[n]),
			color: a.color,
		}))
	);
	/**
	 * @var lineOffset: Scroll position; moves the whole lyrics up and down
	 * @var setLineOffset: Sets the scroll position
	 */
	const [lineOffset, setLineOffset] = useState(0);
	/** @var moveByKey: Takes keyboard input and uses them to set scroll position; used in effect */
	const moveByKey = useCallback(
		(ev: KeyboardEvent) => {
			switch (ev.key) {
				case "ArrowUp":
					lineOffset > 0 && setLineOffset(lineOffset - 1);
					break;
				case "ArrowDown":
				case " ":
					lineOffset < lines.length - padTop && setLineOffset(lineOffset + 1);
					break;
				case "R":
				case "r":
					setLineOffset(0);
					break;
			}
		},
		[lineOffset, setLineOffset]
	);
	useEffect(() => {
		window.addEventListener("keyup", moveByKey);
		return () => window.removeEventListener("keyup", moveByKey);
	}, [moveByKey]);
	/** @var moveByScroll: Takes mouse input and uses it to set scroll position; used in effect */
	const moveByScroll = useCallback(
		(ev: WheelEvent) => {
			ev.deltaY < 0 && lineOffset > 0 && setLineOffset(lineOffset - 1);
			ev.deltaY > 0 &&
				lineOffset < lines.length - padTop &&
				setLineOffset(lineOffset + 1);
		},
		[lineOffset, setLineOffset]
	);
	useEffect(() => {
		document.addEventListener("wheel", moveByScroll);
		return () => document.removeEventListener("wheel", moveByScroll);
	}, [moveByScroll]);
	return (
		<>
			<SEO
				title={`${song.name} - ${song.artists.map(a => a.name).join(", ")}`}
			/>
			<Header
				siteTitle={song.name}
				mini={song.artists.map(a => (
					<Link to={a.link} target="_blank" className="s-header__artist-link">
						{a.name}
					</Link>
				))}
			/>
			<div className="s-song">
				<ReactP5
					sketch={sketch}
					colors={song.artists.filter(a => a.color).map(a => a.color)}
				/>
				<main className="s-song__lyrics">
					{lines.map((l, i) => {
						const relPos = i - lineOffset - padTop;
						let lineClass = "off-bottom";
						let active = false;
						if (relPos === 4) lineClass = "ready-bottom";
						else if (relPos === -3) lineClass = "ready-top";
						else if (relPos < -3) lineClass = "off-top";
						else if (relPos === 0) {
							lineClass = "active";
							active = true;
						} else if (relPos <= 3 && relPos >= -2) lineClass = "";
						const sameMain = l.every(t => t.main === l[0].main);
						if (sameMain) {
							const sameSubs = l.every(
								s => s.sub && s.sub.every((d, n) => l[0].sub[n] === d)
							);
							const mappable = sameSubs
								? l[0].sub.map(s => ({ t: s, c: "#fff" }))
								: l
										.map(s => s.sub && s.sub.map(d => ({ t: d, c: s.color })))
										.reduce((all, s) => all.concat(s), []);
							return (
								<div className={"s-song__lyrics-line " + lineClass}>
									<span
										key={i}
										className={active ? "active" : ""}
										style={{
											textShadow: active && "0 0 64px #fff",
										}}
									>
										{l[0].main || <>&nbsp;</>}
										{mappable && (
											<small>
												{mappable.map((s, k) => (
													<span
														key={`${i}--${k}`}
														style={{ textShadow: active && "0 0 64px " + s.c }}
													>
														{s.t}
													</span>
												))}
											</small>
										)}
									</span>
								</div>
							);
						} else
							return (
								<div className={"s-song__lyrics-line " + lineClass}>
									{l.map((t, j) => (
										<span
											key={`${i}-${j}`}
											className={active ? "active" : ""}
											style={{
												textShadow: active && "0 0 64px " + t.color,
											}}
										>
											{t.main || <>&nbsp;</>}
											<small>
												{t.sub &&
													t.sub.map((s, k) => (
														<span
															key={`${i}-${j}-${k}`}
															style={{
																textShadow: active && "0 0 64px " + t.color,
															}}
														>
															{s}
														</span>
													))}
											</small>
										</span>
									))}
								</div>
							);
					})}
					<SongList
						inSong
						select={2}
						className={lineOffset < lines.length - padTop ? "off-bottom" : ""}
						filterCallback={s => s.node.name !== data.file.name}
					/>
				</main>
				<div className="s-song__controls">
					<button
						onClick={() => setLineOffset(0)}
						className="s-song__controls-button"
						disabled={lineOffset <= 0}
					>
						<FontAwesomeIcon icon={faRedoAlt} />
						<span className="s-song__controls-button-tooltip">Reset</span>
					</button>
					{song.available.map((l, i) => (
						<Link
							to={l.link}
							target="_blank"
							key={i}
							className="s-song__controls-button"
						>
							<FontAwesomeIcon icon={icons[l.on] || faExternalLinkAlt} />
							<span className="s-song__controls-button-tooltip">
								{l.on}&nbsp;
								<FontAwesomeIcon icon={faExternalLinkAlt} />
							</span>
						</Link>
					))}
				</div>
				<div className="s-song__artists">
					{song.artists
						.filter(a => a.voices && a.voices.length)
						.map(a => (
							<figure
								className={
									"s-song__artist" +
									(a.voices.some(
										v =>
											song.lyrics &&
											song.lyrics[lineOffset] &&
											song.lyrics[lineOffset][v]
									)
										? " active"
										: "")
								}
							>
								<GatsbyImage
									image={photos.get(a.photo)}
									className="s-song__artist-image"
									alt={a.name}
									draggable={false}
								/>
								<span
									className="s-song__artist-name"
									style={{ color: a.color || "#fff" }}
								>
									{a.name}
								</span>
								<div
									className="s-song__artist-backlight"
									style={{
										backgroundImage: `radial-gradient(${
											a.color || "#fff"
										} 30%,transparent,transparent)`,
									}}
								></div>
							</figure>
						))}
				</div>
			</div>
		</>
	);
};
export const query = graphql`
	query($name: String!) {
		file(name: { eq: $name }) {
			childSongsJson {
				name
				available {
					on
					link
				}
				artists {
					name
					photo
					link
					voices
					color
				}
				lyrics
			}
			name
		}
		allFile(
			filter: { ext: { eq: ".png" }, dir: { glob: "**/images/artists" } }
		) {
			edges {
				node {
					name
					childImageSharp {
						gatsbyImageData(
							height: 180
							placeholder: NONE
							formats: [WEBP, PNG]
						)
					}
				}
			}
		}
	}
`;
