import React, { useState, useRef } from 'react'
import DatePicker from 'react-datepicker'

import { useMutation } from '@apollo/client'

import { Checkbox } from '@material-ui/core'

import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js'
// import redraft, { createBlockRenderer, createStylesRenderer } from 'redraft'
import 'draft-js/dist/Draft.css';

import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import StrikethroughSIcon from '@material-ui/icons/StrikethroughS';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
// import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import InsertLinkIcon from '@material-ui/icons/InsertLink';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import ImageIcon from '@material-ui/icons/Image';


import { Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import log from 'loglevel'
import { POST_CREATE } from '../graphql/Mutations'
// import UploadToPost from './UploadToPost'
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
  Banner,
  ModalTitle,
  FormWrapper,
  DatesWrapper,
  TagWrapper,
  SelectCategoryWrapper,
  SuggestedTags,
  LocationJobInfoWrapper,
  DraftSubmitWrapper,
  RichIcons,
  IconButton,
  RichEditorWrapper, SuggestedTagsWrapper, TagBox, Tag, SaveAsDraft
} from './WritePost.styles'
import { currentUser } from '../utils/apollo'

const styleMap = {
  'STRIKETHROUGH': {
    textDecoration: 'line-through',
  },
};

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

  const editorRef = useRef(null)

  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
  const [textAlignment, setTextAlignment] = useState('left')

  // const [dummyState, setDummyState] = useState(null)

  // console.log(RichUtils.getCurrentBlockType(editorState))

  // console.log(dummyState)

  const RichButton = props => {

    const handleRichClick = e => {
      e.preventDefault()
      // e.stopPropagation()
      // editorRef.current.focus()
      if (props.type === 'align') {
        setTextAlignment(props.op)
      } else if (props.type === 'style') {
        const newState = RichUtils.toggleInlineStyle(editorState, props.op)
        if (newState) {
          setEditorState(newState)
          return 'handled';
        }
        return 'not-handled';
      } else if (props.type === 'list') {
        const newState = RichUtils.toggleBlockType(editorState, props.op)
        if (newState) {
          setEditorState(newState)
          return 'handled';
        }
        return 'not-handled';
    }
    }

    const backgroundBoolean = {
      'align': textAlignment === props.op,
      'style': editorState.getCurrentInlineStyle().has(props.op),
      'list': RichUtils.getCurrentBlockType(editorState) === props.op,
      'default': false,
    }

    const style = backgroundBoolean[props.type] || backgroundBoolean['default'] ?
        {backgroundColor: '#7380FF', borderRadius: '0.2vw'} : null

    return (
        <IconButton onMouseDown={ handleRichClick.bind(this) } style={style} >
          {props.icon}
        </IconButton>
    )
  }

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState)
      return 'handled';
    }
    return 'not-handled';
  }

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

  const datePossibilities = {
    'Discussion': null,

    'Event': (
      <DatesWrapper>
        From
        <DatePicker selected={startDate} onChange={changeStartDate} style={{width: '1vw'}} />
        to
        <DatePicker selected={endDate} onChange={changeEndDate} />
      </DatesWrapper>
    ),

    'Job': (
        <DatesWrapper>
          From
          <DatePicker selected={startDate} onChange={changeStartDate} style={{width: '1vw'}} />
          to
          <DatePicker selected={endDate} onChange={changeEndDate} />
        </DatesWrapper>
    ),

    'Notice': (
        <DatesWrapper>
          Until
          <DatePicker
              selected={endDate}
              onChange={changeEndDate}
              style={{ width: 'inherit' }}
          />
        </DatesWrapper>
    ),

    'default': null,
  }

  const locationJobInfo = {
    'Discussion': (
      <LocationJobInfoWrapper />
    ),

    'Event': (
      <LocationJobInfoWrapper>
        Location:
        <TitleBox id={'location'} contentEditable />
      </LocationJobInfoWrapper>
    ),

    'Job': (
      <LocationJobInfoWrapper>
        Location:
        <TitleBox id={'location'} contentEditable />
        Paid
        <Checkbox id='isPaid' onChange={togglePaid} style={{margin: '0px'}} />
        Closed
        <Checkbox id='isClosed' onChange={toggleClosed} style={{margin: '0px'}}/>
      </LocationJobInfoWrapper>
    ),

    'Notice': (
      <LocationJobInfoWrapper />
    ),

    'default': (
        <LocationJobInfoWrapper />
    )
  }

  // switch (postType) {
  //   case 'discussion':
  //     form = (
  //       <Form>
  //         <TitleWrapper>
  //           <TitleDescriptor>Title</TitleDescriptor>
  //           <TitleBox id='title' contentEditable />
  //         </TitleWrapper>
  //         <BodyWrapper>
  //           <TitleDescriptor>Body</TitleDescriptor>
  //           <BodyBox id='body' contentEditable />
  //         </BodyWrapper>
  //           <ExtrasWrapper>
  //               <ImageWrapper>
  //                   <TitleDescriptor>Images</TitleDescriptor>
  //                   <ImageBox id='image'>
  //                       <UploadToPost parentUrlCallback={callbackURL} />
  //                       {/* <p>{url}</p> */}
  //                   </ImageBox>
  //               </ImageWrapper>
  //
  //               <Banner />
  //
  //               <PostingButton
  //                   onClick={e => {
  //                       e.preventDefault()
  //                       const title = document.getElementById('title').innerHTML
  //                       const body = document.getElementById('body').innerHTML
  //                       if (checkTitleAndBody(title, body)) return
  //                       try {
  //                           postCreate({
  //                               variables: {
  //                                   kind: postType,
  //                                   title,
  //                                   body,
  //                                   imageUrl: url === '' ? null : url
  //                               }
  //                           })
  //                           props.switchVisibility(false)
  //                       } catch (error) {
  //                           log.error('error', error)
  //                       }
  //                   }}
  //               >
  //                   Post
  //               </PostingButton>
  //           </ExtrasWrapper>
  //       </Form>
  //     )
  //     break
  //   case 'event':
  //     form = (
  //       <Form>
  //         <TitleWrapper>
  //           <TitleDescriptor>Title</TitleDescriptor>
  //           <TitleBox id='title' contentEditable />
  //         </TitleWrapper>
  //         <BodyWrapper>
  //           <TitleDescriptor>Body</TitleDescriptor>
  //           <BodyBox id='body' contentEditable />
  //         </BodyWrapper>
  //           <ExtrasWrapper>
  //             <ImageWrapper>
  //               <TitleDescriptor>Images</TitleDescriptor>
  //               <ImageBox id='image'>
  //                 <UploadToPost parentUrlCallback={callbackURL} />
  //               </ImageBox>
  //             </ImageWrapper>
  //             Start Date
  //             <DatePicker selected={startDate} onChange={changeStartDate} />
  //             End Date
  //             <DatePicker selected={endDate} onChange={changeEndDate} />
  //             <input
  //                 type='text'
  //                 name='Place of Event'
  //                 placeholder='Event Location'
  //                 onChange={e => setPlace(e.target.value)}
  //             />
  //             <PostingButton
  //               onClick={e => {
  //                 e.preventDefault()
  //                 try {
  //                   const title = document.getElementById('title').innerHTML
  //                   const body = document.getElementById('body').innerHTML
  //                   if (checkTitleAndBody(title, body)) return
  //                   postCreate({
  //                     variables: {
  //                       kind: postType,
  //                       title,
  //                       body,
  //                       start: startDate,
  //                       end: endDate,
  //                       place,
  //                       imageUrl: url === '' ? null : url
  //                     }
  //                   })
  //                   props.switchVisibility(false)
  //                 } catch (error) {
  //                   log.error('error', error)
  //                 }
  //               }}
  //             >
  //               Post
  //             </PostingButton>
  //           </ExtrasWrapper>
  //       </Form>
  //     )
  //     break
  //   case 'job':
  //     form = (
  //       <>
  //         <Form>
  //           <TitleWrapper>
  //             <TitleDescriptor>Title</TitleDescriptor>
  //             <TitleBox id='title' contentEditable />
  //           </TitleWrapper>
  //           <BodyWrapper>
  //             <TitleDescriptor>Body</TitleDescriptor>
  //             <BodyBox id='body' contentEditable />
  //           </BodyWrapper>
  //             <ExtrasWrapper>
  //               <ImageWrapper>
  //                 <TitleDescriptor>Images</TitleDescriptor>
  //                 <ImageBox id='image'>
  //                   <UploadToPost parentUrlCallback={callbackURL} />
  //                 </ImageBox>
  //               </ImageWrapper>
  //               <input
  //                 type='text'
  //                 name='Place of Job'
  //                 placeholder='Event Location'
  //                 onChange={e => setPlace(e.target.value)}
  //               />
  //               Start Date
  //               <DatePicker
  //                 selected={startDate}
  //                 onChange={changeStartDate}
  //                 style={{ width: 'inherit' }}
  //               />
  //               End Date
  //               <DatePicker selected={endDate} onChange={changeEndDate} />
  //               <p>Is the job paid?</p>
  //               {/* Documentation for these: https://material-ui.com/api/checkbox/ */}
  //               <Checkbox id='isPaid' onChange={togglePaid} />
  //               <p>Is the job open?</p>
  //               <Checkbox id='isOpen' onChange={toggleClosed} />
  //               <PostingButton
  //                 onClick={e => {
  //                   e.preventDefault()
  //                   try {
  //                     const title = document.getElementById('title').innerHTML
  //                     const body = document.getElementById('body').innerHTML
  //                     if (checkTitleAndBody(title, body)) return
  //                     postCreate({
  //                       variables: {
  //                         kind: postType,
  //                         title,
  //                         body,
  //                         start: startDate,
  //                         end: endDate,
  //                         place,
  //                         isPaid,
  //                         isClosed,
  //                         imageUrl: url === '' ? null : url
  //                       }
  //                     })
  //                     log.info('Submitted and push!')
  //                     props.switchVisibility(false)
  //                   } catch (error) {
  //                     log.error('error', error)
  //                   }
  //                 }}
  //               >
  //                 Post
  //               </PostingButton>
  //             </ExtrasWrapper>
  //         </Form>
  //       </>
  //     )
  //     break
  //   case 'notice':
  //     form = (
  //       <Form>
  //         <TitleWrapper>
  //           <TitleDescriptor>Title</TitleDescriptor>
  //           <TitleBox id='title' contentEditable />
  //         </TitleWrapper>
  //         <BodyWrapper>
  //           <TitleDescriptor>Body</TitleDescriptor>
  //           <BodyBox id='body' contentEditable />
  //         </BodyWrapper>
  //
  //           <ExtrasWrapper>
  //                 <ImageWrapper>
  //                   <TitleDescriptor>Images</TitleDescriptor>
  //                   <ImageBox id='image'>
  //                     <UploadToPost parentUrlCallback={callbackURL} />
  //                   </ImageBox>
  //                 </ImageWrapper>
  //                 Deadline Date
  //                 <DatePicker
  //                   selected={endDate}
  //                   onChange={changeEndDate}
  //                   style={{ width: 'inherit' }}
  //                 />
  //                 <PostingButton
  //                   onClick={e => {
  //                     e.preventDefault()
  //                     try {
  //                       const title = document.getElementById('title').innerHTML
  //                       const body = document.getElementById('body').innerHTML
  //                       if (checkTitleAndBody(title, body)) return
  //                       postCreate({
  //                         variables: {
  //                           kind: postType,
  //                           title,
  //                           body,
  //                           deadline: endDate,
  //                           imageUrl: url === '' ? null : url
  //                         }
  //                       })
  //                       props.switchVisibility(false)
  //                     } catch (error) {
  //                       log.error('error', error)
  //                     }
  //                   }}
  //                 >
  //                   Post
  //                 </PostingButton>
  //
  //               </ExtrasWrapper>
  //       </Form>
  //     )
  //     break
  //
  //   default:
  //     form = null
  // }

  return (
    <div>
      <Helmet>
        <title>RiceDiscuss &middot; Compose post</title>
      </Helmet>

      <PostWrapper>
        <ModalTitle>
          Add New Post
          {/*{dummyState && convertFromRaw(JSON.parse(dummyState))}*/}
          {/*{dummyState &&*/}
          {/*  <Editor readOnly={true} editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(dummyState)))}*/}
          {/*    customStyleMap={styleMap}*/}
          {/*    textAlignment={textAlignment} />}*/}
        </ModalTitle>

        <ExitButton onClick={closeModal} > X </ExitButton>

        <FormWrapper>
          <SelectCategoryWrapper>
            Select Category:
            <ButtonWrapper>
              <Button id='Notice' onClick={changePostType}
                      style={ postType === 'Notice' ?
                          { borderTopLeftRadius: '1.4vh', borderBottomLeftRadius: '1.4vh', fontWeight: 'bold' } :
                          { borderTopLeftRadius: '1.4vh', borderBottomLeftRadius: '1.4vh' }}>
                NOTICE
              </Button>
              <Button id='Event' onClick={changePostType}
                      style={ postType === 'Event' ? { fontWeight: 'bold' } : null }>
                EVENT
              </Button>
              <Button id='Job' onClick={changePostType}
                      style={ postType === 'Job' ? { fontWeight: 'bold' } : null }>
                JOB
              </Button>
              <Button id='Discussion' onClick={changePostType}
                      style={ postType === 'Discussion' ?
                          { borderTopRightRadius: '1.4vh', borderBottomRightRadius: '1.4vh', fontWeight: 'bold' } :
                          { borderTopRightRadius: '1.4vh', borderBottomRightRadius: '1.4vh' }}>
                DISCUSSION
              </Button>
            </ButtonWrapper>
          </SelectCategoryWrapper>

          <Form>
            <TitleWrapper>
              Title:
              <TitleBox id={'title'} contentEditable />
              { datePossibilities[postType] || datePossibilities['default'] }
            </TitleWrapper>
            <BodyWrapper>
              <RichIcons>
                <RichButton icon={<FormatBoldIcon />} type={'style'} op={'BOLD'} />
                <RichButton icon={<FormatItalicIcon />} type={'style'} op={'ITALIC'} />
                <RichButton icon={<FormatUnderlinedIcon />} type={'style'} op={'UNDERLINE'} />
                <RichButton icon={<StrikethroughSIcon />} type={'style'} op={'STRIKETHROUGH'} />
                <RichButton icon={<FormatListBulletedIcon />} type={'list'} op={'unordered-list-item'} />
                <RichButton icon={<FormatListNumberedIcon />} type={'list'} op={'ordered-list-item'} />
                <RichButton icon={<FormatAlignLeftIcon />} type={'align'} op={'left'} />
                <RichButton icon={<FormatAlignCenterIcon />} type={'align'} op={'center'} />
                <RichButton icon={<FormatAlignRightIcon />} type={'align'} op={'right'} />
                {/*<RichButton icon={<FormatAlignJustifyIcon />} type={'align'} op={'justify'} />*/}
                <RichButton icon={<InsertLinkIcon />} type={'insert'} op={'LINK'} />
                <RichButton icon={<VideoLibraryIcon />} type={'insert'} op={'VIDEO'} />
                <RichButton icon={<ImageIcon />} type={'insert'} op={'IMAGE'} />
              </RichIcons>
              <RichEditorWrapper id={'body'}>
                <Editor placeholder={'Enter description...'} editorState={editorState}
                        onChange={ editorState => { setEditorState(editorState) }}
                        handleKeyCommand={ handleKeyCommand }
                        ref={editorRef} customStyleMap={styleMap}
                        textAlignment={textAlignment} />
              </RichEditorWrapper>
            </BodyWrapper>
            <TagWrapper>
              Add Tag
              <TagBox id={'tags'} contentEditable
                      placeholder={'Ex. Internship, Externship, ...'} />
            </TagWrapper>
            <SuggestedTagsWrapper>
              Suggested:
              <Tag style={{backgroundColor: '#EAEAFA', color: '#6D71F9'}}>Rice</Tag>
              <Tag style={{backgroundColor: '#E8F6FF', color: '#54C1FB'}}>CS</Tag>
              <Tag style={{backgroundColor: '#FEEFEF', color: '#FF7070'}}>Engineering</Tag>
              <Tag style={{backgroundColor: '#EAEAFA', color: '#6D71F9'}}>STEM</Tag>
              <Tag style={{backgroundColor: '#E8F6FF', color: '#54C1FB'}}>Career Fair</Tag>
            </SuggestedTagsWrapper>

            <LocationJobInfoWrapper>
              {locationJobInfo[postType] || locationJobInfo['default']}
            </LocationJobInfoWrapper>

            <DraftSubmitWrapper>
              <SaveAsDraft onClick={null} >
                Save As Draft
              </SaveAsDraft>
              <PostingButton
                onClick={e => {
                    e.preventDefault()

                    // console.log('hello!?!??!!!')
                    const title = document.getElementById('title').innerHTML
                  // console.log('anyone home????')
                    // const body = document.getElementById('body').innerHTML
                    const body = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
                  // console.log('here at least')
                  console.log(title)
                    if (checkTitleAndBody(title, body)) return
                    // console.log('hello!?!??!!!')
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
                      console.log('this was never the way i planned')
                    }
                }}
              >
                Submit
              </PostingButton>

            </DraftSubmitWrapper>

          </Form>
        </FormWrapper>
      </PostWrapper>
    </div>
  )
}

export default WritePost
