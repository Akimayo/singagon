import { graphql } from "gatsby";
import React from "react";

import "../../styles/main.scss";

export default ({ data }) => {
	return <pre>{JSON.stringify(data.file.childSongsJson, null, 2)}</pre>;
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
				}
				lyrics
			}
		}
	}
`;
