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
<<<<<<< HEAD
    PostWrapper,
    Button,
    ButtonWrapper,
    Form,
    TitleWrapper,
    TitleBox,
    BodyWrapper,
    PostingButton,
    BodyBox,
    ImageWrapper,
    ImageBox,
    ExitButton,
    TitleFlex,
    DateWrapper,
    PaidWrapper,
    JobWrapper,
    LocationWrapper,
    LocationBox,
    TagBox,
    TagWrapper,
    TagChosenWrapper,
    TagChosen,
    TagCircle,
} from "./WritePost.styles";
=======
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
  TitleFlex
} from './WritePost.styles'
import { currentUser } from '../utils/apollo'
>>>>>>> 73e62facf1bed46b48b5835267a108dd5e53a4f8

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

<<<<<<< HEAD
    const [tagList, setTag] = useState([]);

    if (!props.show) {
        return null;
    }
=======
  if (!props.show) {
    return null
  }
>>>>>>> 73e62facf1bed46b48b5835267a108dd5e53a4f8

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

<<<<<<< HEAD
    switch (postType) {
        case "Discussion":
            form = (
                <Form>
                    <TitleWrapper>
                        {/* <TitleDescriptor>Enter Title. . .</TitleDescriptor> */}
                        <TitleBox id="title" contentEditable={true}>
                            Enter Title. . .
                        </TitleBox>
                    </TitleWrapper>
                    <BodyWrapper>
                        {/* <TitleDescriptor>Body</TitleDescriptor> */}
                        <BodyBox id="body" contentEditable={true}>
                            Enter Description. . .
                        </BodyBox>
                    </BodyWrapper>
                    <ImageWrapper>
                        {/* <TitleDescriptor>Images</TitleDescriptor> */}
                        <ImageBox id="image">
                            Add Image
                            <UploadToPost parentUrlCallback={callbackURL} />
                            {/* <p>{url}</p> */}
                        </ImageBox>
                    </ImageWrapper>
                    <TagWrapper>
                        Add Tag
                        <TagBox contentEditable={true}/>
                        <TagChosenWrapper>
                            Your tags: 
                            <TagChosen>
                                <TagCircle/>
                                CS
                            </TagChosen>
                        </TagChosenWrapper>
                    </TagWrapper>
                    <PostingButton
                        onClick={(e) => {
                            e.preventDefault();
                            const title = document.getElementById("title")
                                .innerHTML;
                            const body = document.getElementById("body")
                                .innerHTML;
                            if (checkTitleAndBody(title, body)) return;
                            try {
                                postCreate({
                                    variables: {
                                        kind: postType,
                                        title,
                                        body,
                                        creator: userInfo.netID,
                                        imageUrl: url === "" ? null : url,
                                    },
                                });
                                props.switchVisibility(false);
                            } catch (error) {
                                log.error("error", error);
                            }
                        }}
                    >
                        Post
                    </PostingButton>
                </Form>
            );
            break;
        case "Event":
            form = (
                <Form>
                    <TitleWrapper>
                        <TitleBox id="title" contentEditable={true}>
                            Enter Title. . .
                        </TitleBox>
                        <DateWrapper>
                            From
                            <DatePicker
                                selected={startDate}
                                onChange={changeStartDate}
                                style={{ width: "inherit" }}
                            />
                            to
                            <DatePicker
                                selected={endDate}
                                onChange={changeEndDate}
                            />
                        </DateWrapper>
                    </TitleWrapper>
                    <BodyWrapper>
                        <BodyBox id="body" contentEditable={true}>
                            Enter Description. . .
                        </BodyBox>
                    </BodyWrapper>
                    <ImageBox id="image">
                            Add Image
                            <UploadToPost parentUrlCallback={callbackURL} />
                            {/* <p>{url}</p> */}
                    </ImageBox>
                    <TagWrapper>
                        Add Tag
                        <TagBox contentEditable={true}/>
                        <TagChosenWrapper>
                            Your tags: 
                            <TagChosen>
                                <TagCircle/>
                                CS
                            </TagChosen>
                        </TagChosenWrapper>
                    </TagWrapper>
                    <JobWrapper>
                        <LocationWrapper>
                            Location: 
                            <LocationBox id="place" contentEditable={true}/>
                        </LocationWrapper>
                    </JobWrapper>
                    <PostingButton
                        onClick={(e) => {
                            e.preventDefault();
                            try {
                                const title = document.getElementById("title")
                                    .innerHTML;
                                const body = document.getElementById("body")
                                    .innerHTML;
                                if (checkTitleAndBody(title, body)) return;
                                postCreate({
                                    variables: {
                                        kind: postType,
                                        title,
                                        body,
                                        creator: userInfo.netID,
                                        start: startDate,
                                        end: endDate,
                                        place,
                                        imageUrl: url === "" ? null : url,
                                    },
                                });
                                props.switchVisibility(false);
                            } catch (error) {
                                log.error("error", error);
                            }
                        }}
                    >
                        Post
                    </PostingButton>
                </Form>
            );
            break;
        case "Job":
            form = (
                <>
                    <Form>
                        <TitleWrapper>
                            <TitleBox id="title" contentEditable={true}>
                                Enter Title. . .
                            </TitleBox>
                            <DateWrapper>
                                From
                                <DatePicker
                                    selected={startDate}
                                    onChange={changeStartDate}
                                    style={{ width: "inherit" }}
                                />
                                to
                                <DatePicker
                                    selected={endDate}
                                    onChange={changeEndDate}
                                />
                            </DateWrapper>
                        </TitleWrapper>
                        <BodyWrapper>
                            <BodyBox id="body" contentEditable={true}>
                                Enter Description. . .
                            </BodyBox>
                        </BodyWrapper>
                        <ImageBox id="image">
                            Add Image
                            <UploadToPost parentUrlCallback={callbackURL} />
                            {/* <p>{url}</p> */}
                        </ImageBox>
                        <TagWrapper>
                            Add Tag
                            <TagBox contentEditable={true}/>
                            <TagChosenWrapper>
                                Your tags: 
                                <TagChosen>
                                    <TagCircle/>
                                    CS
                                </TagChosen>
                            </TagChosenWrapper>
                        </TagWrapper>
                        <JobWrapper>
                            <LocationWrapper>
                                Location: 
                                <LocationBox id="place" contentEditable={true}/>
                            </LocationWrapper>
                            <PaidWrapper>
                                <div>Is the job paid?</div>
                                {/* Documentation for these: https://material-ui.com/api/checkbox/ */}
                                <Checkbox id="isPaid" onChange={togglePaid} />
                                <div>Is the job open?</div>
                                <Checkbox id="isOpen" onChange={toggleClosed} />
                            </PaidWrapper>
                        </JobWrapper>
                        <PostingButton
                            onClick={(e) => {
                                e.preventDefault();
                                try {
                                    const title = document.getElementById(
                                        "title",
                                    ).innerHTML;
                                    const body = document.getElementById("body")
                                        .innerHTML;
                                    if (checkTitleAndBody(title, body)) return;
                                    postCreate({
                                        variables: {
                                            kind: postType,
                                            title,
                                            body,
                                            creator: userInfo.netID,
                                            start: startDate,
                                            end: endDate,
                                            place,
                                            isPaid,
                                            isClosed,
                                            imageUrl: url === "" ? null : url,
                                        },
                                    });
                                    log.info("Submitted and push!");
                                    props.switchVisibility(false);
                                } catch (error) {
                                    log.error("error", error);
                                }
                            }}
                        >
                            Post
                        </PostingButton>
                    </Form>
                </>
            );
            break;
        case "Notice":
            form = (
                <Form>
                    <TitleWrapper>
                        <TitleBox id="title" contentEditable={true}>
                            Enter Title. . .
                        </TitleBox>
                        <DateWrapper>
                            Deadline
                            <DatePicker
                                selected={endDate}
                                onChange={changeEndDate}
                            />
                        </DateWrapper>
                    </TitleWrapper> 
                    {/* need to put the descriptor as a placeholder inside the box */}
                    <BodyWrapper>
                        <BodyBox id="body" contentEditable={true}>
                            Enter Description. . .
                        </BodyBox>
                    </BodyWrapper>
                    <ImageBox id="image">
                            Add Image
                            <UploadToPost parentUrlCallback={callbackURL} />
                            {/* <p>{url}</p> */}
                    </ImageBox>
                    <TagWrapper>
                        Add Tag (press enter after each tag)
                        <TagBox id="tag" contentEditable={true}>
                        </TagBox>
                        keyPress(e){
                            (e.keyCode == "Enter") ?
                                console.log('tag', e.target.value);
                                // put the login here
                            }
                        }
                        <TagChosenWrapper>
                            Your tags: 
                            <TagChosen>
                                <TagCircle/>
                                CS
                            </TagChosen>
                        </TagChosenWrapper>
                    </TagWrapper>
                    <PostingButton
                        onClick={(e) => {
                            e.preventDefault();
                            try {
                                const title = document.getElementById("title")
                                    .innerHTML;
                                const body = document.getElementById("body")
                                    .innerHTML;
                                if (checkTitleAndBody(title, body)) return;
                                postCreate({
                                    variables: {
                                        kind: postType,
                                        title,
                                        body,
                                        creator: userInfo.netID,
                                        deadline: endDate,
                                        imageUrl: url === "" ? null : url,
                                    },
                                });
                                props.switchVisibility(false);
                            } catch (error) {
                                log.error("error", error);
                            }
                        }}
                    >
                        Post
                    </PostingButton>
                </Form>
            );
            break;
