import InfiniteScroll from "react-infinite-scroller";
import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";

import PostChunk from "./PostChunk";
import { Banner } from "./PostFeed.styles";
import { TOKEN_NAME } from "../utils/config";
import { UPVOTE_POST, DOWNVOTE_POST } from "../graphql/Mutations";

function PostFeed(props) {
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

    const posts = props.data.postConnection.edges.map((post, i) => {
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
            <InfiniteScroll
                pageStart={0}
                loadMore={() => onLoadMore()}
                hasMore={props.data.postConnection.pageInfo.hasNextPage}
                loader={<div>Loading...</div>}
            >
                {posts}
            </InfiniteScroll>
        </React.Fragment>
    );
}

export default PostFeed;
