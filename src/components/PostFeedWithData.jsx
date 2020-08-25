import React, { useState, useEffect } from 'react'

import { useQuery, useLazyQuery } from '@apollo/client'
import { Redirect, useNavigate } from 'react-router-dom'

import { Helmet } from 'react-helmet'
import PostFeed from './PostFeed'
import { POST_PAGE, GET_DEFAULT_IDS } from '../graphql/Queries'
import { POST_CREATED, POST_VOTE_CHANGED} from '../graphql/Subscriptions'
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
    const navigate = useNavigate()
    const [today, setToday] = useState(null)
    const [earlyDateBound, setEarlyDateBound] = useState(new Date(2000, 1, 1))
    const [tags, setTags] = useState([])
    const [kind, setKind] = useState('')

    // these set states are there so we can remember our filters upon filter.jsx remount
    const [upvoteFilter, setUpvoteFilter] = useState('')
    const [dateFilter, setDateFilter] = useState('')
    const [tagFilter, setTagFilter] = useState([])
    const [kindFilter, setKindFilter] = useState('')
    const [list_of_postIDs, setList_of_postIDs] = useState([]) 

    const [modalVisible, setVisibility] = useState(false)

    const { subscribeToMore, fetchMore, refetch, ...result } = useQuery(POST_PAGE,
        {
            variables: {
                after: '',
                listOfIDs: list_of_postIDs
            },
            fetchPolicy: 'cache-and-network',
            nextFetchPolicy: 'cache-first'
        }
    );

    //plan is to filter to get the post_ids, and then fire the above queries to 
    // get detailed information with the query


    // only runs whenever there are no filters
    const { data: all_posts_ids, loading: all_posts_loading, error: all_posts_error} = useQuery(GET_DEFAULT_IDS,
        {
            variables: {
                after: '',
            },
            fetchPolicy: 'cache-and-network',
            nextFetchPolicy: 'cache-first'
        }
    )

    useEffect(() => {
        if (all_posts_loading || all_posts_error){ return; }
        console.log(all_posts_ids)
        const edges = all_posts_ids.postConnection.edges;
        const ids = edges.map(edge => edge.node._id);
        console.log(ids)
        setList_of_postIDs(ids);
        refetch();
    }, [all_posts_ids])

    // by default we set latest day to be today
    // set the query as default
    useEffect(() => {
        setToday(new Date());
    }, [])

    useEffect(() => {
        // refetch()
        // console.log('refetched!')
        // console.log("DATE", today)
        // console.log("earlyday", earlyDateBound)
    }, [today, earlyDateBound])

    // const [modalVisible, setVisibility] = useState(false);
    const openModal = () => setVisibility(true)
    const goToProfile = () => navigate('/profile')

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
                setTags = {setTags}
                currentDate={today}
                setDateFilter={setDateFilter}
                setUpvoteFilter={setUpvoteFilter}
                setKindFilter={setKindFilter}
                setTagFilter={setTagFilter}
                dateFilter={dateFilter}
                upvoteFilter={upvoteFilter}
                kindFilter={kindFilter}
                tagFilter={tagFilter}

                all_posts_id = {all_posts_ids}
                all_posts_error = {all_posts_error}
                all_posts_loading = {all_posts_loading}
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
                    document: POST_VOTE_CHANGED,
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