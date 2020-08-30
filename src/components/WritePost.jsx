import React, { useState, useRef } from 'react'
import DatePicker from 'react-datepicker'

import { useMutation } from '@apollo/client'

import { Checkbox } from '@material-ui/core'

import { Editor, EditorState, RichUtils, Modifier, CompositeDecorator } from 'draft-js'
import { stateToMarkdown } from 'draft-js-export-markdown'

import 'draft-js/dist/Draft.css'

import FormatBoldIcon from '@material-ui/icons/FormatBold'
import FormatItalicIcon from '@material-ui/icons/FormatItalic'
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined'
import StrikethroughSIcon from '@material-ui/icons/StrikethroughS'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted'
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered'
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft'
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter'
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight'
// import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import InsertLinkIcon from '@material-ui/icons/InsertLink'
// import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import ImageIcon from '@material-ui/icons/Image'

import { Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import log from 'loglevel'
import { POST_CREATE } from '../graphql/Mutations'
// import UploadToPost from './UploadToPost'
import {
  PostWrapper,
  Button,
  ButtonWrapper,
  Form,
  TitleWrapper,
  TitleBox,
  BodyWrapper,
  PostingButton,
  ExitButton,
  ModalTitle,
  FormWrapper,
  DatesWrapper,
  TagWrapper,
  SelectCategoryWrapper,
  LocationJobInfoWrapper,
  DraftSubmitWrapper,
  RichIcons,
  IconButton,
  RichEditorWrapper,
  SuggestedTagsWrapper,
  TagBox,
  Tag,
  SaveAsDraft,
  DateBox,
  LocationBox,
  TagChosenWrapper,
  TagChosen,
  TagCircle, StyledLink
} from './WritePost.styles'
import { currentUser } from '../utils/apollo'
import UploadToPost from './UploadToPost'
import LinkAdder from "./LinkAdder";

const styleMap = {
  STRIKETHROUGH: {
    textDecoration: 'line-through'
  }
}

const numToDateString = num => {
  const newDate = new Date(num)
  const fullString = newDate.toUTCString()
  return (
    fullString.slice(8, 11) +
    '. ' +
    fullString.slice(5, 7) +
    ', ' +
    fullString.slice(12, 16)
  )
}

function WritePost (props) {
  const userInfo = currentUser()

  const [tags, setTags] = useState([])

  const [postCreate] = useMutation(POST_CREATE)

  const [url, setUrl] = useState('')

  const callbackURL = childData => {
    setUrl(childData)
  }

  const linkAdderCallback = link => {

    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', {
      url: link,
    });
    console.log('here')
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const contentStateWithLink = Modifier.applyEntity(
        contentStateWithEntity,
        editorState.getSelection(),
        entityKey,
    );
    const newEditorState = EditorState.push(editorState,
      contentStateWithLink, 'apply-entity')

    setEditorState(newEditorState)

    // const newEditorState = EditorState.set(editorState, {
    //   currentContent: contentStateWithEntity
    // })
    // setEditorState(RichUtils.toggleLink(
    //     newEditorState,
    //     newEditorState.getSelection(),
    //     entityKey
    // ))
    // console.log('here4')
    // // EditorState.push(editorState, contentStateWithLink, 'apply-entity');
  }

  const [startDate, setStart] = useState(new Date().getTime())
  const [endDate, setEnd] = useState(new Date().getTime())
  const [place, setPlace] = useState('')
  const [isPaid, setPaid] = useState(false)
  const [isClosed, setClosed] = useState(false)
  const [postType, setPostType] = useState('Discussion')

  const editorRef = useRef(null)

  const Link = props => {
    console.log(props.entityKey)
    const [tooltipVisible, setTooltipVisible] = useState(false)
    const address = editorState.getCurrentContent().getEntity(props.entityKey).getData().url;
    console.log(address)
    return (
        <StyledLink href={address} onMouseOver={setTooltipVisible.bind(this,true)}
                    onMouseOut={setTooltipVisible.bind(this, false)} >
          <div style={tooltipVisible ? {display: 'inline', backgroundColor: '#f4efef',
            position: 'absolute'} : {display: 'none'}}
          >
            {address}
          </div>
          {props.children}
        </StyledLink>
    );
  };

  function findLinkEntities(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(
        (character) => {
          const entityKey = character.getEntity();
          return (
              entityKey !== null &&
              contentState.getEntity(entityKey).getType() === 'LINK'
          );
        },
        callback
    );
  }

  const decorator = new CompositeDecorator([
    {
      strategy: findLinkEntities,
      component: Link,
    },
  ]);

  const [editorState, setEditorState] = useState(
    EditorState.createEmpty(decorator)
  )
  const [textAlignment, setTextAlignment] = useState('left')
  const [imgUploaderVisible, setImgUploaderVisible] = useState(false)
  const [linkAdderVisible, setLinkAdderVisible] = useState(false)

  // console.log(tags)

  // console.log(editorState.getCurrentContent().getEntityMap())

  if (!props.show) {
    return null
  }

  if (userInfo === {}) {
    return <Navigate to='/login' />
  }

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
          return 'handled'
        }
        return 'not-handled'
      } else if (props.type === 'list') {
        const newState = RichUtils.toggleBlockType(editorState, props.op)
        if (newState) {
          setEditorState(newState)
          return 'handled'
        }
        return 'not-handled'
      } else if (props.op === 'IMAGE') {
        if (url === '') {
          setImgUploaderVisible(!imgUploaderVisible)
        }
      } else if (props.op === 'LINK') {
        setLinkAdderVisible(!linkAdderVisible)
      }
    }

    const backgroundBoolean = {
      align: textAlignment === props.op,
      style: editorState.getCurrentInlineStyle().has(props.op),
      list: RichUtils.getCurrentBlockType(editorState) === props.op,
      image: url !== '',
      default: false
    }

    const style =
      backgroundBoolean[props.type] || backgroundBoolean.default
        ? { backgroundColor: '#7380FF', borderRadius: '0.2vw' }
        : null

    return (
      <IconButton onMouseDown={handleRichClick.bind(this)} style={style}>
        {props.icon}
      </IconButton>
    )
  }

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      setEditorState(newState)
      return 'handled'
    }
    return 'not-handled'
  }

  const changeStartDate = date => setStart(date.getTime())
  const changeEndDate = date => setEnd(date.getTime())
  const changePostType = e => setPostType(e.target.id)
  const changeLocation = () => {
    const location = document.getElementById('location').value.trim()
    // console.log(location)
    setPlace(location)
  }

  const closeModal = () => {
    props.switchVisibility(false)
  }

  const checkTitleBodyAndTag = (title, body, tagInput) =>
    title.length <= 0 || body.length <= 0 || tagInput.length > 0

  const checkExtras = {
    Discussion: () => {
      return false
    },
    Event: () => {
      if (!startDate || !endDate || place === '') {
        return true
      }
    },
    Job: () => {
      if (!startDate || !endDate || place === '') {
        // console.log(startDate)
        // console.log(endDate)
        // console.log(place)
        return true
      }
    },
    Notice: () => {
      if (!endDate) {
        return true
      }
    }
  }

  const togglePaid = () => setPaid(!isPaid)

  const toggleClosed = () => setClosed(!isClosed)

  function addTag (e) {
    // console.log('tag')
    // console.log(e.keyCode)
    e.preventDefault()
    // adds new todo to beginning of todos array
    if (e.keyCode === 13) {
      // console.log('tag', e.target.value)
      const text = document.getElementById('tag').value.trim()
      if (!tags.includes(text)) {
        setTags([...tags, text])
      }
      document.getElementById('tag').value = ''
    }
  }

  function removeTag (old) {
    setTags(tags.filter(tag => tag !== old))
  }

  const datePossibilities = {
    Discussion: <DatesWrapper />,

    Event: (
      <DatesWrapper>
        From
        <DatePicker
          selected={startDate}
          onChange={changeStartDate}
          customInput={<DateBox> {numToDateString(startDate)} </DateBox>}
        />
        to
        <DatePicker
          selected={endDate}
          onChange={changeEndDate}
          customInput={<DateBox> {numToDateString(endDate)} </DateBox>}
        />
      </DatesWrapper>
    ),

    Job: (
      <DatesWrapper>
        From
        <DatePicker
          selected={startDate}
          onChange={changeStartDate}
          customInput={<DateBox> {numToDateString(startDate)} </DateBox>}
        />
        to
        <DatePicker
          selected={endDate}
          onChange={changeEndDate}
          customInput={<DateBox> {numToDateString(endDate)} </DateBox>}
        />
      </DatesWrapper>
    ),

    Notice: (
      <DatesWrapper>
        Until
        <DatePicker
          selected={endDate}
          onChange={changeEndDate}
          customInput={<DateBox> {numToDateString(endDate)} </DateBox>}
        />
      </DatesWrapper>
    ),

    default: <div>Something went wrong! Please report to riceapps.</div>
  }

  const locationJobInfo = {
    Discussion: <LocationJobInfoWrapper />,

    Event: (
      <LocationJobInfoWrapper>
        Location:
        <LocationBox id='location' contentEditable onChange={changeLocation} />
      </LocationJobInfoWrapper>
    ),

    Job: (
      <LocationJobInfoWrapper>
        Location:
        <LocationBox id='location' contentEditable onKeyUp={changeLocation} />
        Paid
        <Checkbox id='isPaid' onChange={togglePaid} color='dummy-color' />
        Closed
        <Checkbox id='isClosed' onChange={toggleClosed} color='dummy-color' />
      </LocationJobInfoWrapper>
    ),

    Notice: <LocationJobInfoWrapper />,

    default: <div>Something went wrong! Please report to riceapps.</div>
  }

  const handleSubmit = e => {
    e.preventDefault()

    const title = document.getElementById('title').innerHTML
    const body = stateToMarkdown(editorState.getCurrentContent())
    const tagInput = document.getElementById('tag').value.trim()
    console.log('here1')
    if (checkTitleBodyAndTag(title, body, tagInput)) return
    console.log('here2')
    if (checkExtras[postType]()) return
    console.log('here3')

    const postToCreate = {
      Discussion: {
        variables: {
          kind: postType,
          title,
          body,
          text_align: textAlignment,
          creator: userInfo.netID,
          imageUrl: url === '' ? null : url,
          tags: tags
        }
      },
      Event: {
        variables: {
          kind: postType,
          title,
          body,
          text_align: textAlignment,
          creator: userInfo.netID,
          start: startDate,
          end: endDate,
          place,
          imageUrl: url === '' ? null : url,
          tags: tags
        }
      },
      Job: {
        variables: {
          kind: postType,
          title,
          body,
          text_align: textAlignment,
          creator: userInfo.netID,
          start: startDate,
          end: endDate,
          place,
          isPaid,
          isClosed,
          imageUrl: url === '' ? null : url,
          tags: tags
        }
      },
      Notice: {
        variables: {
          kind: postType,
          title,
          body,
          text_align: textAlignment,
          creator: userInfo.netID,
          deadline: endDate,
          imageUrl: url === '' ? null : url,
          tags: tags
        }
      }
    }

    try {
      postCreate(postToCreate[postType])
      // console.log('made it here')
      setTags([])
      props.switchVisibility(false)
    } catch (error) {
      log.error('error', error)
    }
  }

  return (
    <div>
      <Helmet>
        <title>RiceDiscuss &middot; Compose post</title>
      </Helmet>

      <PostWrapper>
        <ModalTitle>Add New Post</ModalTitle>

        <ExitButton onClick={closeModal}> X </ExitButton>

        <FormWrapper>
          <SelectCategoryWrapper>
            Select Category:
            <ButtonWrapper>
              <Button
                id='Notice'
                onClick={changePostType}
                style={
                  postType === 'Notice'
                    ? {
                        borderTopLeftRadius: '1.4vh',
                        borderBottomLeftRadius: '1.4vh',
                        fontWeight: 'bold'
                      }
                    : {
                        borderTopLeftRadius: '1.4vh',
                        borderBottomLeftRadius: '1.4vh'
                      }
                }
              >
                NOTICE
              </Button>
              <Button
                id='Event'
                onClick={changePostType}
                style={postType === 'Event' ? { fontWeight: 'bold' } : null}
              >
                EVENT
              </Button>
              <Button
                id='Job'
                onClick={changePostType}
                style={postType === 'Job' ? { fontWeight: 'bold' } : null}
              >
                JOB
              </Button>
              <Button
                id='Discussion'
                onClick={changePostType}
                style={
                  postType === 'Discussion'
                    ? {
                        borderTopRightRadius: '1.4vh',
                        borderBottomRightRadius: '1.4vh',
                        fontWeight: 'bold'
                      }
                    : {
                        borderTopRightRadius: '1.4vh',
                        borderBottomRightRadius: '1.4vh'
                      }
                }
              >
                DISCUSSION
              </Button>
            </ButtonWrapper>
          </SelectCategoryWrapper>

          <Form>
            <TitleWrapper>
              Title:
              <TitleBox id='title' contentEditable />
              {datePossibilities[postType] || datePossibilities.default}
            </TitleWrapper>
            <BodyWrapper>
              <RichIcons>
                <RichButton icon={<FormatBoldIcon />} type='style' op='BOLD' />
                <RichButton
                  icon={<FormatItalicIcon />}
                  type='style'
                  op='ITALIC'
                />
                <RichButton
                  icon={<FormatUnderlinedIcon />}
                  type='style'
                  op='UNDERLINE'
                />
                <RichButton
                  icon={<StrikethroughSIcon />}
                  type='style'
                  op='STRIKETHROUGH'
                />
                <RichButton
                  icon={<FormatListBulletedIcon />}
                  type='list'
                  op='unordered-list-item'
                />
                <RichButton
                  icon={<FormatListNumberedIcon />}
                  type='list'
                  op='ordered-list-item'
                />
                <RichButton
                  icon={<FormatAlignLeftIcon />}
                  type='align'
                  op='left'
                />
                <RichButton
                  icon={<FormatAlignCenterIcon />}
                  type='align'
                  op='center'
                />
                <RichButton
                  icon={<FormatAlignRightIcon />}
                  type='align'
                  op='right'
                />
                <RichButton icon={<InsertLinkIcon />} type='link' op='LINK' />
                {/* <RichButton icon={<VideoLibraryIcon />} type='video' op='VIDEO' /> */}
                <RichButton icon={<ImageIcon />} type='image' op='IMAGE' />
              </RichIcons>
              <UploadToPost
                parentUrlCallback={callbackURL}
                show={imgUploaderVisible}
                dismissSelf={() => {
                  setImgUploaderVisible(false)
                }}
              />
              <LinkAdder
                callback={linkAdderCallback}
                show={linkAdderVisible}
                dismissSelf={() => {
                  setLinkAdderVisible(false)
                }}
              />
              <RichEditorWrapper>
                <Editor
                  placeholder='Enter description...'
                  editorState={editorState}
                  onChange={editorState => {
                    setEditorState(editorState)
                  }}
                  handleKeyCommand={handleKeyCommand}
                  ref={editorRef}
                  customStyleMap={styleMap}
                  textAlignment={textAlignment}
                />
              </RichEditorWrapper>
            </BodyWrapper>
            <TagWrapper>
              <t style={{ position: 'relative', bottom: '1vh', left: '1.8vw' }}>
                Add Tag (press enter after each tag)
              </t>
              <TagBox
                id='tag'
                contentEditable
                onKeyUp={addTag}
                placeholder='Ex. Internship, Externship, ...'
              />
              <TagChosenWrapper>
                Your tags:
                {tags.map(tag => (
                  <TagChosen key={tag} onClick={() => removeTag(tag)}>
                    <TagCircle />
                    {tag}
                  </TagChosen>
                ))}
              </TagChosenWrapper>
            </TagWrapper>
            <SuggestedTagsWrapper>
              Suggested:
              <Tag style={{ backgroundColor: '#EAEAFA', color: '#6D71F9' }}>
                Rice
              </Tag>
              <Tag style={{ backgroundColor: '#E8F6FF', color: '#54C1FB' }}>
                CS
              </Tag>
              <Tag style={{ backgroundColor: '#FEEFEF', color: '#FF7070' }}>
                Engineering
              </Tag>
              <Tag style={{ backgroundColor: '#EAEAFA', color: '#6D71F9' }}>
                STEM
              </Tag>
              <Tag style={{ backgroundColor: '#E8F6FF', color: '#54C1FB' }}>
                Career Fair
              </Tag>
            </SuggestedTagsWrapper>

            {locationJobInfo[postType] || locationJobInfo.default}

            <DraftSubmitWrapper>
              <SaveAsDraft onClick={null}>Save As Draft</SaveAsDraft>
              <PostingButton onClick={handleSubmit}>Submit</PostingButton>
            </DraftSubmitWrapper>
          </Form>
        </FormWrapper>
      </PostWrapper>
    </div>
  )
}

export default WritePost
