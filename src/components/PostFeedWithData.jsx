import React, { useState } from 'react'

import { useQuery } from '@apollo/client'

import { Helmet } from 'react-helmet'
import PostFeed from './PostFeed'
import { POST_PAGE } from '../graphql/Queries'
import { POST_CREATED, POST_VOTE_CHANGED } from '../graphql/Subscriptions'
import WritePost from './WritePost'

import {
  Background,
  PostFeedContainer,
  BannerContainer,
  RightSidebarContainer,
  LeftSidebarContainer
} from './PostFeedWithData.styles'

import { Banner } from './PostFeed.styles'
import { SideNav } from './SideNav'

function PostFeedWithData () {
  const { subscribeToMore, fetchMore, ...result } = useQuery(POST_PAGE, {
    variables: {
      after: ''
    },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first'
  })

  const [modalVisible, setVisibility] = useState(false)

  const openModal = () => {
    setVisibility(true)
  }

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
          <p
            onClick={openModal}
            style={{ background: 'lightpink', cursor: 'pointer' }}
          >
            New Post
          </p>
          <BannerContainer>
            <Banner />
          </BannerContainer>
          <PostFeed
            {...result}
            onLoadMore={() =>
              fetchMore({
                variables: {
                  after: result.data.postConnection.pageInfo.endCursor
                }
              })
            }
            subscribeToNewPosts={() => {
              subscribeToMore({
                document: POST_CREATED,
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData) {
                    return prev
                  }

                  return {
                    ...prev,
                    postConnection: {
                      count: prev.postConnection.count + 1,
                      edges: [
                        {
                          cursor: window.btoa(
                            JSON.stringify({
                              _id: subscriptionData.data.postCreated._id
                            })
                          ),
                          node: subscriptionData.data.postCreated
                        },
                        ...prev.postConnection.edges
                      ],
                      pageInfo: prev.postConnection.pageInfo,
                      __typename: 'PostConnection'
                    }
                  }
                }
              })
            }}
            subscribeToNewVotes={() => {
              subscribeToMore({
                document: POST_VOTE_CHANGED
              })
            }}
          />
        </PostFeedContainer>
        <RightSidebarContainer />
      </Background>
      <WritePost
        show={modalVisible}
        switchVisibility={setVisibility}
        style={{ position: 'fixed' }}
      />
    </>
  )
}

export default PostFeedWithData
