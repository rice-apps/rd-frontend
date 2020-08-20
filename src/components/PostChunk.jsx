import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { red, grey } from '@material-ui/core/colors'

import AddToCalendar from 'react-add-to-calendar'

import IconButton from '@material-ui/core/IconButton'
import ArrowDropUp from '@material-ui/icons/ArrowDropUp'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'
import ShareIcon from '@material-ui/icons/Share'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

import ReactHtmlParser from 'react-html-parser'

import JavascriptTimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import ReactTimeAgo from 'react-time-ago'

import {
  DiscussionBoxSection,
  OP,
  Time,
  DiscussionBox,
  LeftComponent,
  Likes,
  Upvote,
  Downvote,
  TopMiddleComponent,
  DiscussionTitleDiv,
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
  FullPostLink,
  Expand,
} from './PostChunk.styles'

JavascriptTimeAgo.addLocale(en)

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  }
}))

function PostChunk(props) {
  const classes = useStyles()
  let oneImage = <></>

  if (props.post.node.imageUrl) {
    oneImage = (
      <img width={500} src={props.post.node.imageUrl} alt='Custom-thing' />
    )
  }

  const myPostID = props.post.node._id;
  const myPostLink = "/posts/" + String(myPostID); // forming the url

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

  return (
    <>
      <DiscussionBoxSection>
        <OP>
          {props.post.node.creator.username} -{' '}
          <ReactTimeAgo date={props.post.node.date_created} />
        </OP>
        <DiscussionBox>
          <LeftComponent>
            <Upvote className={classes.root}>
              <IconButton
                style={isUpvoted ? { color: red[200] } : { color: grey[700] }}
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
                style={isDownvoted ? { color: red[200] } : { color: grey[800] }}
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

          <TopMiddleComponent>
            <DiscussionTitleDiv>
              <DiscussionTitle>{props.post.node.title}</DiscussionTitle>
            </DiscussionTitleDiv>
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

                      console.log(props.userInfo.savedPosts)
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
                        ></AddToCalendar>
                      </AddTo>

                    )}

                  <Expand>
                    <FullPostLink to={myPostLink}>
                      Expand
                    </FullPostLink>
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

            <DiscussionBody>
              {ReactHtmlParser(props.post.node.body)}
            </DiscussionBody>

            {oneImage}
          </TopMiddleComponent>

          <BottomComponent>
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
                props.post.node.tags.slice(3).map(tag => <Tag>{tag}</Tag>)}

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
      </DiscussionBoxSection>
    </>
  )
}

export default PostChunk
