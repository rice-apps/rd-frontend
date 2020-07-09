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

                        const newItem = subscriptionData.data.postCreated;

                        console.log(newItem)

                        return Object.assign({}, prev, {
                            postPagination: {
                                items: [newItem, ...prev.postPagination.items],
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


                        const newItem = subscriptionData.data.postVoteChanged;


                        const newItemIdx =
                            prev.postPagination.items.indexOf(prev.postPagination.items.filter((item) => {
                                return item._id === newItem._id;
                            })[0]);
                    

                        const alreadyExists = 
                            prev.postPagination.items[newItemIdx].upvotes.length === newItem.upvotes.length;

                        if (alreadyExists) {
                            return prev;
                        }

                        return Object.assign({}, prev, {
                            postPagination: {
                                items: [...prev.postPagination.items].splice(newItemIdx, 1, newItem),
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
