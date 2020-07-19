import gql from "graphql-tag.macro";

const POST_PAGE = gql`
<<<<<<< HEAD
    query PostPage($page: Int, $perPage: Int) {
        postPagination(
            page: $page
            perPage: $perPage
            sort: DATE_CREATED_DESC
        ) {
            items {
                _id
                title
                body
                tags
                creator {
                    username
=======
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
>>>>>>> ec01bf017393b49ed545bdaf6ce67f1a4118436a
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
