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
  SAVE_POST
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
  const [getCommentsPost, { refetch, ...result }] = useLazyQuery(
    FETCH_COMMENTS_POST
  )

  const [sort_by_upvotes, setSort_by_upvotes] = useState('')

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

  const process_date_filter = filter => {
    const today = props.currentDate

    if (filter.length == 0) return
    if (filter.includes('yesterday')) {
      const yesterday_day = today.getDate() - 1
      const yesterday = (d => new Date(d.setDate(yesterday_day)))(new Date())
      props.setEarlyDateBound(yesterday)
    } else if (filter.includes('week')) {
      const week_ago_day = today.getDate() - 7
      const week_ago = (d => new Date(d.setDate(week_ago_day)))(new Date())
      props.setEarlyDateBound(week_ago)
    } else if (filter.includes('month')) {
      const month_ago_day = today.getMonth() - 1
      const month_ago = (d => new Date(d.setMonth(month_ago_day)))(new Date())
      props.setEarlyDateBound(month_ago)
    }
    console.log("FUCCCKED")
  }

  const generate_posts = edges => {
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

  const compare_upvote_lengths = (a, b) => {
    return a.node.upvotes.length - a.node.downvotes.length 
          <= b.node.upvotes.length - b.node.downvotes.length ? -1 : 1
  }

  let posts
  if (sort_by_upvotes.length == 0) {
    posts = generate_posts(edges)
  } else if (sort_by_upvotes.includes('hot')) {
    const sorted_edges = [...edges].sort(compare_upvote_lengths).reverse()
    console.log(sorted_edges)
    posts = generate_posts(sorted_edges)
  } else if (sort_by_upvotes.includes('cold')) {
    const sorted_edges = [...edges].sort(compare_upvote_lengths)
    posts = generate_posts(sorted_edges)
  }

  const formatted_posts = 
    (
      <>
        {/* <Banner /> */}
        <Filters
            processDate={process_date_filter}
            sort_by_upvotes={setSort_by_upvotes}
            setDateFilter={props.setDateFilter}
            dateFilter={props.dateFilter}
            setKindFilter={props.setKindFilter}
            kindFilter={props.kindFilter}
            setUpvoteFilter={props.setUpvoteFilter}
            upvoteFilter={props.upvoteFilter}
            setTagFilter={props.setTagFilter}
            tagFilter={props.tagFilter}

            setTypeofFilter={props.setTypeofFilter}
            firstTime={props.firstTime}
            setFirstTime={props.setFirstTime}
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
  

  if (formatted_posts.length == 0) return (<h1>No posts oops... imma add a go-back to clear things</h1>);
  return formatted_posts
}
// PostFeed.propTypes = {
//   onLoadMore: PropTypes.func.isRequired,
//   subscribeToNewPosts: PropTypes.func.isRequired,
//   subscribeToNewVotes: PropTypes.func.isRequired
// };
export default PostFeed