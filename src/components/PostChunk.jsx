import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'

import { makeStyles } from '@material-ui/core/styles'
import { grey } from '@material-ui/core/colors'
import Divider from '@material-ui/core/Divider'

import AddToCalendar from 'react-add-to-calendar'

import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import ArrowDropUp from '@material-ui/icons/ArrowDropUp'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import ChatIcon from '@material-ui/icons/Chat'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

import ReactHtmlParser from 'react-html-parser'
import remarkable from '../utils/remarkable'

import TimeAgo from 'react-timeago'
import Truncate from 'react-truncate'

import { FETCH_COMMENTS_NESTED } from '../graphql/Queries'
import { COMMENT_CREATED } from '../graphql/Subscriptions'

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
  Tags,
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
  CommentComponent,
  DividerBottom,
  ShowCommentsDiv,
  CommentInput,
  CommentButton,
  CommentButtonText,
  CommentsDiv
} from './PostChunk.styles'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  }
}))

function PostChunk (props) {
  // Comments stuff starts

  const { data, loading, error, subscribeToMore } = useQuery(
    FETCH_COMMENTS_NESTED,
    {
      variables: {
        post_id: props.post.node._id
      },
      fetchPolicy: 'network-only'
    }
  )

  useEffect(() => {
    const unsubscribeToNewComments = subscribeToMore({
      document: COMMENT_CREATED,
      variables: { post_id: props.post.node._id },
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
  })

  // Comments stuff ends

  const classes = useStyles()
  let oneImage = <></>

  if (props.post.node.imageUrl) {
    oneImage = (
      <img width={500} src={props.post.node.imageUrl} alt='Custom-thing' />
    )
  }

  const myPostID = props.post.node._id
  const myPostLink = '/posts/' + String(myPostID) // forming the url

  const listOfUpvoters = props.post.node.upvotes.map(
    userObject => userObject.username
  )

  const listOfDownvoters = props.post.node.downvotes.map(
    userObject => userObject.username
  )

  const [comment, setComment] = useState('')

  const [isDDOpen, setDDOpen] = useState(false)
  const [isTagsOpen, setTagsOpen] = useState(false)
  const [isUpvoted, setUpvoted] = useState(
    listOfUpvoters.includes(props.userInfo.username)
  )
  const [isDownvoted, setDownvoted] = useState(
    listOfDownvoters.includes(props.userInfo.username)
  )
  const [isCommentOpen, setCommentOpen] = useState(false)
  const [replyID, setReplyID] = useState(null)

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

  
  if (loading) {
    return <p>Loading Comments</p>
  }

  if (error) {
    return <p>Error Fetching Comments</p>
  }
  

  const theComments = data.commentByPost // array

  const calIcon = { 'calendar-plus-o': 'right' }

  const calDropDown = [
    { google: 'Google Calendar' },
    { apple: 'Apple Calendar' }
  ]

  const calEvent = {
    title: props.post.node.title ? props.post.node.title : '',
    description: props.post.node.body ? props.post.node.body : '',
    location: props.post.node.place ? props.post.node.place : '',
    startTime: props.post.node.start ? props.post.node.start : '',
    endTime: props.post.node.end ? props.post.node.end : ''
  }

  const checkComment = comment => comment.length <= 0

  return (
    <>
      <DiscussionBoxSection>
        <DiscussionBox>
          <LeftComponent>
            <Upvote className={classes.root}>
              <IconButton
                style={isUpvoted ? { color: '#7380FF' } : { color: grey[700] }}
                onClick={e => {
                  e.preventDefault()
                  toggleUpvoted()
                  props.upvotePost({
                    variables: {
                      _id: props.post.node._id
                    }
                  })
                }}
              >
                <ArrowDropUp fontSize='large' />
              </IconButton>
            </Upvote>
            <Likes>
              {props.post.node.upvotes.length -
                props.post.node.downvotes.length}
            </Likes>
            <Downvote className={classes.root}>
              <IconButton
                style={
                  isDownvoted ? { color: '#7380FF' } : { color: grey[800] }
                }
                onClick={e => {
                  e.preventDefault()
                  toggleDownvoted()
                  props.downvotePost({
                    variables: {
                      _id: props.post.node._id
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
                {props.post.node.creator.username} |{' '}
                <TimeAgo date={props.post.node.date_created} />
              </a>
            </OriginalPoster>

            <Tags>
              {props.post.node.tags.length > 0 && (
                <Tag>{props.post.node.tags[0]}</Tag>
              )}
              {props.post.node.tags.length > 1 && (
                <Tag>{props.post.node.tags[1]}</Tag>
              )}
              {props.post.node.tags.length > 2 && (
                <Tag>{props.post.node.tags[2]}</Tag>
              )}

              {isTagsOpen &&
                props.post.node.tags
                  .slice(3)
                  .map(tag => <Tag key={tag}>{tag}</Tag>)}

              {props.post.node.tags.length > 3 && (
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
            <DiscussionTitle>
              <Truncate
                lines={1}
                ellipsis={
                  <span>
                    ...
                    <FullPostLink to={myPostLink}>
                      <ReadMore>(Read More)</ReadMore>
                    </FullPostLink>
                  </span>
                }
              >
                {props.post.node.title}
              </Truncate>
            </DiscussionTitle>

            <KindDiv>
              <Kind>{props.post.node.kind}</Kind>
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

                      const currentSavedPosts = props.userInfo.savedPosts.map(
                        tup => tup._id
                      )
                      props.savePost({
                        variables: {
                          savedPosts: [
                            ...currentSavedPosts,
                            props.post.node._id
                          ]
                        }
                      })
                    }}
                  >
                    Save Post
                  </Save>
                  {(props.post.node.kind === 'Event' ||
                    props.post.node.kind === 'Job') && (
                    <AddTo>
                      <AddToCalendar
                        event={calEvent}
                        buttonLabel='Add to '
                        buttonTemplate={calIcon}
                        listItems={calDropDown}
                      />
                    </AddTo>
                  )}

                  <Expand>
                    <FullPostLink to={myPostLink}>Expand</FullPostLink>
                  </Expand>

                  <Report
                    onClick={e => {
                      e.preventDefault()

                      props.reportPost({
                        variables: {
                          _id: props.post.node._id
                        }
                      })
                    }}
                  >
                    Report Post
                  </Report>

                  {props.post.node.creator.username ===
                    props.userInfo.username && (
                    <Delete
                      onClick={e => {
                        e.preventDefault()
                        window.location.reload(false)
                        props.removePost({
                          variables: {
                            _id: props.post.node._id
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
            <DiscussionBody style={{ textAlign: props.post.node.text_align }}>
              <Truncate
                lines={4}
                ellipsis={
                  <span>
                    ...
                    <FullPostLink to={myPostLink}>
                      <ReadMore>(Read More)</ReadMore>
                    </FullPostLink>
                  </span>
                }
              >
                {ReactHtmlParser(remarkable.render(props.post.node.body))}
              </Truncate>
            </DiscussionBody>
            {oneImage}
          </TopMiddleComponent>

          <CommentComponent>
            <DividerBottom>
              <Divider
                style={{ width: '51.5vw', maxWidth: '92%', marginTop: '1vh' }}
              />
            </DividerBottom>

            <ShowCommentsDiv>
              <Button
                startIcon={<ChatIcon />}
                style={{
                  background: 'none',
                  border: 'none',
                  font: 'Avenir',
                  textTransform: 'none',
                  display: 'flex'
                }}
                onClick={toggleComment}
              >
                {isCommentOpen ? (
                  <text>Hide Comments</text>
                ) : (
                  <text>Show Comments</text>
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
                    props.createComment({
                      variables: {
                        creator: props.userInfo.netID,
                        post: props.post.node._id,
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
                <ul>
                  {/* level 1 */}
                  {theComments.map(comment => (
                    <li key={comment._id}>
                      {comment.body}
                      <button onClick={() => setReplyID(comment._id)}>Reply</button>
                      <ul>
                        {/* level 2 */}
                        {comment.children.map(child1 => (
                          <li key={child1._id}>
                            {child1.body}
                            <button onClick={() => setReplyID(child1._id)}>
                              Reply
                            </button>
                            <ul>
                              {/* level 3 */}
                              {child1.children.map(child2 => (
                                <li key={child2._id}>
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
              </CommentsDiv>
            )}
          </CommentComponent>
        </DiscussionBox>
      </DiscussionBoxSection>
    </>
  )
}

export default PostChunk
