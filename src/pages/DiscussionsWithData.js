import React from "react";

import { useQuery } from "@apollo/react-hooks";

import Discussion from "../components/Discussion";

import { POST_PAGE } from "../graphql/Queries";
import { POST_CREATED } from "../graphql/Subscriptions";

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

                        console.log(prev);

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

                        const alreadyExists =
                            prev.postPagination.items.any((item) => {
                                return item._id === newItem._id;
                            });

                        if (alreadyExists) {
                            return prev;
                        }

                        return Object.assign({}, prev, {
                            postPagination: {
                                items: [newItem, ...prev.postPagination.items],
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
