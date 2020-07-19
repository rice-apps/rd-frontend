import gql from "graphql-tag.macro";

const POST_CREATE = gql`
    mutation CreatePost(
        $kind: EnumDKeyPostKind!
        $title: String!
        $body: String!
        $creator: String!
        $deadline: Date
        $start: Date
        $end: Date
        $place: String
        $isPaid: Boolean
        $isClosed: Boolean
        $tags: [String]
    ) {
        postCreateOne(
            record: {
                kind: $kind
                title: $title
                body: $body
                creator: $creator
                deadline: $deadline
                start: $start
                end: $end
                place: $place
                isPaid: $isPaid
                isClosed: $isClosed
                tags: $tags
            }
        ) {
            record {
                _id
                kind
                __typename
                title
                body
                creator {
                    netID
                }
            }
        }
    }
`;

<<<<<<< HEAD

const POST_CREATE = gql`
    mutation CreatePost(
        $kind: EnumDKeyPostKind!
        $title: String!
        $body: String!
        $tags: [String]
        $creator: String!
        $deadline: String
        $start: Date
        $end: Date
        $place: String
        $isPaid: Boolean
        $isClosed: Boolean
    ){
        postCreateOne(
            record: {
                kind: $kind
                title: $title
                body: $body
                tags: $tags
                creator: $creator
                deadline: $deadline
                start: $start
                end: $end
                place: $place
                isPaid: $isPaid
                isClosed: $isClosed
            }
        ){
            record{
                _id
                kind
                __typename
                title
                body
                creator{
                    netID
                }
            }
        }
    }
`;


=======
>>>>>>> ec01bf017393b49ed545bdaf6ce67f1a4118436a
const LOGIN = gql`
    mutation Login($ticket: String!) {
        userAuthentication(ticket: $ticket) {
            username
            netID
            isNewUser
            token
            __typename
        }
    }
`;

const UPVOTE_POST = gql`
    mutation UpvotePost($netID: String!, $_id: ID!) {
        upvotePostById(netID: $netID, _id: $_id) {
            creator {
                _id
                username
            }
            _id
        }
    }
`;

const DOWNVOTE_POST = gql`
    mutation DownvotePost($netID: String!, $_id: ID!) {
        downvotePostById(netID: $netID, _id: $_id) {
            creator {
                _id
                netID
            }
            _id
        }
    }
`;

<<<<<<< HEAD
export {
    CREATE_DISCUSSION,
    CREATE_EVENT,
    CREATE_JOB,
    CREATE_NOTICE,
    POST_CREATE,
    LOGIN,
    UPVOTE_POST,
    DOWNVOTE_POST,
};
=======
const SET_INFO = gql`
    mutation SetInfo(
        $username: String!
        $college: EnumUserCollege!
        $major: [String]!
        $minor: [String]!
        $netID: String!
        $isNewUser: Boolean!
    ) {
        userUpdateOne(
            record: {
                username: $username
                college: $college
                major: $major
                minor: $minor
                isNewUser: $isNewUser
            }
            filter: { netID: $netID }
        ) {
            record {
                _id
                username
                college
                major
                minor
                isNewUser
            }
        }
    }
`;

export { SET_INFO, POST_CREATE, LOGIN, UPVOTE_POST, DOWNVOTE_POST };
>>>>>>> ec01bf017393b49ed545bdaf6ce67f1a4118436a
