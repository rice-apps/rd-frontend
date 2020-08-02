import InfiniteScroll from "react-infinite-scroller";
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/client";

import uuid from "uuid/v4";
import PostChunk from "./PostChunk";
import { TOKEN_NAME } from "../utils/config";
import { UPVOTE_POST, DOWNVOTE_POST, SAVE_POST } from "../graphql/Mutations";

function PostFeed(props) {
    const userInfo = JSON.parse(localStorage.getItem(TOKEN_NAME));

    const [upvotePost] = useMutation(UPVOTE_POST);

    const [downvotePost] = useMutation(DOWNVOTE_POST);

    const [savePost] = useMutation(SAVE_POST);

    const {
        onLoadMore,
        subscribeToNewPosts,
        subscribeToNewVotes,
        loading,
        error,
    } = props;

    useEffect(() => {
        subscribeToNewPosts();
        subscribeToNewVotes();
        // eslint-disable-next-line
    }, []);

    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>Something went wrong...</h1>;

    const {
        data: {
            postConnection: {
                edges,
                pageInfo: { hasNextPage },
            },
        },
    } = props;

    const posts = edges.map((post, _i) => {
        return (
            <PostChunk
                userInfo={userInfo}
                upvotePost={upvotePost}
                downvotePost={downvotePost}
                savePost={savePost}
                post={post}
                key={post.node._id}
            />
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
