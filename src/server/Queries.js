import { gql } from "apollo-boost";

const DISCUSSION_PAGE = gql`
    query PostPage($page: Int, $perPage: Int) {
        postPagination(
            filter: { kind: Discussion }
            page: $page
            perPage: $perPage
            sort: DATE_CREATED_DESC
        ) {
            items {
                _id
                title
                body
                creator {
                    username
                }
                date_created
            }
        }
    }
`;

export { DISCUSSION_PAGE };
