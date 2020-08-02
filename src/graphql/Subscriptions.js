import gql from "graphql-tag.macro";

const POST_CREATED = gql`
    subscription {
        postCreated {
            _id
            kind
            __typename
            title
            creator {
                _id
                username
            }
            body
            date_created
            reports {
                _id
                username
            }
            tags
            upvotes {
                _id
                username
            }
            downvotes {
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
                isPaid
                isClosed
                workplace: place
            }
            ... on Notice {
                deadline
            }

            imageUrl
        }
    }
`;

const POST_VOTE_CHANGED = gql`
    subscription {
        postVoteChanged {
            _id
            creator {
                _id
            }
            upvotes {
                _id
                username
            }
            downvotes {
                _id
                username
            }
        }
    }
`;

const POST_REMOVED = gql`
    subscription {
        postRemoved {
            _id
        }
    }
`;

export { POST_CREATED, POST_VOTE_CHANGED, POST_REMOVED };
