import InfiniteScroll from 'react-infinite-scroller'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useMutation, useLazyQuery } from '@apollo/client'

import uuid from 'uuid/v4'
import PostChunk from './PostChunk'
import Filters from './Filters'
import CommentChunk from './CommentChunk'
import { TOKEN_NAME } from '../config'
import {
  UPVOTE_POST,
  DOWNVOTE_POST,
  REPORT_POST,
  REMOVE_POST,
  SAVE_POST,
  CREATE_COMMENT
} from '../graphql/Mutations'
import { FETCH_COMMENTS_POST, FETCH_COMMENTS_PARENT } from '../graphql/Queries'
import { COMMENT_CREATED, COMMENT_UPDATED } from '../graphql/Queries'
import { currentUser } from '../utils/apollo'

function PostFeed (props) {
  const date = new Date()

  const userInfo = currentUser()
  const [upvotePost] = useMutation(UPVOTE_POST)
  const [downvotePost] = useMutation(DOWNVOTE_POST)
  const [reportPost] = useMutation(REPORT_POST)
  const [removePost] = useMutation(REMOVE_POST)
  const [savePost] = useMutation(SAVE_POST)
  const [createComment] = useMutation(CREATE_COMMENT)
  const [getCommentsPost, { refetch, ...result }] = useLazyQuery(
    FETCH_COMMENTS_POST
  )

  const [sortByUpvotes, setSortByUpvotes] = useState('')

  const {
    onLoadMore,
    subscribeToNewPosts,
    subscribeToNewVotes,
    loading,
    error,
    data
  } = props

  useEffect(() => {
    subscribeToNewPosts()
    subscribeToNewVotes()
  }, [])

  if (error) return <h1>Something went wrong...</h1>
  if (loading || !data) return <h1>Loading...</h1>

  const {
    postConnection: {
      edges,
      pageInfo: { hasNextPage }
    }
  } = data

  console.log('how many posts actually show up', edges.length)

  const processDateFilter = filter => {
    const today = props.currentDate

    if (filter.length == 0) return
    if (filter.includes('yesterday')) {
      const yesterday_day = today.getDate() - 1
      const yesterday = (d => new Date(d.setDate(yesterday_day)))(new Date())
      props.setEarlyDateBound(yesterday)
    } else if (filter.includes('week')) {
      console.log('broken?')
      const weekAgoDay = today.getDate() - 7
      const weekAgo = (d => new Date(d.setDate(weekAgoDay)))(new Date())
      props.setEarlyDateBound(weekAgo)
    } else if (filter.includes('month')) {
      const month_ago_day = today.getMonth() - 1
      const month_ago = (d => new Date(d.setMonth(month_ago_day)))(new Date())
      props.setEarlyDateBound(month_ago)
    }
  }

  const generatePosts = edges => {
    return edges.map((post, _i) => {
      return (
        <>
          <PostChunk
            userInfo={userInfo}
            upvotePost={upvotePost}
            downvotePost={downvotePost}
            reportPost={reportPost}
            removePost={removePost}
            savePost={savePost}
            createComment={createComment}
            post={post}
            key={post.node._id}
          />
          {/* <button
            onClick={() =>
              getCommentsPost({
                variables: { post_id: post.node._id }
              })
            }
          >
            Get Comments
          </button>
          <button onClick={() => refetch()}>Refresh Comments</button>
          <CommentChunk {...result} /> */}
        </>
      )
    })
  }
  const compareUpvoteLengths = (a, b) => {
    return a.node.upvotes.length - a.node.downvotes.length <=
      b.node.upvotes.length - b.node.downvotes.length
      ? -1
      : 1
  }
  let posts
  if (sortByUpvotes.length === 0) {
    posts = generatePosts(edges)
  } else if (sortByUpvotes.includes('hot')) {
    const sortedEdges = [...edges].sort(compareUpvoteLengths).reverse()
    console.log(sortedEdges)
    posts = generatePosts(sortedEdges)
  } else if (sortByUpvotes.includes('cold')) {
    const sortedEdges = [...edges].sort(compareUpvoteLengths)
    posts = generatePosts(sortedEdges)
  }
  const formattedPosts = (
    <>
      {/* <Banner /> */}
      <Filters
        processDate={processDateFilter}
        sort_by_upvotes={setSortByUpvotes}
        setDateFilter={props.setDateFilter}
        dateFilter={props.dateFilter}
        setKindFilter={props.setKindFilter}
        kindFilter={props.kindFilter}
        setUpvoteFilter={props.setUpvoteFilter}
        upvoteFilter={props.upvoteFilter}
        setTagFilter={props.setTagFilter}
        tagFilter={props.tagFilter}
        setTypeofFilter={props.setTypeofFilter}
        kindInactive={props.firstTime}
        kindFilterActive={props.setFirstTime}
      />
      <InfiniteScroll
        pageStart={0}
        loadMore={() => onLoadMore()}
        hasMore={hasNextPage}
        loader={<div key={uuid()}>Loading...</div>}
      >
        {posts}
      </InfiniteScroll>
    </>
  )

  if (formattedPosts.length === 0)
    return <h1>No posts oops... imma add a go-back to clear things</h1>
  return formattedPosts
}
// PostFeed.propTypes = {
//   onLoadMore: PropTypes.func.isRequired,
//   subscribeToNewPosts: PropTypes.func.isRequired,
//   subscribeToNewVotes: PropTypes.func.isRequired
// };
export default PostFeed
