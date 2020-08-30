import InfiniteScroll from 'react-infinite-scroller'
import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'

import uuid from 'uuid/v4'
import PostChunk from './PostChunk'
import Filters from './Filters'
import {
  UPVOTE_POST,
  DOWNVOTE_POST,
  REPORT_POST,
  REMOVE_POST,
  SAVE_POST
} from '../graphql/Mutations'
import { currentUser } from '../utils/apollo'

function PostFeed (props) {
  const userInfo = currentUser()
  const [upvotePost] = useMutation(UPVOTE_POST)
  const [downvotePost] = useMutation(DOWNVOTE_POST)
  const [reportPost] = useMutation(REPORT_POST)
  const [removePost] = useMutation(REMOVE_POST)
  const [savePost] = useMutation(SAVE_POST)
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
    const unsubscribeFromPosts = subscribeToNewPosts()
    const unsubscribeFromVotes = subscribeToNewVotes()

    return () => {
      unsubscribeFromPosts()
      unsubscribeFromVotes()
    }
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

    if (filter.length === 0) return
    if (filter.includes('yesterday')) {
      const yesterdayDay = today.getDate() - 1
      const yesterday = (d => new Date(d.setDate(yesterdayDay)))(new Date())
      props.setEarlyDateBound(yesterday)
    } else if (filter.includes('week')) {
      const weekAgoDay = today.getDate() - 7
      const weekAgo = (d => new Date(d.setDate(weekAgoDay)))(new Date())
      props.setEarlyDateBound(weekAgo)
    } else if (filter.includes('month')) {
      const monthAgoDay = today.getMonth() - 1
      const monthAgo = (d => new Date(d.setMonth(monthAgoDay)))(new Date())
      props.setEarlyDateBound(monthAgo)
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