=======
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
          <ImageWrapper>
            <TitleDescriptor>Images</TitleDescriptor>
            <ImageBox id='image'>
              <UploadToPost parentUrlCallback={callbackURL} />
              {/* <p>{url}</p> */}
            </ImageBox>
          </ImageWrapper>
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
        </Form>
      )
      break
>>>>>>> 73e62facf1bed46b48b5835267a108dd5e53a4f8

    default:
      throw new Error('something went horribly wrong!')
  }

<<<<<<< HEAD
    return (
        <div>
            <Helmet>
                <title>RiceDiscuss &middot; Compose post</title>
            </Helmet>
            <PostWrapper>
                <TitleFlex>
                    Add New Post
                    <ButtonWrapper>
                        <Button id="Discussion" onClick={changePostType}>
                            Discussion
                        </Button>
                        <Button id="Notice" onClick={changePostType}>
                            Notice
                        </Button>
                        <Button id="Event" onClick={changePostType}>
                            Event
                        </Button>
                        <Button id="Job" onClick={changePostType}>
                            Job
                        </Button>
                    </ButtonWrapper>
                    {/* <PostHeaderType>{postType}</PostHeaderType> */}
                    <ExitButton onClick={closeModal}>X</ExitButton>
                </TitleFlex>
                {form}
            </PostWrapper>
        </div>
    );
=======
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
        <TitleFlex>
          <PostHeaderType>{postType}</PostHeaderType>
          <ExitButton onClick={closeModal}>X</ExitButton>
        </TitleFlex>
        {form}
      </PostWrapper>
    </div>
  )
>>>>>>> 73e62facf1bed46b48b5835267a108dd5e53a4f8
}

export default WritePost
