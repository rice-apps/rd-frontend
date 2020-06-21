import { gql } from "apollo-boost";

const DISCUSSION_QUERY = gql`
    query PostPage($page: Int $perPage: Int) {
        postPagination(filter: { kind: Discussion } page: $page perPage: $perPage) {
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
