import gql from "graphql-tag";

const CREATE_DISCUSSION = gql`
    mutation CreateDiscussion(
        $title: String!
        $body: String!
        $creator: String!
    ) {
        discussionCreateOne(
            record: { title: $title, body: $body, creator: $creator }
        ) {
            record {
                _id
                title
                creator {
                    _id
                    username
                }
                body
                date_created
            }
        }
    }
`;

const CREATE_EVENT = gql`
    mutation CreateEvent(
        $title: String!
        $body: String!
        $creator: String!
        $start: Date!
        $end: Date!
        $place: String!
    ) {
        eventCreateOne(
            record: {
                title: $title
                body: $body
                creator: $creator
                start: $start
                end: $end
                place: $place
            }
        ) {
            record {
                _id
                title
                creator {
                    _id
                    username
                }
                body
                date_created
                start
                end
                place
            }
        }
    }
`;

const CREATE_JOB = gql`
    mutation CreateJob(
        $title: String!
        $body: String!
        $creator: String!
        $start: Date!
        $end: Date!
        $place: String!
        $isPaid: Boolean!
        $isClosed: Boolean!
    ) {
        jobCreateOne(
            record: {
                title: $title
                body: $body
                creator: $creator
                start: $start
                end: $end
                place: $place
                isPaid: $isPaid
                isClosed: $isClosed
            }
        ) {
            record {
                _id
                title
                creator {
                    _id
                    username
                }
                body
                date_created
                start
                end
                place
                isPaid
                isClosed
            }
        }
    }
`;

const CREATE_NOTICE = gql`
    mutation CreateJob(
        $title: String!
        $body: String!
        $creator: String!
        $deadline: Date!
    ) {
        noticeCreateOne(
            record: {
                title: $title
                body: $body
                creator: $creator
                deadline: $deadline
            }
        ) {
            record {
                _id
                title
                creator {
                    _id
                    username
                }
                body
                date_created
                deadline
            }
        }
    }
`;

export { CREATE_DISCUSSION, CREATE_EVENT, CREATE_JOB, CREATE_NOTICE };
