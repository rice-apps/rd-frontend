import React, { useState, useEffect } from 'react'

import { useQuery, useLazyQuery } from '@apollo/client'
import { Redirect, useNavigate } from 'react-router-dom'

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
  LeftSidebarContainer,
  NewPostButtonContainer,
  NewPostButton,
  ButtonText
} from './PostFeedWithData.styles'

import { Banner } from './PostFeed.styles'
import { SideNav } from './SideNav'
import AddCircleIcon from '@material-ui/icons/AddCircle'

function PostFeedWithData () {
  const history = useNavigate()
  const [today, setToday] = useState(null)
  const [earlyDateBound, setEarlyDateBound] = useState(new Date(2000, 1, 1))
  const [kind, setKind] = useState('')

  // these set states are there so we can remember our filters upon filter.jsx remount
  const [upvoteFilter, setUpvoteFilter] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const [tagFilter, setTagFilter] = useState([])
  const [kindFilter, setKindFilter] = useState('')

  const { subscribeToMore, fetchMore, refetch, ...result } = useQuery(
    POST_PAGE,
    {
      variables: {
        after: '',
        today: today,
        earlyDate: earlyDateBound
        // kind: kind,
      },
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-first'
    }
  )

  const [modalVisible, setVisibility] = useState(false)

  // by default we set latest day to be today
  useEffect(() => {
    setToday(new Date())
  }, [])

  useEffect(() => {
    refetch()
    console.log('refetched!')
  }, [today, earlyDateBound])

  // const [modalVisible, setVisibility] = useState(false);
  const openModal = () => setVisibility(true)
  const goToProfile = () => history.push('/profile')

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
          <NewPostButtonContainer>
            <NewPostButton onClick={openModal}>
              <AddCircleIcon
                style={{ color: '#EAB4AC', width: '1.3vw', height: '1.3vw' }}
              />
              <ButtonText>Create Post</ButtonText>
            </NewPostButton>
          </NewPostButtonContainer>
          <div style={{ display: 'flex', gap: '20px' }}>
            <p
              onClick={openModal}
              style={{ background: 'lightpink', cursor: 'pointer' }}
            >
              New Post
            </p>
            <p
              onClick={goToProfile}
              style={{ background: 'lightpink', cursor: 'pointer' }}
            >
              Profile
            </p>
          </div>

          <BannerContainer>
            <Banner />
          </BannerContainer>
          <PostFeed
            {...result}
            setEarlyDateBound={setEarlyDateBound}
            currentDate={today}
            setDateFilter={setDateFilter}
            setUpvoteFilter={setUpvoteFilter}
            setKindFilter={setKindFilter}
            setTagFilter={setTagFilter}
            dateFilter={dateFilter}
            upvoteFilter={upvoteFilter}
            kindFilter={kindFilter}
            tagFilter={tagFilter}
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
                          node: {
                            ...subscriptionData.data.postCreated,
                            __typename: 'PostNode'
                          },
                          __typename: 'PostEdge'
                        },
                        ...prev.postConnection.edges
                      ],
                      pageInfo: {
                        ...prev.postConnection.pageInfo,
                        startCursor: window.btoa(
                          JSON.stringify({
                            _id: subscriptionData.data.postCreated._id
                          })
                        ),
                        __typename: 'PageInfo'
                      },
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
