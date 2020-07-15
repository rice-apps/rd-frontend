import React, { useEffect } from "react";

import { useMutation } from "@apollo/client";

import { UPVOTE_POST, DOWNVOTE_POST } from "../graphql/Mutations";

import { TOKEN_NAME } from "../utils/config";

import PostChunk from "./PostChunk";

import { Banner } from "./Discussion.styles";

function Discussion(props) {
    const userInfo = JSON.parse(localStorage.getItem(TOKEN_NAME));

    const [upvotePost] = useMutation(UPVOTE_POST);

    const [downvotePost] = useMutation(DOWNVOTE_POST);

    const { onLoadMore, subscribeToNewPosts, subscribeToNewVotes } = props;

    useEffect(() => {
        subscribeToNewPosts();
        subscribeToNewVotes();
        // eslint-disable-next-line
    }, []);

    if (props.loading) return <h1>Loading...</h1>;
    if (props.error) return <h1>Something went wrong...</h1>;

    const discussions = props.data.postConnection.edges.map((post, i) => {
        return (
            <PostChunk
                userInfo={userInfo}
                upvotePost={upvotePost}
                downvotePost={downvotePost}
                post={post}
                key={i}
            />
        );
    });

    return (
        <React.Fragment>
            <Banner />
            {discussions}
            <button
                onClick={() => {
                    onLoadMore();
                }}
            >
                Load More
            </button>
        </React.Fragment>
    );
}

export default Discussion;
