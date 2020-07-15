import gql from "graphql-tag.macro";

const POST_CREATE = gql`
    mutation CreatePost(
        $kind: EnumDKeyPostKind!
        $title: String!
        $body: String!
        $creator: String!
        $deadline: String!
    ){
        postCreateOne(
            record{
                kind: $kind
                title: $title
                body: $body
                creator: $creator
                deadline: $deadline
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

const POST_CREATE = gql`
    mutation postCreateOne(){
        
    }
`;

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
                netID
            }
            _id
        }
    }
`;

const DOWNVOTE_POST = gql`
    mutation DownvotePost($netID: String!, $_id: ID!) {
        downvotePostById(netID: $netID, _id: $_id) {
            creator {
                netID
            }
            _id
        }
    }
`;

export {
    CREATE_DISCUSSION,
    CREATE_EVENT,
    CREATE_JOB,
    CREATE_NOTICE,
    LOGIN,
    UPVOTE_POST,
    DOWNVOTE_POST,
};
