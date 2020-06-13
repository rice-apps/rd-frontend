import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import Discussion from "./Discussion";

const DISCUSSION_QUERY = gql`
    query {
        discussionMany {
            _id
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
            _id
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
        />
    );
}

export default Discussions;
