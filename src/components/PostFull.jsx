import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import { GET_POST, FETCH_COMMENTS_NESTED } from '../graphql/Queries'

import { currentUser } from '../utils/apollo'
import {
  UPVOTE_POST,
  DOWNVOTE_POST,
  REPORT_POST,
  REMOVE_POST,
  SAVE_POST,
  CREATE_COMMENT
} from '../graphql/Mutations'

import { makeStyles } from '@material-ui/core/styles'
import { grey } from '@material-ui/core/colors'
import Divider from '@material-ui/core/Divider'

import AddToCalendar from 'react-add-to-calendar'

import IconButton from '@material-ui/core/IconButton'
import ArrowDropUp from '@material-ui/icons/ArrowDropUp'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'
import ShareIcon from '@material-ui/icons/Share'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import log from 'loglevel'

import ReactHtmlParser from 'react-html-parser'
import remarkable from "../utils/remarkable";

import TimeAgo from 'react-timeago'

import {
  DiscussionBoxSection,
  OriginalPoster,
  DiscussionBox,
  LeftComponent,
  Likes,
  Upvote,
  Downvote,
  TopMiddleComponent,
  DiscussionTitle,
  Tags,
  Tag,
  ViewTags,
  MoreOptions,
  DDMenu,
  DiscussionBody,
  BottomComponent,
  Save,
  AddTo,
  Report,
  Delete,
  ShareFacebook,
  ShareTwitter,
  Share,
  BackToFeed,
  CommentInput,
  CommentButton
} from './PostFull.styles'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  }
}))

