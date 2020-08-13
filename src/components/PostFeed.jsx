import InfiniteScroll from "react-infinite-scroller";
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useMutation, useLazyQuery } from "@apollo/client";

import uuid from "uuid/v4";
import PostChunk from "./PostChunk";
import Filters from "./Filters";
import CommentChunk from "./CommentChunk";
import { TOKEN_NAME } from "../utils/config";
import { UPVOTE_POST, DOWNVOTE_POST, SAVE_POST } from "../graphql/Mutations";
import { FETCH_COMMENTS_POST, FETCH_COMMENTS_PARENT } from "../graphql/Queries";
import { COMMENT_CREATED, COMMENT_UPDATED } from "../graphql/Queries";

function PostFeed(props) {
    const userInfo = JSON.parse(localStorage.getItem(TOKEN_NAME));

    const [
        getCommentsPost,
        { subscribeToMore, refetch, ...result },
    ] = useLazyQuery(FETCH_COMMENTS_POST);

    const [upvotePost] = useMutation(UPVOTE_POST);

    const [downvotePost] = useMutation(DOWNVOTE_POST);

    const [savePost] = useMutation(SAVE_POST);

    const {
        onLoadMore,
        subscribeToNewPosts,
        subscribeToNewVotes,
        loading,
        error,
        data,
    } = props;

    useEffect(() => {
        subscribeToNewPosts();
        subscribeToNewVotes();
        // eslint-disable-next-line
    }, []);

    if (error) return <h1>Something went wrong...</h1>;
    if (loading || !data) return <h1>Loading...</h1>;
    
    const {
        postConnection: {
            edges,
            pageInfo: { hasNextPage },
        },
    } = data;

    const posts = edges.map((post, _i) => {
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
                            variables: { post_id: post.node._id },
                        })
                    }
                >
                    Get Comments
                </button>
                <button onClick={() => refetch()}>Refresh Comments</button>
                <CommentChunk {...result} />
            </>
        );
    });

    return (
        <>
            {/* <Banner /> */}
            <InfiniteScroll
                pageStart={0}
                loadMore={() => onLoadMore()}
                hasMore={hasNextPage}
                loader={<div key={uuid()}>Loading...</div>}
            >
                <Filters />
                {posts}
            </InfiniteScroll>
        </>
    );
}

PostFeed.propTypes = {
    onLoadMore: PropTypes.func.isRequired,
    subscribeToNewPosts: PropTypes.func.isRequired,
    subscribeToNewVotes: PropTypes.func.isRequired,
};

export default PostFeed;