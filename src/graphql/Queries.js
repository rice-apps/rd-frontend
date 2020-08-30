import gql from 'graphql-tag.macro'

const POST_PAGE = gql`
  query PostPage(
    $after: String!
    $today: Date
    $earlyDate: Date
    $kind: EnumDKeyPostKind
  ) {
    postConnection(
      first: 20
      after: $after
      filter: {
        OR: [
          { kind: $kind }
          {
            AND: [
              { _operators: { date_created: { gt: $earlyDate } } }
              { _operators: { date_created: { lt: $today } } }
            ]
          }
        ]
      }
    ) @connection(key: "feed") {
      count
      edges {
        cursor
        node {
          _id
          __typename
          kind
          title
          creator {
            _id
            username
          }
          date_created
          body
          tags
          upvotes {
            _id
            username
          }
          downvotes {
            _id
            username
          }
          reports {
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
            workplace: place
            isPaid
            isClosed
          }
          ... on Notice {
            deadline
          }
          text_align
          imageUrl
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasPreviousPage
        hasNextPage
      }
    }
  }
`

const USER_EXISTS = gql`
  query GetData($username: String!) {
    doesUsernameExist(username: $username)
  }
`

const FETCH_COMMENTS_POST = gql`
  query FetchCommentsPost($post_id: ID!) {
    commentByPost(postID: $post_id) {
      _id
      creator {
        username
      }
      date_created
      body
      upvotes {
        username
      }
      downvotes {
        username
      }
      reports {
        username
      }
    }
  }
`

const FETCH_COMMENTS_PARENT = gql`
  query FetchCommentsParent($parent_id: ID!) {
    commentByParent(parent: $parent_id) {
      _id
      creator {
        username
      }
      date_created
      body
      upvotes {
        username
      }
      downvotes {
        username
      }
      reports {
        username
      }
    }
  }
`

const FETCH_COMMENTS_NESTED = gql`
  query FetchCommentsNested($post_id: ID!) {
    commentByPost(postID: $post_id) {
      _id
      body
      children {
        _id
        body
        children {
          _id
          body
        }
      }
    }
  }
`

const VERIFY_USER = gql`
  query VerifyUser($token: String!) {
    verifyToken(token: $token) {
      username
      netID
      isNewUser
      token
      savedPosts {
        _id
      }
      major
      minor
      college
    }
  }
`

const GET_POST = gql`
  query GetPostById($id: MongoID!) {
    postById(_id: $id) {
      _id
      __typename
      kind
      title
      body
      imageUrl
      date_created
      creator {
        netID
        username
        savedPosts {
          _id
        }
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
      comments {
        body
        creator {
          username
        }
        upvotes {
          username
        }
        downvotes {
          username
        }
        children {
          body
          creator {
            username
          }
          upvotes {
            username
          }
          downvotes {
            username
          }
          children {
            body
            creator {
              username
            }
            upvotes {
              username
            }
            downvotes {
              username
            }
            children {
              body
              creator {
                username
              }
              upvotes {
                username
              }
              downvotes {
                username
              }
            }
          }
        }
      }
      upvotes {
        username
      }
      downvotes {
        username
      }
      tags
      text_align
    }
  }
`

export {
  POST_PAGE,
  USER_EXISTS,
  FETCH_COMMENTS_PARENT,
  FETCH_COMMENTS_POST,
  FETCH_COMMENTS_NESTED,
  VERIFY_USER,
  GET_POST
}
