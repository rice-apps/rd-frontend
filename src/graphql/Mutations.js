import gql from "graphql-tag";

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

//maybe switch to user update one 
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
            },
            filter: {
                netID: $netID
            }
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
`

export {POST_CREATE, LOGIN, SET_INFO };
