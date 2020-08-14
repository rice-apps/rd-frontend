import InfiniteScroll from 'react-infinite-scroller'
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useMutation, useLazyQuery } from '@apollo/client'

import PostChunk from './PostChunk'
import CommentChunk from './CommentChunk'
import { UPVOTE_POST, DOWNVOTE_POST, SAVE_POST } from '../graphql/Mutations'
import { FETCH_COMMENTS_POST } from '../graphql/Queries'
import { currentUser } from '../utils/apollo'

function PostFeed (props) {
  const userInfo = currentUser()

  const [
    getCommentsPost,
    { subscribeToMore, refetch, ...result }
  ] = useLazyQuery(FETCH_COMMENTS_POST)

  const [upvotePost] = useMutation(UPVOTE_POST)

  const [downvotePost] = useMutation(DOWNVOTE_POST)

  const [savePost] = useMutation(SAVE_POST)

  const {
    onLoadMore,
    subscribeToNewPosts,
    subscribeToNewVotes,
    loading,
    error
  } = props

  useEffect(() => {
    subscribeToNewPosts()
    subscribeToNewVotes()
    // eslint-disable-next-line
  }, [])

  if (loading) return <h1>Loading...</h1>
  if (error) return <h1>Something went wrong...</h1>

  const {
    data: {
      postConnection: {
        edges,
        pageInfo: { hasNextPage }
      }
    }
  } = props

  const posts = edges.map((post, _i) => {
    return (
      <React.Fragment key={window.btoa('Fragment:' + post.node._id)}>
        <PostChunk
          userInfo={userInfo}
          upvotePost={upvotePost}
          downvotePost={downvotePost}
          savePost={savePost}
          post={post}
          key={post.node._id}
        />
        <button
          key={window.btoa('Button 1:' + post.node._id)}
          onClick={() =>
            getCommentsPost({
              variables: { post_id: post.node._id }
            })
          }
        >
          Get Comments
        </button>
        <button
          key={window.btoa('Button 2:' + post.node._id)}
          onClick={refetch}
        >
          Refresh Comments
        </button>
        <CommentChunk
          key={window.btoa('Comment:' + post.node._id)}
          {...result}
        />
      </React.Fragment>
    )
  })

  return (
    <>
      {/* <Banner /> */}
      <InfiniteScroll
        pageStart={0}
        loadMore={() => onLoadMore()}
        hasMore={hasNextPage}
        loader={<div>Loading...</div>}
      >
        {posts}
      </InfiniteScroll>
    </>
  )
}

PostFeed.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
  subscribeToNewPosts: PropTypes.func.isRequired,
  subscribeToNewVotes: PropTypes.func.isRequired
}

export default PostFeed
