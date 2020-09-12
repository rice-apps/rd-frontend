import React, { useState, useRef } from 'react'
import DatePicker from 'react-datepicker'

import { useMutation } from '@apollo/client'

import {
  Editor,
  EditorState,
  RichUtils,
  Modifier,
  CompositeDecorator,
  convertToRaw
} from 'draft-js'
import { draftToMarkdown } from 'markdown-draft-js'

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
import InsertLinkIcon from '@material-ui/icons/InsertLink'
import ImageIcon from '@material-ui/icons/Image'
import CloseIcon from '@material-ui/icons/Close'

import { Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import log from 'loglevel'
import { POST_CREATE } from '../graphql/Mutations'
// import UploadToPost from './UploadToPost'
import {
  PostWrapper,
  Button,
  ButtonWrapper,
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
  TagsListWrapper,
  TagBox,
  Tag,
  DateBox,
  LocationBox,
  StyledLink,
  StereoButton,
  StereoButtonCheck
} from './WritePost.styles'
import { currentUser } from '../utils/apollo'
import UploadToPost from './UploadToPost'
import LinkAdder from './LinkAdder'
import { tagColors } from './tagColors'

const styleMap = {
  STRIKETHROUGH: {
    textDecoration: 'line-through'
  }
}

const richIconStyle = {
  width: '3.5vh',
  height: '3.5vh'
}

const suggestedTags = ['Rice', 'CS', 'Engineering', 'STEM', 'Career Fair']

const numToDateString = num => {
  const newDate = new Date(num)
  newDate.setTime(newDate.getTime() - newDate.getTimezoneOffset() * 60 * 1000)
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
    const contentState = editorState.getCurrentContent()
    const absoluteLink =
      link.slice(0, 7) === 'http://' || link.slice(0, 8) === 'https://'
        ? link
        : 'http://' + link
    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      'MUTABLE',
      {
        url: absoluteLink
      }
    )
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const contentStateWithLink = Modifier.applyEntity(
      contentStateWithEntity,
      editorState.getSelection(),
      entityKey
    )
    const newEditorState = EditorState.push(
      editorState,
      contentStateWithLink,
      'apply-entity'
    )

    setEditorState(newEditorState)
  }

  const [title, setTitle] = useState('')
  const [tag, setTag] = useState('')
  const [startDate, setStart] = useState(new Date().getTime())
  const [endDate, setEnd] = useState(new Date().getTime())
  const [place, setPlace] = useState('')
  const [isPaid, setPaid] = useState(false)
  const [isClosed, setClosed] = useState(false)
  const [postType, setPostType] = useState('Discussion')

  const editorRef = useRef(null)

  const Link = props => {
    const [tooltipVisible, setTooltipVisible] = useState(false)
    const address = editorState
      .getCurrentContent()
      .getEntity(props.entityKey)
      .getData().url
    return (
      <StyledLink
        href={address}
        onMouseOver={setTooltipVisible.bind(this, true)}
        onMouseOut={setTooltipVisible.bind(this, false)}
      >
        <div
          style={
            tooltipVisible
              ? {
                  display: 'inline',
                  backgroundColor: '#f4efef',
                  position: 'absolute'
                }
              : { display: 'none' }
          }
        >
          {address}
        </div>
        {props.children}
      </StyledLink>
    )
  }

  function findLinkEntities (contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(character => {
      const entityKey = character.getEntity()
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      )
    }, callback)
  }

  const decorator = new CompositeDecorator([
    {
      strategy: findLinkEntities,
      component: Link
    }
  ])

  const [editorState, setEditorState] = useState(
    EditorState.createEmpty(decorator)
  )
  const [textAlignment, setTextAlignment] = useState('left')
  const [imgUploaderVisible, setImgUploaderVisible] = useState(false)
  const [linkAdderVisible, setLinkAdderVisible] = useState(false)

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
    e.preventDefault()
    // adds new tags to end of tags array
    if (e.keyCode === 13) {
      if (!tags.includes(tag)) {
        setTags([...tags, tag])
      }
      setTag('')
      e.target.value = ''
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
        <LocationBox id='location' onChange={changeLocation} />
      </LocationJobInfoWrapper>
    ),

    Job: (
      <LocationJobInfoWrapper>
        Location:
        <LocationBox id='location' onKeyUp={changeLocation} />
        Paid
        <StereoButton onClick={togglePaid}>
          {isPaid ? <StereoButtonCheck /> : null}
        </StereoButton>
        Closed
        <StereoButton onClick={toggleClosed}>
          {isClosed ? <StereoButtonCheck /> : null}
        </StereoButton>
      </LocationJobInfoWrapper>
    ),

    Notice: <LocationJobInfoWrapper />,

    default: <div>Something went wrong! Please report to riceapps.</div>
  }

  const handleSubmit = e => {
    e.preventDefault()

    const body = draftToMarkdown(convertToRaw(editorState.getCurrentContent()))

    if (checkTitleBodyAndTag(title, body, tag)) return
    if (checkExtras[postType]()) return

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
      setEditorState(EditorState.createEmpty(decorator))
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
        <ModalTitle>
          <t style={{ position: 'relative', top: '3vh', left: '7vh' }}>
            Add New Post
          </t>
          <ExitButton onClick={closeModal}>
            <CloseIcon style={{ width: '5vh', height: '5vh' }} />
          </ExitButton>
        </ModalTitle>

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

          <TitleWrapper>
            Title:
            <TitleBox onChange={e => setTitle(e.target.value.trim())} />
            {datePossibilities[postType] || datePossibilities.default}
            {locationJobInfo[postType] || locationJobInfo.default} 
          </TitleWrapper>
          <BodyWrapper>
            <RichIcons>
              <RichButton
                icon={<FormatBoldIcon style={richIconStyle} />}
                type='style'
                op='BOLD'
              />
              <RichButton
                icon={<FormatItalicIcon style={richIconStyle} />}
                type='style'
                op='ITALIC'
              />
              <RichButton
                icon={<FormatUnderlinedIcon style={richIconStyle} />}
                type='style'
                op='UNDERLINE'
              />
              <RichButton
                icon={<StrikethroughSIcon style={richIconStyle} />}
                type='style'
                op='STRIKETHROUGH'
              />
              <RichButton
                icon={<FormatListBulletedIcon style={richIconStyle} />}
                type='list'
                op='unordered-list-item'
              />
              <RichButton
                icon={<FormatListNumberedIcon style={richIconStyle} />}
                type='list'
                op='ordered-list-item'
              />
              <RichButton
                icon={<FormatAlignLeftIcon style={richIconStyle} />}
                type='align'
                op='left'
              />
              <RichButton
                icon={<FormatAlignCenterIcon style={richIconStyle} />}
                type='align'
                op='center'
              />
              <RichButton
                icon={<FormatAlignRightIcon style={richIconStyle} />}
                type='align'
                op='right'
              />
              <RichButton
                icon={<InsertLinkIcon style={richIconStyle} />}
                type='link'
                op='LINK'
              />
              {/* <RichButton icon={<VideoLibraryIcon />} type='video' op='VIDEO' /> */}
              <RichButton
                icon={<ImageIcon style={richIconStyle} />}
                type='image'
                op='IMAGE'
              />
            </RichIcons>
            <UploadToPost
              parentUrlCallback={callbackURL}
              show={imgUploaderVisible}
              handleDismissSelf={() => {
                setImgUploaderVisible(false)
              }}
            />
            <LinkAdder
              callback={linkAdderCallback}
              show={linkAdderVisible}
              handleDismissSelf={() => {
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
            <t style={{ paddingLeft: '3.3vh' }}>Add Tags</t>
            <TagBox
              onChange={e => setTag(e.target.value.trim())}
              onKeyUp={addTag}
              placeholder='Ex. Internship, Externship, ...'
            />
          </TagWrapper>
          {tags.length === 0 ? (
            <TagsListWrapper>
              Suggested:
              {suggestedTags.map((tag, index) => (
                <Tag
                  key={tag}
                  onClick={() => setTags([tag])}
                  style={tagColors[index % tagColors.length]}
                >
                  {tag}
                </Tag>
              ))}
            </TagsListWrapper>
          ) : (
            <TagsListWrapper>
              Your tags:
              {tags.map((tag, index) => (
                <Tag
                  key={tag}
                  onClick={() => removeTag(tag)}
                  style={tagColors[index % 3]}
                >
                  {tag}
                </Tag>
              ))}
            </TagsListWrapper>
          )}

          {/* {locationJobInfo[postType] || locationJobInfo.default} */}

          <DraftSubmitWrapper>
            {/*<SaveAsDraft onClick={null}>Save As Draft</SaveAsDraft>*/}
            <PostingButton onClick={handleSubmit}>Submit</PostingButton>
          </DraftSubmitWrapper>
        </FormWrapper>
      </PostWrapper>
    </div>
  )
}

export default WritePost
