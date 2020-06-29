import { gql } from "apollo-boost";

const POST_PAGE = gql`
    query PostPage($page: Int, $perPage: Int) {
        postPagination(
            filter: {
                OR: [
                    { kind: Discussion }
                    { kind: Notice }
                    { kind: Job }
                    { kind: Event }
                ]
            }
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
                reports

                ... on Notice {
                    deadline
                }

                ... on Job {
                    start
                    end
                    place
                    isPaid
                    isClosed
                }

                ... on Event {
                    start
                    end
                    place
                }

                __typename
            }

            pageInfo {
                hasNextPage
            }
        }
    }
`;

export { POST_PAGE };
