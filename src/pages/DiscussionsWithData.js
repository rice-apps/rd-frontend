import React from "react";

import { useQuery } from "@apollo/client";

import Discussion from "../components/Discussion";

import { POST_PAGE } from "../graphql/Queries";
import { POST_CREATED, POST_VOTE_CHANGED } from "../graphql/Subscriptions";

import uuid from "uuid/v1";

function DiscussionsWithData() {
    const { subscribeToMore, fetchMore, ...result } = useQuery(POST_PAGE, {
        variables: {
            after: "",
        },

        fetchPolicy: "cache-and-network",
    });

    return (
        <Discussion
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
                                __typename: "PostConnections",
                            },
                        });
                    },
                });
            }}
            subscribeToNewVotes={() => {
                subscribeToMore({
                    document: POST_VOTE_CHANGED,
                    updateQuery: (prev, { subscriptionData }) => {
                        if (!subscriptionData) {
                            return prev;
                        }

                        const {
                            _id,
                            upvotes,
                            downvotes,
                        } = subscriptionData.data.postVoteChanged;

                        const index = prev.postConnection.edges.indexOf(
                            prev.postConnection.edges.filter((item) => {
                                return item.node._id === _id;
                            })[0],
                        );

                        return Object.assign({}, prev, {
                            postConnection: {
                                count: prev.postConnection.count,
                                edges: [
                                    ...prev.postConnection.edges.slice(
                                        0,
                                        index,
                                    ),
                                    ...[
                                        {
                                            ...prev.postConnection.edges[index],
                                            node: {
                                                ...prev.postConnection.edges[
                                                    index
                                                ].node,
                                                upvotes: upvotes,
                                                downvotes: downvotes,
                                            },
                                        },
                                    ],
                                    ...prev.postConnection.edges.slice(
                                        index + 1,
                                    ),
                                ],
                                pageInfo: prev.postConnection.pageInfo,
                                __typename: "PostConnection",
                            },
                        });
                    },
                });
            }}
        />
    );
}

export default DiscussionsWithData;
