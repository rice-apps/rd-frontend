import { gql } from "apollo-boost";

const POST_CREATED = gql`
    subscription {
        postCreated {
            title
            creator {
                username
            }
            body
            date_created
            tags
            ... on Event {
                start
                end
                EventPlace: place
            }

            ... on Job {
                start
                end
                isPaid
                isClosed
                JobPlace: place
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

export {
    POST_CREATED,
    POST_VOTE_CHANGED,
    POST_REMOVED,
};
