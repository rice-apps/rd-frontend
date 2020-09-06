import gql from 'graphql-tag.macro'

const POST_CREATED = gql`
  subscription {
    postCreated {
      _id
      kind
      title
      creator {
        _id
        username
      }
      body
      text_align
      date_created
      reports {
        _id
        username
      }
      tags
      upvotes {
        _id
        username
      }
      downvotes {
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
        isPaid
        isClosed
        workplace: place
      }
      ... on Notice {
        deadline
      }

      imageUrl
    }
  }
`

const POST_VOTE_CHANGED = gql`
  subscription {
    postVoteChanged {
      _id
      creator {
        _id
      }
      upvotes {
        _id
        username
      }
      downvotes {
        _id
        username
      }
    }
  }
`

const POST_REMOVED = gql`
  subscription {
    postRemoved {
      _id
    }
  }
`

const COMMENT_CREATED = gql`
  subscription($post_id: ID!) {
    commentCreated(postID: $post_id) {
      _id
      post {
        _id
      }
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

const COMMENT_UPDATED = gql`
  subscription {
    commentUpdated {
      _id
      post {
        _id
      }
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

export {
  POST_CREATED,
  POST_VOTE_CHANGED,
  POST_REMOVED,
  COMMENT_CREATED,
  COMMENT_UPDATED
}
