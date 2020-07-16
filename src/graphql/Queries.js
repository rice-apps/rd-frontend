import gql from "graphql-tag.macro";

const POST_PAGE = gql`
    query PostPage($after: String!) {
        postConnection(after: $after) {
            count
            edges {
                cursor
                node {
                    _id
                    __typename
                    kind
                    title
                    creator {
                        _id
                        username
                    }
                    date_created
                    body
                    tags
                    upvotes {
                        _id
                        username
                    }
                    downvotes {
                        _id
                        username
                    }
                    reports {
                        _id
                        username
                    }
                    ... on Event {
                        start
                        end
                        location: place
                    }
                    ... on Job {
                        start
                        end
                        workplace: place
                        isPaid
                        isClosed
                    }
                    ... on Notice {
                        deadline
                    }
                }
            }
            pageInfo {
                startCursor
                endCursor
                hasPreviousPage
                hasNextPage
            }
        }
    }
`;

export { POST_PAGE };
