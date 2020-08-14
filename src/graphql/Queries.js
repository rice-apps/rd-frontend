import gql from 'graphql-tag.macro'

const POST_PAGE = gql`
  query PostPage($after: String!) {
    postConnection(after: $after) {
      count
      edges {
        cursor
        node {
          _id
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

const GET_USER_DATA = gql`
  query GetData($netID: String!) {
    userOne(filter: { netID: $netID }) {
      username
      major
      minor
      college
    }
  }
`

const USER_EXISTS = gql`
  query GetData($username: String!) {
    doesUsernameExist(username: $username) {
      usernameExists
    }
  }
`

const FETCH_COMMENTS_POST = gql`
  query FetchCommentsPost($post_id: ID!) {
    commentByPost(post: $post_id) {
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

export {
  POST_PAGE,
  GET_USER_DATA,
  USER_EXISTS,
  FETCH_COMMENTS_PARENT,
  FETCH_COMMENTS_POST,
  VERIFY_USER
}
