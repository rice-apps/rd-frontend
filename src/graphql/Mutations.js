import gql from 'graphql-tag.macro'

const POST_CREATE = gql`
  mutation CreatePost(
    $kind: EnumDKeyPostKind!
    $title: String!
    $body: String!
    $text_align: String
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
        text_align: $text_align
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
// wip
// if making sep "comment" and "reply" mutations,
// make parent null/empty in comment, and require it in reply

const CREATE_COMMENT = gql`
  mutation CreateComment(
    $creator: String!
    $post: MongoID!
    $parent: MongoID
    $date_created: Date
    $body: String!
  ) {
    currentNetID @client @export(as: "creator")
    commentCreateOne(
      record: {
        creator: $creator
        post: $post
        parent: $parent
        date_created: $date_created
        body: $body
      }
    ) {
      record {
        creator {
          netID
        }
        post {
          _id
          title
        }
        date_created
        body
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

const REPORT_POST = gql`
  mutation ReportPost($netID: String!, $_id: ID!) {
    togglePostReport(netID: $netID, _id: $_id) {
      creator {
        _id
        netID
      }
      _id
      body
      title
    }
  }
`

const REMOVE_POST = gql`
  mutation RemovePost($_id: MongoID!) {
    postRemoveById(_id: $_id) {
      record {
        date_created
        _id
      }
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

const COMMENT_CREATE = gql`
  mutation CreateComment(
    $creator: String!
    $post: ID!
    $parent: ID!
    $body: String!
  ) {
    currentNetID @client @export(as: "creator")
    commentCreateOne(
      record: { creator: $creator, post: $post, parent: $parent, body: $body }
    ) {
      record {
        creator {
          netID
        }
        post
        parent
        body
      }
    }
  }
`

const UPVOTE_COMMENT = gql`
  mutation UpvoteComment($netID: String!, $_id: ID!) {
    currentNetID @client @export(as: "netID")
    upvoteCommentById(netID: $netID, _id: $_id) {
      creator {
        _id
        username
      }
      _id
    }
  }
`

const DOWNVOTE_COMMENT = gql`
  mutation DownvoteComment($netID: String!, $_id: ID!) {
    currentNetID @client @export(as: "netID")
    downvoteCommentById(netID: $netID, _id: $_id) {
      creator {
        _id
        netID
      }
      _id
    }
  }
`

const REPORT_COMMENT = gql`
  mutation ReportComment($netID: String!, $_id: ID!) {
    currentNetID @client @export(as: "netID")
    toggleCommentReport(netID: $netID, _id: $_id) {
      creator {
        _id
        netID
      }
      _id
    }
  }
`

export {
  SET_INFO,
  POST_CREATE,
  CREATE_COMMENT,
  COMMENT_CREATE,
  LOGIN,
  UPVOTE_POST,
  DOWNVOTE_POST,
  REPORT_POST,
  REMOVE_POST,
  SAVE_POST,
  S3_SIGN,
  UPVOTE_COMMENT,
  DOWNVOTE_COMMENT,
  REPORT_COMMENT,
}
