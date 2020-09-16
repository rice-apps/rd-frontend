import React, { useState, useEffect } from 'react'
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
import Button from '@material-ui/core/Button'
import ArrowDropUp from '@material-ui/icons/ArrowDropUp'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import log from 'loglevel'

import ReactHtmlParser from 'react-html-parser'
import remarkable from '../utils/remarkable'

import TimeAgo from 'react-timeago'

import {
  DiscussionBoxSection,
  OriginalPoster,
  DiscussionBox,
  TopComponent,
  DividerTop,
  LeftComponent,
  Likes,
  Upvote,
  Downvote,
  TopMiddleComponent,
  DiscussionTitle,
  KindDiv,
  Kind,
  Tag,
  ViewTags,
  MoreOptions,
  DDMenu,
  DiscussionBody,
  Save,
  AddTo,
  Report,
  Delete,
  FullPostLink,
  Expand,
  ReadMore,
  ImageDiv,
  DescriptorDiv,
  CommentComponent,
  DividerBottom,
  ShowCommentsDiv,
  CommentInput,
  CommentButton,
  CommentButtonText,
  CommentsDiv,
  BoldedSpan,
  NormalSpan
} from './PostChunk.styles'
import {
  BackToFeed,
  Tags
} from './PostFull.styles'
import { tagColors } from './tagColors'
import { COMMENT_CREATED } from '../graphql/Subscriptions'
import CommentChunk from './CommentChunk'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  }
}))

