import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { grey } from '@material-ui/core/colors'
import Divider from '@material-ui/core/Divider'

import AddToCalendar from 'react-add-to-calendar'

import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import ArrowDropUp from '@material-ui/icons/ArrowDropUp'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import ChatIcon from '@material-ui/icons/Chat'
import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'
import ShareIcon from '@material-ui/icons/Share'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

import ReactHtmlParser from 'react-html-parser'

import JavascriptTimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import ReactTimeAgo from 'react-time-ago'

import Truncate from 'react-truncate';

import { useLazyQuery, useQuery } from '@apollo/client'
import { FETCH_COMMENTS_POST, FETCH_COMMENTS_NESTED } from '../graphql/Queries'

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
  Kind,
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
  Comment,
  ShareFacebook,
  ShareTwitter,
  Share,
  FullPostLink,
  Expand,
  ReadMore,
  CommentComponent,
  DividerBottom,
  ShowCommentsDiv,
  NewCommentDiv,
  PostCommentDiv,  
  CommentsDiv,
  CommentInput,
  CommentButton
} from './PostChunk.styles'
import CommentChunk from './CommentChunk'

JavascriptTimeAgo.addLocale(en)

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  }
}))

function PostChunk (props) {
  const classes = useStyles()
  let oneImage = <></>

  if (props.post.node.imageUrl) {
    oneImage = (
      <img width={500} src={props.post.node.imageUrl} alt='Custom-thing' />
    )
  }

  const [getCommentsPost] = useLazyQuery(FETCH_COMMENTS_POST)

  const myPostID = props.post.node._id
  const myPostLink = '/posts/' + String(myPostID) // forming the url

  const listOfUpvoters = props.post.node.upvotes.map(
    userObject => userObject.username
  )

  const listOfDownvoters = props.post.node.downvotes.map(
    userObject => userObject.username
  )

  const [isDDOpen, setDDOpen] = useState(false)
  const [isTagsOpen, setTagsOpen] = useState(false)
  const [isUpvoted, setUpvoted] = useState(
    listOfUpvoters.includes(props.userInfo.username)
  )
  const [isDownvoted, setDownvoted] = useState(
    listOfDownvoters.includes(props.userInfo.username)
  )
  const [isCommentOpen, setCommentOpen] = useState(false)

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

  const resultComments = useQuery(FETCH_COMMENTS_NESTED, {
    variables: {
      post_id: props.post.node._id
    },
    fetchPolicy: 'network-only'
  })

  const checkComment = comment => comment.length <= 0
  const theComments = resultComments.data.commentByPost

  

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
                      netID: props.userInfo.netID,
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
                      netID: props.userInfo.netID,
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
                <ReactTimeAgo date={props.post.node.date_created} />
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
              <Truncate lines={2} ellipsis={<span>... 
                <FullPostLink to={myPostLink}>
                  <ReadMore>
                    Read More
                  </ReadMore>
                </FullPostLink></span>}>
                {props.post.node.title}
              </Truncate>
              <Kind>{props.post.node.kind}</Kind>
            </DiscussionTitle>
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
                          netID: props.userInfo.netID,
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
                          netID: props.userInfo.netID,
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
              <Truncate lines={4} ellipsis={<span>... 
                  <FullPostLink to={myPostLink}>
                    <ReadMore>
                      Read More
                    </ReadMore>
                  </FullPostLink></span>}>
                {ReactHtmlParser(props.post.node.body)}
              </Truncate>
            </DiscussionBody>

            {oneImage}
          </TopMiddleComponent>

          

          <BottomComponent>

        
            <Comment>
              <Button 
                variant='contained'
                startIcon={<ChatIcon />}
                style={{
                  backgroundColor: 'rgba(109, 200, 249, .3)',
                  textTransform: 'none',
                  maxWidth: '8vw',
                  display: 'flex'
                }}
                onClick={toggleComment}
              >
                {isCommentOpen ? (
                    <text>Cancel</text>
                  ) : (
                    <text>Comment</text>
                  )}
              </Button>
            </Comment>
              
            {isCommentOpen && 
              (
                <CommentInput id='comment' contentEditable={true}>
                  Enter Comment. . .
                </CommentInput>
              ) &&
              (
                <CommentButton
                  onClick={e => {
                    e.preventDefault()
                    const cmt = document.getElementById('comment').innerHTML
                    if (props.checkComment(cmt)) return
                    try {
                      props.createComment({
                        variables: {
                          creator: props.userInfo.netID,
                          post: props.post.node._id,
                          parent: null,
                          body: cmt
                        }
                      })
                    } catch (error) {
                      console.log.error(error)
                    }
                  }}
                >
                  Post Comment
                </CommentButton>
              )}
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

          <CommentComponent>

            <DividerBottom>
              <Divider
                style={{ width: '51.5vw', maxWidth: '92%', marginTop: '1vh' }}
              />
            </DividerBottom>

            <ShowCommentsDiv>
              Show/Hide comments, Share with ...
            </ShowCommentsDiv>

            <NewCommentDiv>
              <CommentInput id='comment' contentEditable={true}>
                Enter Comment. . .
              </CommentInput>
            </NewCommentDiv>

            <PostCommentDiv>
              {/* based on write post post creation button */}
              <CommentButton
                onClick={e => {
                  e.preventDefault()
                  const cmt = document.getElementById('comment').innerHTML
                  if (checkComment(cmt)) return
                  try {
                    props.createComment({
                      variables: {
                        post: props.post.node._id,
                        parent: null,
                        body: cmt
                      }
                    })
                  } catch (error) {
                    console.log.error(error)
                  }
                }}
              >
                Post Comment
              </CommentButton>
            </PostCommentDiv>

            

          </CommentComponent>

        </DiscussionBox>
      </DiscussionBoxSection>
    </>
  )
}

export default PostChunk
