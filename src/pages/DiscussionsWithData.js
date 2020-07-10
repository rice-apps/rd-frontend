import React from "react";

import { useQuery } from "@apollo/react-hooks";

import Discussion from "../components/Discussion";

import { POST_PAGE } from "../graphql/Queries";
import { POST_CREATED, POST_VOTE_CHANGED } from "../graphql/Subscriptions";

function DiscussionsWithData() {
    const { subscribeToMore, fetchMore, ...result } = useQuery(POST_PAGE, {
        variables: {
            page: 1,
            perPage: 10,
        },

        fetchPolicy: "cache-and-network",
    });

    return (
        <Discussion
            {...result}
            onLoadMore={(newPage) =>
                fetchMore({
                    updateQuery: (prev, { fetchMoreResult }) => {
                        if (!fetchMoreResult) {
                            return prev;
                        }

                        const final = Object.assign({}, prev, {
                            postPagination: {
                                items: [
                                    ...prev.postPagination.items,
                                    ...fetchMoreResult.postPagination.items,
                                ],
                                pageInfo: prev.postPagination.pageInfo,
                                __typename: "PostPagination",
                            },
                        });

                        return final;
                    },
                    variables: {
                        page: newPage,
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
                            postPagination: {
                                items: [
                                    subscriptionData.data.postCreated,
                                    ...prev.postPagination.items,
                                ],
                                __typename: "PostPagination",
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

                        const index = prev.postPagination.items.indexOf(
                            prev.postPagination.items.filter((item) => {
                                return item._id === _id;
                            })[0],
                        );

                        const updatedItem = Object.assign(
                            {},
                            prev.postPagination.items[index],
                        );

                        updatedItem.upvotes = upvotes;
                        updatedItem.downvotes = downvotes;

                        return Object.assign({}, prev, {
                            postPagination: {
                                items: [
                                    ...prev.postPagination.items.slice(
                                        0,
                                        index,
                                    ),
                                    ...[updatedItem],
                                    ...prev.postPagination.items.slice(
                                        index + 1,
                                    ),
                                ],
                                pageInfo: prev.postPagination.pageInfo,
                                __typename: "PostPagination",
                            },
                        });
                    },
                });
            }}
        />
    );
}

export default DiscussionsWithData;
