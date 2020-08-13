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

                    imageUrl
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

const GET_USER_DATA = gql`
    query GetData($netID: String!) {
        userOne(filter: { netID: $netID }) {
            username
            major
            minor
            college
        }
    }
`;

const USER_EXISTS = gql`
    query GetData($username: String!) {
        doesUsernameExist(username: $username) {
            usernameExists
        }
    }
`;

const FETCH_COMMENTS_POST = gql`
    query FetchCommentsPost($post_id: ID!) {
        commentByPost(post: $post_id) {
            _id
            creator {
                username
            }
            date_created
            body
            upvotes {
                username
            }
            downvotes {
                username
            }
            reports {
                username
            }
        }
    }
`;

const FETCH_COMMENTS_PARENT = gql`
    query FetchCommentsParent($parent_id: ID!) {
        commentByParent(parent: $parent_id) {
            _id
            creator {
                username
            }
            date_created
            body
            upvotes {
                username
            }
            downvotes {
                username
            }
            reports {
                username
            }
        }
    }
`;

const GET_POST = gql`
    query GetPostById($id: ID!) {
        postById(_id: $id) {
            _id
            __typename
            kind
            title
            body
            imageUrl
            creator {
                netID
                username
                savedPosts {
                    _id
                }
            }

            ... on Event {
                start
                end
                location: place
            }
            ... on Job {
                start
                end
                isPaid
                isClosed
                workplace: place
            }
            ... on Notice {
                deadline
            }
            reports {
                netID
                username
            }
            comments {
                body
                creator {
                    username
                }
                upvotes {
                    username
                }
                downvotes {
                    username
                }
                children {
                    body
                    creator {
                        username
                    }
                    upvotes {
                        username
                    }
                    downvotes {
                        username
                    }
                    children {
                        body
                        creator {
                            username
                        }
                        upvotes {
                            username
                        }
                        downvotes {
                            username
                        }
                        children {
                            body
                            creator {
                                username
                            }
                            upvotes {
                                username
                            }
                            downvotes {
                                username
                            }
                        }
                    }
                }
            }
            upvotes {
                username
            }
            downvotes {
                username
            }
            tags
        }
    }
`;

export {
    POST_PAGE,
    GET_USER_DATA,
    USER_EXISTS,
    FETCH_COMMENTS_PARENT,
    FETCH_COMMENTS_POST,
    GET_POST,
};
