const fs = require("fs");
const path = require("path");
// Create pages from JSON lyrics files
exports.createPages = ({ actions }) => {
	const { createPage } = actions;
	const template = require.resolve("./src/components/sing/index.tsx");
	fs.readdirSync("./songs/")
		.filter(s => s !== "song.json")
		.forEach(song => {
			const basename = path.basename(song, ".json");
			createPage({
				path: `/sing/${basename}`,
				component: template,
				context: {
					name: basename,
				},
			});
		});
};
// Ignore P5 during build to prevent 'window is not defined' error
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
	stage == "build-html" &&
		actions.setWebpackConfig({
			module: {
				rules: [
					{
						test: /p5/,
						use: loaders.null(),
					},
				],
			},
		});
};
