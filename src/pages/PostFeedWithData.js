import React from "react";

import { useQuery } from "@apollo/client";

import PostFeed from "../components/PostFeed";
import { POST_PAGE } from "../graphql/Queries";
import { POST_CREATED, POST_VOTE_CHANGED } from "../graphql/Subscriptions";

import uuid from "uuid/v4";
import { Helmet } from "react-helmet";

function PostFeedWithData() {
    const { subscribeToMore, fetchMore, ...result } = useQuery(POST_PAGE, {
        variables: {
            after: "",
        },

        fetchPolicy: "cache-and-network",
    });

    return (
        <>
        <Helmet>
            <title>RiceDiscuss &middot; Your Feed</title>
        </Helmet>
        <PostFeed
            {...result}
            onLoadMore={() =>
                fetchMore({
                    variables: {
                        after: result.data.postConnection.pageInfo.endCursor,
                    },
                })
            }
            subscribeToNewPosts={() => {
                subscribeToMore({
                    document: POST_CREATED,
                    updateQuery: (prev, { subscriptionData }) => {
                        if (!subscriptionData) {
                            return prev;
                        }

                        return Object.assign({}, prev, {
                            postConnection: {
                                count: prev.postConnection.count + 1,
                                edges: [
                                    {
                                        cursor: uuid(),
                                        node: subscriptionData.data.postCreated,
                                    },
                                    ...prev.postConnection.edges,
                                ],
                                pageInfo: prev.postConnection.pageInfo,
                                __typename: "PostConnection",
                            },
                        });
                    },
                });
            }}
            subscribeToNewVotes={() => {
                subscribeToMore({
                    document: POST_VOTE_CHANGED,
                });
            }}
        />
        </>
    );
}

export default PostFeedWithData;