function PostFull () {
  // *********** post feed setup below

  // const [replyID, setReplyID] = useState(null);
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

  const { data, loading, error, subscribeToMore } = useQuery(
    FETCH_COMMENTS_NESTED,
    {
      variables: {
        post_id: postID
      },
      fetchPolicy: 'network-only'
    }
  )

  useEffect(() => {
    const unsubscribeToNewComments = subscribeToMore({
      document: COMMENT_CREATED,
      variables: { post_id: postID },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev

        console.log(prev)
        console.log(subscriptionData)

        const newFeedItem = subscriptionData.data.commentCreated

        console.log(newFeedItem.parent)

        if (typeof newFeedItem.parent === 'undefined') {
          return {
            commentByPost: [newFeedItem, ...prev.commentByPost]
          }
        }
      }
    })

    return () => {
      unsubscribeToNewComments()
    }
  }, [])

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

  const [comment, setComment] = useState('')

  const [isDDOpen, setDDOpen] = useState(false)
  const [isTagsOpen, setTagsOpen] = useState(false)
  const [isUpvoted, setUpvoted] = useState(
    listOfUpvoters.includes(userInfo.username)
  )
  const [isDownvoted, setDownvoted] = useState(
    listOfDownvoters.includes(userInfo.username)
  )
  const [isCommentOpen, setCommentOpen] = useState(true)
  const [replyID, setReplyID] = useState(null)

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

  const toggleComment = () => {
    setCommentOpen(!isCommentOpen)
  }

  // *********** post full below

  if (resultPost.loading) {
    return <p>Loading Post</p>
  }

  if (resultPost.error) {
    return <p>Error Fetching Post</p>
  }

  if (loading) {
    return <p>Loading Comments</p>
  }

  if (error) {
    return <p>Error Fetching Comments</p>
  }


  thePost = resultPost.data.postById

  const theComments = data.commentByPost

  var numComments = theComments.length;

  theComments.map(comment => {
    numComments += comment.children.length
    if (comment.children) {
      comment.children.map(child => {
        numComments += child.children.length
      })
    }
  });

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
    location: thePost.location ? thePost.location : '',
    workplace: thePost.workplace ? thePost.workplace : '',
    startTime: thePost.start ? thePost.start : '',
    endTime: thePost.end ? thePost.end : '',
    deadline: thePost.deadline ? thePost.deadline: ''
  }

  const isPaid = thePost.isPaid;
  let paidString = ""
  if (typeof isPaid === 'boolean'){
    paidString = isPaid === true ? "Yes" : "No"
  }
  const isClosed = thePost.isClosed;
  let closedString = ""
  if (typeof isClosed === 'boolean'){
    closedString = isClosed === true ? "Yes" : "No"
  }

  const jobSpecifics = {
    isPaid: paidString,
    isClosed: closedString
  }

  const months = [ "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December" ];
  //maybe we should put N/A if it wasn't specified hmm...
  let postDescriptor = [];
  if (calEvent.startTime.length > 0){
    const startDate = calEvent.startTime.split('T')[0];
    const formattedDate = startDate.split('-')
    const month = months[parseInt(formattedDate[1], 10) - 1];
    postDescriptor.push(
      <NormalSpan><BoldedSpan>From: </BoldedSpan>{month + ' ' + formattedDate[2] + ", " + formattedDate[0] + `      `}</NormalSpan>
    )
  }
  if (calEvent.endTime.length > 0 || calEvent.deadline.length > 0){
    const until = calEvent.endTime.length > 0 ? calEvent.endTime : calEvent.deadline;
    const endDate = until.split('T')[0];
    const formattedDate = endDate.split('-')
    const month = months[parseInt(formattedDate[1], 10) - 1];
    postDescriptor.push(
      <NormalSpan><BoldedSpan>End: </BoldedSpan>{month + ' ' + formattedDate[2] + ", " + formattedDate[0] + `      `}</NormalSpan>
    )
  }
  if (calEvent.location.length > 0 || calEvent.workplace.length > 0){
    const place = calEvent.location.length > 0 ? calEvent.location : calEvent.workplace;
    postDescriptor.push(
      <NormalSpan><BoldedSpan>Location: </BoldedSpan>{place}</NormalSpan>
    )
  }
  if (jobSpecifics.isPaid.length > 0){
    postDescriptor.push(
      <NormalSpan><BoldedSpan>Paid: </BoldedSpan>{jobSpecifics.isPaid}</NormalSpan>
    )
  }
  if (jobSpecifics.isClosed.length > 0){
    postDescriptor.push(
      <NormalSpan><BoldedSpan>Closed: </BoldedSpan>{jobSpecifics.isClosed}</NormalSpan>
    )
  }

  const checkComment = comment => comment.length <= 0

  return (
    <>
      <BackToFeed to='/feed'>Back To Feed</BackToFeed>
      <DiscussionBoxSection>
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
                      _id: postID
                    }
                  })
                }}
              >
                <ArrowDropUp fontSize='large' />
              </IconButton>
            </Upvote>
            <Likes>
              {thePost.upvotes.length - thePost.downvotes.length}
            </Likes>
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
                      _id: postID
                    }
                  })
                }}
              >
                <ArrowDropDown fontSize='large' />
              </IconButton>
            </Downvote>
          </LeftComponent>
          <TopComponent>
            <OriginalPoster>
              <a>
                {thePost.creator.username} -{' '}
                <TimeAgo date={thePost.date_created} />
              </a>
            </OriginalPoster>

            <Tags>
              {thePost.tags.length > 0 && (
                <Tag style={tagColors[0 % tagColors.length]}>
                  {thePost.tags[0]}
                </Tag>
              )}
              {thePost.tags.length > 1 && (
                <Tag style={tagColors[1 % tagColors.length]}>
                  {thePost.tags[1]}
                </Tag>
              )}
              {thePost.tags.length > 2 && (
                <Tag style={tagColors[2 % tagColors.length]}>
                  {thePost.tags[2]}
                </Tag>
              )}

              {isTagsOpen &&
                thePost.tags.slice(3).map((tag, index) => (
                  <Tag key={tag} style={tagColors[index % tagColors.length]}>
                    {tag}
                  </Tag>
                ))}

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
            <DividerTop>
              <Divider
                style={{ width: '51.5vw', maxWidth: '92%', marginTop: '1vh' }}
              />
            </DividerTop>
          </TopComponent>
          <TopMiddleComponent>
            <DiscussionTitle>{thePost.title}</DiscussionTitle>

            <KindDiv>
              <Kind>{thePost.kind}</Kind>
            </KindDiv>

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
                          savedPosts: [
                            ...currentSavedPosts,
                            thePost._id
                          ]
                        }
                      })
                    }}
                  >
                    Save Post
                  </Save>
                  {(thePost.kind === 'Event' ||
                    thePost.kind === 'Job') && (
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
                          _id: thePost._id
                        }
                      })
                    }}
                  >
                    Report Post
                  </Report>

                  {thePost.creator.username ===
                    userInfo.username && (
                      <Delete
                        onClick={e => {
                          e.preventDefault()
                          removePost({
                            variables: {
                              _id: thePost._id
                            }
                          })
                          window.location.reload(false)
                        }}
                      >
                        Delete Post
                      </Delete>
                    )}
                </DDMenu>
              )}
            </MoreOptions>
            <DiscussionBody style={{ textAlign: thePost.text_align }}>
              {ReactHtmlParser(remarkable.render(thePost.body))}
            </DiscussionBody>
            <ImageDiv>
              {oneImage}
            </ImageDiv>
            <DescriptorDiv>
              {postDescriptor}
            </DescriptorDiv>
          </TopMiddleComponent>

          <CommentComponent>
            <DividerBottom>
              <Divider
                style={{ width: '51.5vw', maxWidth: '92%', marginTop: '1vh' }}
              />
            </DividerBottom>

            <ShowCommentsDiv>
              <Button
                startIcon={<CommentOutlinedIcon fontSize="large"/>}
                style={{
                  background: 'none',
                  border: 'none',
                  font: 'Avenir',
                  textTransform: 'none',
                  display: 'flex',
                }}
                onClick={toggleComment}
              >
                {isCommentOpen ? (
                  <text style={{color: '#67687E'}}>Hide Comments ({numComments})</text>
                ) : (
                  <text style={{color: '#67687E'}}>Show Comments ({numComments})</text>
                )}
              </Button>
            </ShowCommentsDiv>

            {isCommentOpen && (
              <CommentInput
                placeholder='Comment here...'
                onChange={e => setComment(e.target.value)}
              />
            )}
            {isCommentOpen && (
              <CommentButton
                onClick={e => {
                  e.preventDefault()
                  if (checkComment(comment)) return
                  try {
                    createComment({
                      variables: {
                        creator: userInfo.netID,
                        post: thePost._id,
                        parent: null,
                        body: comment
                      }
                    })
                    setComment('')
                    e.target.value = ''
                  } catch (error) {
                    console.error(error)
                  }
                }}
              >
                <CommentButtonText>
                  Post Comment
                </CommentButtonText>
              </CommentButton>
            )}
            {isCommentOpen && (
              <CommentsDiv>
                <ul style={{listStyleType:"none", paddingLeft:"0px"}}>
                  {/* level 1 */}
                  {theComments.map((comment) => (
                    <li key={comment._id} style={{listStyleType:"none"}}>
                      <CommentChunk comment={comment} postID={thePost._id} setParentID={setReplyID} isLeaf={false}></CommentChunk>
                      {/* <button onClick={() => setReplyID(comment._id)}>Reply</button> */}
                      <ul style={{listStyleType:"none"}}>
                        {/* level 2 */}
                        {comment.children.map((child1) => (
                          <li key={child1._id} style={{listStyleType:"none"}}>
                            <CommentChunk comment={child1} postID={thePost._id} isLeaf={false}></CommentChunk>
                            {/* <button onClick={() => setReplyID(child1._id)}>
                              Reply
                            </button> */}
                            <ul style={{listStyleType:"none"}}>
                              {/* level 3 */}
                              {child1.children.map((child2) => (
                                <li key={child2._id} style={{listStyleType:"none"}}>
                                  <CommentChunk comment={child2} postID={thePost._id} isLeaf={true}></CommentChunk>
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
              </CommentsDiv>
            )}
          </CommentComponent>
        </DiscussionBox>
      </DiscussionBoxSection>
    </>
  )
}

export default PostFull
