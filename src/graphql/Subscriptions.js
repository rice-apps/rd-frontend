import gql from "graphql-tag.macro";

const POST_CREATED = gql`
    subscription {
        postCreated {
            _id
            title
            creator {
                username
            }
            body
            date_created
            reports
            tags
            upvotes {
                username
            }
            downvotes {
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
        }
    }
`;

const POST_VOTE_CHANGED = gql`
    subscription {
        postVoteChanged {
            _id
            upvotes {
                username
            }
            downvotes {
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
