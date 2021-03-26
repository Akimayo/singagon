const fs = require("fs");
const path = require("path");
exports.createPages = ({ actions }) => {
	const { createPage } = actions;
	const template = require.resolve("./src/components/sing/index.tsx");
	fs.readdirSync("./src/songs/")
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
