import InfiniteScroll from 'react-infinite-scroller'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useMutation, useLazyQuery } from '@apollo/client'

import uuid from 'uuid/v4'
import PostChunk from './PostChunk'
import Filters from './Filters'
import CommentChunk from './CommentChunk'
import { TOKEN_NAME } from '../config'
import { UPVOTE_POST, DOWNVOTE_POST, SAVE_POST } from '../graphql/Mutations'
import { FETCH_COMMENTS_POST, FETCH_COMMENTS_PARENT } from '../graphql/Queries'
import { COMMENT_CREATED, COMMENT_UPDATED } from '../graphql/Queries'
import { currentUser } from "../utils/apollo"

function PostFeed (props) {
    const userInfo = currentUser()
    const [upvotePost] = useMutation(UPVOTE_POST)
    const [downvotePost] = useMutation(DOWNVOTE_POST)
    const [savePost] = useMutation(SAVE_POST)
    const [getCommentsPost, { refetch, ...result }] = useLazyQuery(FETCH_COMMENTS_POST)

    const [sort_by_upvotes, setSort_by_upvotes] = useState('')

    const {
        onLoadMore,
        subscribeToNewPosts,
        subscribeToNewVotes,
        loading,
        error,
        data,
        all_posts_loading,
        all_posts_error,
        all_posts_ids
    } = props

    useEffect(() => {
        subscribeToNewPosts()
        subscribeToNewVotes()
    }, []);

    useEffect(() => {
        if (all_posts_loading || all_posts_error){ return; }
        console.log(all_posts_ids)
        const edges = all_posts_ids.postConnection.edges;
        const ids = edges.map(edge => edge.node._id);
        console.log(ids)
        setList_of_postIDs(ids);
        refetch();
    }, [all_posts_ids])

    if (error) return <h1>Something went wrong...</h1>
    if (loading || !data) return <h1>Loading...</h1>

    const {
        postConnection: {
            edges,
            pageInfo: { hasNextPage }
        }
    } = data

    if (all_posts_error) return <h1>Something went wrong retrieving all the IDs...</h1>
    if (all_posts_loading) return <h1>Loading all the ids...</h1>

    const {
        postConnection: {
            edges: id_edges
        }
    } = all_posts_ids

    const ids = id_edges.map(edge => edge.node._id);


    const process_date_filter = filter => {
        const today = props.currentDate

        if (filter.length == 0){
            props.setEarlyDateBound(new Date(2000, 1, 1))
        } else if (filter.includes('yesterday')) {
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
    }

    const generate_posts = edges => {
        return edges.map((post, _i) => {
            return (
            <>
                <PostChunk
                userInfo={userInfo}
                upvotePost={upvotePost}
                downvotePost={downvotePost}
                savePost={savePost}
                post={post}
                key={post.node._id}
                />
                <button
                onClick={() =>
                    getCommentsPost({
                    variables: { post_id: post.node._id }
                    })
                }
                >
                Get Comments
                </button>
                <button onClick={() => refetch()}>Refresh Comments</button>
                <CommentChunk {...result} />
            </>
            )
        })
    }
    
    let tags = new Set()
    edges.forEach(edge => {
        edge.node.tags.forEach(tag => {
            tags.add(tag)
        })
    })

    if (tags.size === 0) tags = ['No tags for these filters']
    
    const compare_upvote_lengths = (a, b) => {
        return a.node.upvotes.length - a.node.downvotes.length <= 
            b.node.upvotes.length - b.node.downvotes.length
            ? -1 : 1
    }

    let posts;
    if (sort_by_upvotes.length == 0) {
        posts = generate_posts(edges)
    } else if (sort_by_upvotes.includes('hot')) {
        const sorted_edges = [...edges].sort(compare_upvote_lengths).reverse()
        posts = generate_posts(sorted_edges)
    } else if (sort_by_upvotes.includes('cold')) {
        const sorted_edges = [...edges].sort(compare_upvote_lengths)
        posts = generate_posts(sorted_edges)
    }

    posts = edges.map((post, _i) => {
    return (
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
            tagsList={[...tags]}
            setTags = {props.setTags}
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
    })

    if (posts.length == 0) return <h1>There are no posts lol</h1>
    return posts
}

// PostFeed.propTypes = {
//   onLoadMore: PropTypes.func.isRequired,
//   subscribeToNewPosts: PropTypes.func.isRequired,
//   subscribeToNewVotes: PropTypes.func.isRequired
// };
export default PostFeed