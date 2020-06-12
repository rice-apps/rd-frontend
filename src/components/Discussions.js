import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

import Discussion from "./Discussion";

const DISCUSSION_QUERY = gql`
    query {
        discussionMany {
            title
            body
            creator {
                username
            }
            date_created
        }
    }
`;

const DISCUSSION_SUBSCRIPTION = gql`
    subscription {
        discussionCreated {
            title
            body
            creator {
                username
            }
            date_created
        }
    }
`;

function Discussions() {
    const { subscribeToMore, ...result } = useQuery(DISCUSSION_QUERY);
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

                        const newFeedItem =
                            subscriptionData.data.discussionCreated;

                        return Object.assign({}, prev, {
                            entry: {
                                discussions: [
                                    newFeedItem,
                                    ...prev.entry.discussions,
                                ],
                            },
                        });
                    },
                });
            }}
        />
    );
}

export default Discussions;