function PostFull () {
  // *********** post feed setup below

  const userInfo = currentUser()
  const [upvotePost] = useMutation(UPVOTE_POST)
  const [downvotePost] = useMutation(DOWNVOTE_POST)
  const [reportPost] = useMutation(REPORT_POST)
  const [removePost] = useMutation(REMOVE_POST)
  const [savePost] = useMutation(SAVE_POST)
  const [createComment] = useMutation(CREATE_COMMENT)
  // const [getCommentsPost, { refetch, ...result }] = useLazyQuery(
  //   FETCH_COMMENTS_POST
  // )

  // *********** post full setup below

  const { postID } = useParams()

  const resultPost = useQuery(GET_POST, {
    variables: {
      id: postID
    },
    fetchPolicy: 'network-only'
  })

  const resultComments = useQuery(FETCH_COMMENTS_NESTED, {
    variables: {
      post_id: postID
    },
    fetchPolicy: 'network-only'
  })
  // shouldn't need dummy data

  const dummyDataPost = {
    imageUrl: '',
    upvotes: [],
    downvotes: []
  }
  let thePost = dummyDataPost // for now

  // *********** post chunk setup below

  const classes = useStyles()
  let oneImage = <></>

  // *********** post chunk setup below

  if (thePost.imageUrl) {
    oneImage = <img width={500} src={thePost.imageUrl} alt='Custom-thing' />
  }

  let listOfUpvoters = thePost.upvotes.map(userObject => userObject.username)

  let listOfDownvoters = thePost.downvotes.map(
    userObject => userObject.username
  )

  const [isDDOpen, setDDOpen] = useState(false)
  const [isTagsOpen, setTagsOpen] = useState(false)
  const [isUpvoted, setUpvoted] = useState(
    listOfUpvoters.includes(userInfo.username)
  )
  const [isDownvoted, setDownvoted] = useState(
    listOfDownvoters.includes(userInfo.username)
  )

  // *********** post chunk setup below

  const toggleDD = () => {
    setDDOpen(!isDDOpen)
  }

  const toggleTags = () => {
    setTagsOpen(!isTagsOpen)
  }

  const toggleUpvoted = () => {
    setUpvoted(!isUpvoted)
    setDownvoted(false)
  }

  const toggleDownvoted = () => {
    setDownvoted(!isDownvoted)
    setUpvoted(false)
  }

  // *********** post full below

  if (resultPost.loading) {
    return <p>Loading Post</p>
  }

  if (resultPost.error) {
    return <p>Error Fetching Post</p>
  }

  if (resultComments.loading) {
    return <p>Loading Comments</p>
  }

  if (resultComments.error) {
    return <p>Error Fetching Comments</p>
  }

  thePost = resultPost.data.postById // real data

  const theComments = resultComments.data.commentByPost // array
  // are there comments?

  // *********** post chunk things that require thePost below
  // change to real data now that its available

  if (thePost.imageUrl) {
    oneImage = <img width={500} src={thePost.imageUrl} alt='Custom-thing' />
  }

  listOfUpvoters = thePost.upvotes.map(userObject => userObject.username)

  listOfDownvoters = thePost.downvotes.map(userObject => userObject.username)

  // *********** post chunk below

  const calIcon = { 'calendar-plus-o': 'right' }

  const calDropDown = [
    { google: 'Google Calendar' },
    { apple: 'Apple Calendar' }
  ]

  const calEvent = {
    title: thePost.title ? thePost.title : '',
    description: thePost.body ? thePost.body : '',
    location: thePost.place ? thePost.place : '',
    startTime: thePost.start ? thePost.start : '',
    endTime: thePost.end ? thePost.end : ''
  }

  const checkComment = comment => comment.length <= 0

  return (
    <>
      <BackToFeed to='/feed'>Back To Feed</BackToFeed>
      <DiscussionBoxSection>
        {/* <OriginalPoster>
          {thePost.creator.username} -{' '}
          <TimeAgo date={thePost.date_created} />
        </OriginalPoster> */}
        <DiscussionBox>
          <LeftComponent>
            <Upvote className={classes.root}>
              <IconButton
                style={isUpvoted ? { color: '#7380FF' } : { color: grey[700] }}
                onClick={e => {
                  e.preventDefault()
                  toggleUpvoted()
                  upvotePost({
                    variables: {
                      netID: userInfo.netID,
                      _id: thePost._id
                    }
                  })
                }}
              >
                <ArrowDropUp fontSize='large' />
              </IconButton>
            </Upvote>
            <Likes>{thePost.upvotes.length - thePost.downvotes.length}</Likes>
            <Downvote className={classes.root}>
              <IconButton
                style={
                  isDownvoted ? { color: '#7380FF' } : { color: grey[800] }
                }
                onClick={e => {
                  e.preventDefault()
                  toggleDownvoted()
                  downvotePost({
                    variables: {
                      netID: userInfo.netID,
                      _id: thePost._id
                    }
                  })
                }}
              >
                <ArrowDropDown fontSize='large' />
              </IconButton>
            </Downvote>
          </LeftComponent>
          <OriginalPoster>
            <a href='.'>
              {thePost.creator.username} -{' '}
              <TimeAgo date={thePost.date_created} />
            </a>
            <Divider
              style={{ width: '51.5vw', maxWidth: '97%', marginTop: '1vh' }}
            />
          </OriginalPoster>
          <TopMiddleComponent>
            <DiscussionTitle>{thePost.title}</DiscussionTitle>
            <MoreOptions className={classes.root}>
              <IconButton onClick={toggleDD}>
                <MoreHorizIcon open={isDDOpen} />
              </IconButton>
              {isDDOpen && (
                <DDMenu>
                  <Save
                    onClick={e => {
                      e.preventDefault()

                      const currentSavedPosts = userInfo.savedPosts.map(
                        tup => tup._id
                      )
                      savePost({
                        variables: {
                          netID: userInfo.netID,
                          savedPosts: [...currentSavedPosts, thePost._id]
                        }
                      })
                    }}
                  >
                    Save Post
                  </Save>
                  {(thePost.kind === 'Event' || thePost.kind === 'Job') && (
                    <AddTo>
                      <AddToCalendar
                        event={calEvent}
                        buttonLabel='Add to '
                        buttonTemplate={calIcon}
                        listItems={calDropDown}
                      />
                    </AddTo>
                  )}

                  <Report
                    onClick={e => {
                      e.preventDefault()

                      reportPost({
                        variables: {
                          netID: userInfo.netID,
                          _id: thePost._id
                        }
                      })
                    }}
                  >
                    Report Post
                  </Report>

                  {thePost.creator.username === userInfo.username && (
                    <Delete
                      onClick={e => {
                        e.preventDefault()
                        window.location.reload(false)
                        removePost({
                          variables: {
                            _id: thePost._id
                          }
                        })
                      }}
                    >
                      Delete Post
                    </Delete>
                  )}
                </DDMenu>
              )}
            </MoreOptions>

            <DiscussionBody>{ReactHtmlParser(remarkable.render(thePost.body))}</DiscussionBody>

            {oneImage}
          </TopMiddleComponent>

          <BottomComponent>
            <Tags>
              <Tag>{thePost.kind}</Tag>
              {thePost.tags.length > 0 && <Tag>{thePost.tags[0]}</Tag>}
              {thePost.tags.length > 1 && <Tag>{thePost.tags[1]}</Tag>}
              {thePost.tags.length > 2 && <Tag>{thePost.tags[2]}</Tag>}

              {isTagsOpen &&
                thePost.tags.slice(3).map(tag => <Tag key={tag}>{tag}</Tag>)}
              {thePost.tags.length > 3 && (
                <ViewTags onClick={toggleTags}>
                  {isTagsOpen ? (
                    <text>(View Less)</text>
                  ) : (
                    <text>(View All)</text>
                  )}
                </ViewTags>
              )}
            </Tags>

            {/* Location of Comments Button */}

            <ShareFacebook>
              <IconButton>
                <FacebookIcon />
              </IconButton>
            </ShareFacebook>
            <ShareTwitter>
              <IconButton>
                <TwitterIcon />
              </IconButton>
            </ShareTwitter>
            <Share>
              <IconButton>
                <ShareIcon />
              </IconButton>
            </Share>
          </BottomComponent>
        </DiscussionBox>
        <h3>Comments:</h3>
        <ul>
          {/* level 1 */}
          {theComments.map(comment => (
            <li key={comment.id}>
              {comment.body}
              <ul>
                {/* level 2 */}
                {comment.children.map(child1 => (
                  <li key={child1.id}>
                    {child1.body}
                    <ul>
                      {/* level 3 */}
                      {child1.children.map(child2 => (
                        <li key={child2.id}>
                          {child2.body}
                          {/* dont nest any further */}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <h3>-----------------------------------------------------------</h3>
        <CommentInput id='comment' contentEditable>
          Enter Comment. . .
        </CommentInput>

        {/* based on write post post creation button */}
        <CommentButton
          onClick={e => {
            e.preventDefault()
            const cmt = document.getElementById('comment').innerHTML
            if (checkComment(cmt)) return
            try {
              createComment({
                variables: {
                  creator: userInfo.netID,
                  post: postID,
                  parent: null,
                  body: cmt
                }
              })
            } catch (error) {
              log.error(error)
            }
          }}
        >
          Comment
        </CommentButton>
      </DiscussionBoxSection>
    </>
  )
}

export default PostFull
