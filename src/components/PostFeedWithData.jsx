import React, { useState, useEffect } from "react";

import { useQuery, useLazyQuery } from "@apollo/client";
import { Redirect, useHistory } from "react-router-dom";

import { Helmet } from "react-helmet";
import PostFeed from "./PostFeed";
import { POST_PAGE } from "../graphql/Queries";
import { POST_CREATED, POST_VOTE_CHANGED } from "../graphql/Subscriptions";
import WritePost from "./WritePost";

import {
    Background,
    PostFeedContainer,
    BannerContainer,
    RightSidebarContainer,
    LeftSidebarContainer,
} from "./PostFeedWithData.styles";

import { Banner } from "./PostFeed.styles";
import { SideNav } from "./SideNav";

function PostFeedWithData() {
    const history = useHistory();
    const {subscribeToMore, fetchMore, refetch, ...result} = useQuery(POST_PAGE, {
        variables: {
            after: "",
        },

        fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-first",
    });

    const [modalVisible, setVisibility] = useState(false);
    const openModal = () => setVisibility(true);
    const goToProfile = () => history.push("/profile");

    return (
        <>
            <Helmet>
                <title>RiceDiscuss &middot; Your Feed</title>
            </Helmet>
            <Background>
                <LeftSidebarContainer>
                    <SideNav />
                </LeftSidebarContainer>
                <PostFeedContainer>
                    <div style = {{"display": "flex", "gap": "20px"}}>
                        <p
                            onClick={openModal}
                            style={{ background: "lightpink", cursor: "pointer",}}
                        >
                            New Post
                        </p>
                        <p
                            onClick={goToProfile}
                            style={{ background: "lightpink", cursor: "pointer",}}
                        >
                            Profile
                        </p>
                    </div>
                    <BannerContainer>
                        <Banner />
                    </BannerContainer>
                    <PostFeed
                        {...result}
                        refetch = {refetch}
                        onLoadMore={() =>
                            fetchMore({
                                variables: {
                                    after:
                                        result.data.postConnection.pageInfo
                                            .endCursor,
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

                                    return {
                                        ...prev,
                                        postConnection: {
                                            count:
                                                prev.postConnection.count + 1,
                                            edges: [
                                                {
                                                    cursor: btoa(
                                                        JSON.stringify({
                                                            _id:
                                                                subscriptionData
                                                                    .data
                                                                    .postCreated
                                                                    ._id,
                                                        }),
                                                    ),
                                                    node:
                                                        subscriptionData.data
                                                            .postCreated,
                                                },
                                                ...prev.postConnection.edges,
                                            ],
                                            pageInfo:
                                                prev.postConnection.pageInfo,
                                            __typename: "PostConnection",
                                        },
                                    };
                                },
                            });
                        }}
                        subscribeToNewVotes={() => {
                            subscribeToMore({
                                document: POST_VOTE_CHANGED,
                            });
                        }}
                    />
                </PostFeedContainer>
                <RightSidebarContainer />
            </Background>
            <WritePost
                show={modalVisible}
                switchVisibility={setVisibility}
                style={{ position: "fixed" }}
            />
        </>
    );
}

export default PostFeedWithData;