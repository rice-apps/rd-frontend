import { gql } from "apollo-boost";

const DISCUSSION_CREATED = gql`
    subscription {
        discussionCreated {
            _id
            title
            body
            creator {
                username
            }
            date_created
            __typename
        }
    }
`;

const DISCUSSION_UPDATED = gql`
    subscription {
        discussionUpdated {
            _id
            title
            body
            reports
        }
    }
`;

const EVENT_CREATED = gql`
    subscription {
        eventCreated {
            _id
            title
            body
            creator {
                username
            }
            date_created
            start
            end
            place
            __typename
        }
    }
`;

const EVENT_UPDATED = gql`
    subscription {
        eventUpdated {
            _id
            title
            body
            start
            end
            place
            reports
        }
    }
`;

const JOB_CREATED = gql`
    subscription {
        jobCreated {
            _id
            title
            body
            creator {
                username
            }
            date_created
            start
            end
            place
            isPaid
            isClosed
            __typename
        }
    }
`;

const JOB_UPDATED = gql`
    subscription {
        jobUpdated {
            _id
            title
            body
            start
            end
            place
            isPaid
            isClosed
            reports
        }
    }
`;

const NOTICE_CREATED = gql`
    subscription {
        noticeCreated {
            _id
            title
            body
            creator {
                username
            }
            date_created
            deadline
            __typename
        }
    }
`;

const NOTICE_UPDATED = gql`
    subscription {
        noticeUpdated {
            _id
            title
            body
            deadline
            reports
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
    DISCUSSION_CREATED,
    DISCUSSION_UPDATED,
    EVENT_CREATED,
    EVENT_UPDATED,
    JOB_CREATED,
    JOB_UPDATED,
    NOTICE_CREATED,
    NOTICE_UPDATED,
    POST_VOTE_CHANGED,
    POST_REMOVED,
};
