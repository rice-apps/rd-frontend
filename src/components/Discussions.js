import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { InfiniteScroll } from 'react-infinite-scroller';

import Discussion from "./Discussion";

import { DISCUSSION_QUERY } from "../server/Queries";
import { DISCUSSION_SUBSCRIPTION } from "../server/Subscriptions";

function Discussions() {
    const { subscribeToMore, fetchMore, ...result } = useQuery(DISCUSSION_QUERY, {
        variables: {
            page: 1,
            perPage: 10,
        }
    });
    const [posts, setPosts] = useState([]);

    console.log(result);

    return (
        <Discussion
            {...result}
            subscribeToNewDiscussion={() => {
                subscribeToMore({
                    document: DISCUSSION_SUBSCRIPTION,
                    updateQuery: (prev, { subscriptionData }) => {
                        if (!subscriptionData.data) {
                            return prev;
                        }

                        const newDiscussion =
                            subscriptionData.data.discussionCreated;

                        // TODO: find a less kludgy way to prevent duplicate store updates

                        const idAlreadyExists =
                            prev.discussionMany.filter((item) => {
                                return item._id === newDiscussion._id;
                            }).length > 0;

                        if (idAlreadyExists) {
                            return prev;
                        }

                        const final = Object.assign({}, prev, {
                            discussionMany: [
                                ...prev.discussionMany,
                                newDiscussion,
                            ],
                        });

                        return final;
                    },
                });
            }}
        >
            <InfiniteScroll
                pageStart={0}
                loadMore={fetchMore({
                    variables: {
                        page: 2,
                        perPage: 10,
                    },
                    updateQuery: (prev, { fetchMoreResult}) => {
                        return fetchMoreResult;
                    }
                })}
                hasMore={true || false}
                loader={<div className="loader" key={0}>Loading ...</div>}
                useWindow={false}>
                {posts}
            </InfiniteScroll>
        </Discussion>
    );
}

export default Discussions;
