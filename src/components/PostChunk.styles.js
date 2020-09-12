import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'

// note: PostFull.styles.js is based on this file
// so please make relevant design updates to both places

// Contains Discussion Box
const DiscussionBoxSection = styled.section`
  padding: 20px 70px;
  min-width: 55vw;
  max-width: 65vw;
`
// contains LeftComponent, TopMiddleComponent, BottomComponent

const DiscussionBox = styled.section`
  padding: 5px;
  background: #ffffff;
  border-radius: 20px;
  display: grid;
  grid-template-rows: 4vh 1fr auto;
  grid-template-columns: 5vw 1fr;
  grid-template-areas:
    'owo top'
    'left topmiddle'
    'left comments';
`

// contains OriginalPoster, Tags, DividerTop

const TopComponent = styled.div`
  grid-area: top;
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: 3vh 1vh;
  grid-template-areas:
    'op tags'
    'line line';
  margin-top: 1vh;
`
const OriginalPoster = styled.div`
  display: grid;
  grid-area: op;
  white-space: nowrap;
`

// contains Tag, ViewTags

const Tags = styled.div`
  grid-area: tags;
  word-wrap: break-word;
  text-align: right;
  margin-right: 4vw;
`

const Tag = styled.text`
  font-family: 'Avenir';
  font-size: 1.75vh;
  font-weight: bold;
  color: white;
  background-color: gray;
  border: none;
  border-radius: 5px;
  margin-right: 7px;
  padding: 2px 5px;
`

const ViewTags = styled.button`
  border: none;
  background-color: inherit;
`

const DividerTop = styled.div`
  grid-area: line;
`

// contains Upvote, Downvote, Likes

const LeftComponent = styled.div`
  display: grid;
  grid-template-rows: 20px 30px 40px 30px 1fr;
  grid-area: left;
  justify-items: center;
  align-items: center;
`

const Upvote = styled.div`
  grid-row: 2/3;
`

const Likes = styled.div`
  grid-row: 3/4;
`

const Downvote = styled.div`
  grid-row: 4/5;
`

// contains DiscussionTitle, MoreOptions, DiscussionBody

const TopMiddleComponent = styled.div`
  position: relative;
  grid-area: topmiddle;
  display: grid;
  grid-template-areas:
    'title kind moreoptions'
    'body body moreoptions'
    'image image moreoptions';
  grid-template-columns: auto 1fr 5vw;
  grid-template-rows: auto auto auto;
`

const DiscussionTitle = styled.text`
  grid-area: title;
  padding: 3vh 0.1vw 0px 0px;
  font-family: 'Avenir';
  font-size: 2.3vh;
  font-weight: bold;
  min-height: 4vh;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  align-self: start;
`

const FullPostLink = styled(Link)`
  color: black;
  text-decoration: none;
`

const KindDiv = styled.div`
  grid-area: kind;
  padding: 2vh 0px 0px 0px;
  align-self: center;
`

const Kind = styled.text`
  font: normal normal 900 15px/20px Avenir;
  color: #7380ff;
  border: 1px solid #7380ff;
  border-radius: 5px;
  opacity: 1;
  font-size: 2vh;
  margin-left: 10px;
  padding: 2px 5px;
  align-self: start;
`

const MoreOptions = styled.div`
  position: relative;
  grid-area: moreoptions;
  align-self: start;
  justify-self: center;
  margin-top: -4.5vh;
`

const DDMenu = styled.div`
  position: relative;
  align-self: start;
  justify-self: center;
  background-color: white;
  display: grid;
  bottom: 25px;
  width: 150%;
`

const Save = styled.button`
  padding: 5px;
`

const Expand = styled.button`
  padding: 5px;
`

const AddTo = styled.button`
  padding: 5px;
`

const Report = styled.button`
  padding: 5px;
`

const Delete = styled.button`
  padding: 5px;
`

const DiscussionBody = styled.text`
  grid-area: body;
  padding: 1vh 0px;
  font-size: 2vh;
  max-height: 10vh;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const ReadMore = styled.text`
  font: normal normal normal 1.75vh Avenir;
  letter-spacing: 0px;
  color: #9293A3;
  text-align: right;
  text-decoration: underline;
`

const ImageDiv = styled.div`
  grid-area: image
`

// contains DividerBottom, ShowCommentsDiv, NewCommentDiv, PostCommentDiv, CommentsDiv

const CommentComponent = styled.div`
  grid-area: comments;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1vh 6vh auto auto auto;
  grid-template-areas:
    'dividerbottom'
    'showcomments'
    'commentinput'
    'commentbutton'
    'commentsdiv';
`
const DividerBottom = styled.div`
  grid-area: dividerbottom;
`
const ShowCommentsDiv = styled.div`
  grid-area: showcomments;
  padding: 1vh 0px;
`

/*
const CommentInput = styled.input`
  grid-area: commentinput;
  border: solid;
  width: 70%;
  height: auto;
  background: #f4f4f49a 0% 0% no-repeat padding-box;
  border-radius: 5px;
  opacity: 1;
  text-align: left;
  vertical-align: middle;
  align-self: start;
  font: Roman 21px/24px Avenir;
  letter-spacing: 0px;
  color: #a9abb4;
`
*/

const CommentInput = styled.input`
  grid-area: commentinput;
  background: #F8F8F8 0% 0% no-repeat padding-box;
  border: none;
  border-radius: 20px;

  width: 40vw;
  height: auto;
  min-height: 5vh;

  overflow-y: auto;

  padding-left: 0.5vw;
  padding-top: 0.5vh;
  margin-left: 1vw;

  text-align: left;
  font: normal normal medium 16px/22px Avenir;
  letter-spacing: 0px;
  opacity: 1;
`


// based off posting button in WritePost styles
const CommentButton = styled.button`
  grid-area: commentbutton;
  position: relative;
  padding: 0.5vh 1vw;
  text-align: center;
  display: inline-block;
  cursor: pointer;
  margin: 1vh 0px 0px 2vw;
  &:hover {
    background-color: #e7c6c6;
    opacity: 100%;
  }
  width: 10vw;
  height: 4vh;
  background: #7380FF 0% 0% no-repeat padding-box;
  border-radius: 20px;
  opacity: 1;
  font: Medium 20px/17px Avenir;
  letter-spacing: 0px;
  color: #747886;
  border: none
`
const CommentButtonText = styled.text`
  font: normal normal 700 15px/20px Avenir;
  letter-spacing: 0px;
  color: #FFFFFF;
  opacity: 1;
`

const CommentsDiv = styled.div`
  grid-area: commentsdiv;
`

const Commentul = styled.ul`
  list-style-type: none;
`

const Commentli = styled.li`
  list-style-type: none;
`

export {
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
  ImageDiv,
  CommentComponent,
  DividerBottom,
  ShowCommentsDiv,
  CommentInput,
  CommentButton,
  CommentButtonText,
  CommentsDiv,
  Commentul,
  Commentli
}
