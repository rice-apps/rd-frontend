import gql from 'graphql-tag.macro'

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
    $imageUrl: String
  ) {
    currentNetID @client @export(as: "creator")
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
        imageUrl: $imageUrl
      }
    ) {
      record {
        _id
        kind
        title
        body
        creator {
          netID
        }
      }
    }
  }
`

const LOGIN = gql`
  mutation Login($ticket: String!) {
    userAuthentication(ticket: $ticket) {
      username
      netID
      isNewUser
      token
      savedPosts {
        _id
      }
    }
  }
`

const UPVOTE_POST = gql`
  mutation UpvotePost($netID: String!, $_id: ID!) {
    currentNetID @client @export(as: "netID")
    upvotePostById(netID: $netID, _id: $_id) {
      creator {
        _id
        username
      }
      _id
    }
  }
`

const DOWNVOTE_POST = gql`
  mutation DownvotePost($netID: String!, $_id: ID!) {
    currentNetID @client @export(as: "netID")
    downvotePostById(netID: $netID, _id: $_id) {
      creator {
        _id
        netID
      }
      _id
    }
  }
`

const SAVE_POST = gql`
  mutation SavePost($netID: String!, $savedPosts: [MongoID]) {
    currentNetID @client @export(as: "netID")
    userUpdateOne(
      record: { savedPosts: $savedPosts }
      filter: { netID: $netID }
    ) {
      record {
        netID
        _id
      }
    }
  }
`

const SET_INFO = gql`
  mutation SetInfo(
    $username: String!
    $college: EnumUserCollege
    $major: [String]
    $minor: [String]
    $netID: String!
    $isNewUser: Boolean!
  ) {
    currentNetID @client @export(as: "netID")
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
`

const S3_SIGN = gql`
  mutation GetS3Info($filename: String!, $filetype: String!) {
    signS3Url(filename: $filename, filetype: $filetype) {
      url
      signedRequest
    }
  }
`

export {
  SET_INFO,
  POST_CREATE,
  LOGIN,
  UPVOTE_POST,
  DOWNVOTE_POST,
  SAVE_POST,
  S3_SIGN
}
