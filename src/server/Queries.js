import { gql } from "apollo-boost";

const DISCUSSION_QUERY = gql`
    query {
        discussionMany {
            _id
            title
            body
            creator {
                username
            }
            date_created
        }
    }
`;

export { DISCUSSION_QUERY };
