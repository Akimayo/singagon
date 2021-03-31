module.exports = {
	siteMetadata: {
		title: `Singagon: All The Voices`,
		name: `Singagon`,
		description: `I don't know about you, but I love when multiple singers collaborate on a song. Unfortunately, most lyrics sites and apps show all the lines without any indication of who sings which. This is where Singagon comes in.`,
		author: `Michal Ciesla`,
	},
	plugins: [
		`gatsby-plugin-sass`,
		`gatsby-plugin-react-helmet`,
		`gatsby-plugin-image`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/src/images`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `artists`,
				path: `${__dirname}/artists`,
			},
		},
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `Singagon: All The Voices`,
				short_name: `Singagon`,
				start_url: `/`,
				background_color: `#f30a49`,
				theme_color: `#ffffff`,
				display: `minimal-ui`,
				icon: `src/images/logo.svg`, // This path is relative to the root of the site.
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/src/locales`,
				name: `locale`,
			},
		},
		{
			resolve: `gatsby-plugin-react-i18next`,
			options: {
				localeJsonSourceName: `locale`, // name given to `gatsby-source-filesystem` plugin.
				languages: [`en`, `cs`],
				defaultLanguage: `en`,
				siteUrl: `https://webapps.mciesla.cz/singagon/`,
				i18nextOptions: {
					debug: true,
					lowerCaseLng: true,
					saveMissing: false,
					interpolation: {
						escapeValue: false, // not needed for react as it escapes by default
					},
					nsSeparator: false,
				},
			},
		},
		{
			resolve: `gatsby-plugin-react-svg`,
			options: {
				rule: {
					include: /.+\.svg$/,
				},
			},
		},
		`gatsby-plugin-fontawesome-css`,
		`gatsby-transformer-json`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/songs`,
				ignore: [`${__dirname}/songs/song.json`],
			},
		},
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.dev/offline
		// `gatsby-plugin-offline`,
	],
};
