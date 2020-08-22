import React, { useState } from 'react'
import DatePicker from 'react-datepicker'

import { useMutation } from '@apollo/client'

import { Checkbox } from '@material-ui/core'

import { Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import log from 'loglevel'
import { POST_CREATE } from '../graphql/Mutations'
import UploadToPost from './UploadToPost'
import {
  PostWrapper,
  Button,
  ButtonWrapper,
  PostHeaderType,
  Form,
  TitleDescriptor,
  TitleWrapper,
  TitleBox,
  BodyWrapper,
  PostingButton,
  BodyBox,
  ImageWrapper,
  ImageBox,
  ExitButton,
  ExtrasWrapper,
  Banner
} from './WritePost.styles'
import { currentUser } from '../utils/apollo'

function WritePost (props) {
  const [url, setUrl] = useState('')

  const callbackURL = childData => {
    setUrl(childData)
  }

  const [startDate, setStart] = useState(new Date().getTime())
  const [endDate, setEnd] = useState(new Date().getTime())
  const [place, setPlace] = useState('')
  const [isPaid, setPaid] = useState(false)
  const [isClosed, setClosed] = useState(false)
  const [postType, setPostType] = useState('Discussion')

  const [postCreate] = useMutation(POST_CREATE)

  if (!props.show) {
    return null
  }

  if (currentUser() === {}) {
    return <Navigate to='/login' />
  }

  let form = <div>Something went wrong! Please report to riceapps.</div>

  const changeStartDate = date => setStart(date)
  const changeEndDate = date => setEnd(date)
  const changePostType = e => setPostType(e.target.id)

  const closeModal = () => {
    props.switchVisibility(false)
  }

  const checkTitleAndBody = (title, body) =>
    title.length <= 0 || body.length <= 0

  const togglePaid = () => setPaid(!isPaid)

  const toggleClosed = () => setClosed(!isClosed)

  switch (postType) {
    case 'Discussion':
      form = (
        <Form>
          <TitleWrapper>
            <TitleDescriptor>Title</TitleDescriptor>
            <TitleBox id='title' contentEditable />
          </TitleWrapper>
          <BodyWrapper>
            <TitleDescriptor>Body</TitleDescriptor>
            <BodyBox id='body' contentEditable />
          </BodyWrapper>
          <ExtrasWrapper>
            <ImageWrapper>
              <TitleDescriptor>Images</TitleDescriptor>
              <ImageBox id='image'>
                <UploadToPost parentUrlCallback={callbackURL} />
                {/* <p>{url}</p> */}
              </ImageBox>
            </ImageWrapper>

            <Banner />

            <PostingButton
              onClick={e => {
                e.preventDefault()
                const title = document.getElementById('title').innerHTML
                const body = document.getElementById('body').innerHTML
                if (checkTitleAndBody(title, body)) return
                try {
                  postCreate({
                    variables: {
                      kind: postType,
                      title,
                      body,
                      imageUrl: url === '' ? null : url
                    }
                  })
                  props.switchVisibility(false)
                } catch (error) {
                  log.error('error', error)
                }
              }}
            >
              Post
            </PostingButton>
          </ExtrasWrapper>
        </Form>
      )
      break
    case 'Event':
      form = (
        <Form>
          <TitleWrapper>
            <TitleDescriptor>Title</TitleDescriptor>
            <TitleBox id='title' contentEditable />
          </TitleWrapper>
          <BodyWrapper>
            <TitleDescriptor>Body</TitleDescriptor>
            <BodyBox id='body' contentEditable />
          </BodyWrapper>
          <ExtrasWrapper>
            <ImageWrapper>
              <TitleDescriptor>Images</TitleDescriptor>
              <ImageBox id='image'>
                <UploadToPost parentUrlCallback={callbackURL} />
              </ImageBox>
            </ImageWrapper>
            Start Date
            <DatePicker selected={startDate} onChange={changeStartDate} />
            End Date
            <DatePicker selected={endDate} onChange={changeEndDate} />
            <input
              type='text'
              name='Place of Event'
              placeholder='Event Location'
              onChange={e => setPlace(e.target.value)}
            />
            <PostingButton
              onClick={e => {
                e.preventDefault()
                try {
                  const title = document.getElementById('title').innerHTML
                  const body = document.getElementById('body').innerHTML
                  if (checkTitleAndBody(title, body)) return
                  postCreate({
                    variables: {
                      kind: postType,
                      title,
                      body,
                      start: startDate,
                      end: endDate,
                      place,
                      imageUrl: url === '' ? null : url
                    }
                  })
                  props.switchVisibility(false)
                } catch (error) {
                  log.error('error', error)
                }
              }}
            >
              Post
            </PostingButton>
          </ExtrasWrapper>
        </Form>
      )
      break
    case 'Job':
      form = (
        <>
          <Form>
            <TitleWrapper>
              <TitleDescriptor>Title</TitleDescriptor>
              <TitleBox id='title' contentEditable />
            </TitleWrapper>
            <BodyWrapper>
              <TitleDescriptor>Body</TitleDescriptor>
              <BodyBox id='body' contentEditable />
            </BodyWrapper>
            <ExtrasWrapper>
              <ImageWrapper>
                <TitleDescriptor>Images</TitleDescriptor>
                <ImageBox id='image'>
                  <UploadToPost parentUrlCallback={callbackURL} />
                </ImageBox>
              </ImageWrapper>
              <input
                type='text'
                name='Place of Job'
                placeholder='Event Location'
                onChange={e => setPlace(e.target.value)}
              />
              Start Date
              <DatePicker
                selected={startDate}
                onChange={changeStartDate}
                style={{ width: 'inherit' }}
              />
              End Date
              <DatePicker selected={endDate} onChange={changeEndDate} />
              <p>Is the job paid?</p>
              {/* Documentation for these: https://material-ui.com/api/checkbox/ */}
              <Checkbox id='isPaid' onChange={togglePaid} />
              <p>Is the job open?</p>
              <Checkbox id='isOpen' onChange={toggleClosed} />
              <PostingButton
                onClick={e => {
                  e.preventDefault()
                  try {
                    const title = document.getElementById('title').innerHTML
                    const body = document.getElementById('body').innerHTML
                    if (checkTitleAndBody(title, body)) return
                    postCreate({
                      variables: {
                        kind: postType,
                        title,
                        body,
                        start: startDate,
                        end: endDate,
                        place,
                        isPaid,
                        isClosed,
                        imageUrl: url === '' ? null : url
                      }
                    })
                    log.info('Submitted and push!')
                    props.switchVisibility(false)
                  } catch (error) {
                    log.error('error', error)
                  }
                }}
              >
                Post
              </PostingButton>
            </ExtrasWrapper>
          </Form>
        </>
      )
      break
    case 'Notice':
      form = (
        <Form>
          <TitleWrapper>
            <TitleDescriptor>Title</TitleDescriptor>
            <TitleBox id='title' contentEditable />
          </TitleWrapper>
          <BodyWrapper>
            <TitleDescriptor>Body</TitleDescriptor>
            <BodyBox id='body' contentEditable />
          </BodyWrapper>

          <ExtrasWrapper>
            <ImageWrapper>
              <TitleDescriptor>Images</TitleDescriptor>
              <ImageBox id='image'>
                <UploadToPost parentUrlCallback={callbackURL} />
              </ImageBox>
            </ImageWrapper>
            Deadline Date
            <DatePicker
              selected={endDate}
              onChange={changeEndDate}
              style={{ width: 'inherit' }}
            />
            <PostingButton
              onClick={e => {
                e.preventDefault()
                try {
                  const title = document.getElementById('title').innerHTML
                  const body = document.getElementById('body').innerHTML
                  if (checkTitleAndBody(title, body)) return
                  postCreate({
                    variables: {
                      kind: postType,
                      title,
                      body,
                      deadline: endDate,
                      imageUrl: url === '' ? null : url
                    }
                  })
                  props.switchVisibility(false)
                } catch (error) {
                  log.error('error', error)
                }
              }}
            >
              Post
            </PostingButton>
          </ExtrasWrapper>
        </Form>
      )
      break

    default:
      throw new Error('something went horribly wrong!')
  }

  return (
    <div>
      <Helmet>
        <title>RiceDiscuss &middot; Compose post</title>
      </Helmet>
      <ButtonWrapper>
        <Button id='Discussion' onClick={changePostType}>
          Discussion
        </Button>
        <Button id='Notice' onClick={changePostType}>
          Notice
        </Button>
        <Button id='Event' onClick={changePostType}>
          Event
        </Button>
        <Button id='Job' onClick={changePostType}>
          Job
        </Button>
      </ButtonWrapper>
      <PostWrapper>
        <PostHeaderType>{postType}</PostHeaderType>
        <ExitButton onClick={closeModal}>+</ExitButton>
        {form}
      </PostWrapper>
    </div>
  )
}

export default WritePost
