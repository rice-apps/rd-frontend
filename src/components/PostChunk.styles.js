import styled from 'styled-components'
import { Link } from 'react-router-dom'

// note: PostFull.styles.js is based on this file
// so please make relevant design updates to both places

const DiscussionBoxSection = styled.section`
  // contains DiscussionBox
  padding: 20px 70px;
  min-width: 55vw;
  max-width: 65vw;
`

const DiscussionBox = styled.section`
  // contains TopComponent, LeftComponent, TopMiddleComponent, BottomComponent, CommentComponent
  padding: 5px;
  background: #ffffff;
  border-radius: 20px;
  display: grid;
  grid-template-rows: 4vh 1fr 50px auto;
  grid-template-columns: 65px 1fr;
  grid-template-areas:
    'owo top'
    'left topmiddle'
    'left bottom'
    'left comments';
`
const TopComponent = styled.div`
  // contains OriginalPoster, Tags, DividerTop
  grid-area: top;
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto 1vh;
  grid-template-areas: 'op tags'
                       'line line';
  margin-top: 1vh;
`

const OriginalPoster = styled.div`
  min-height: 3vh;
  grid-area: op;
  white-space: nowrap;
`

const Tags = styled.div`
  // contains Tag, ViewTags
  grid-area: tags;
  word-wrap: break-word;
  text-align: right;
  margin-right: 60px;
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
  grid-area: line
`

const LeftComponent = styled.div`
  // contains Upvote, Downvote, Likes
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

const TopMiddleComponent = styled.div`
  // contains DiscussionTitle, MoreOptions, DiscussionBody
  position: relative;
  grid-area: topmiddle;
  display: grid;
  grid-template-areas:
    'title moreoptions'
    'body moreoptions'
    'image moreoptions';
  grid-template-columns: 1fr 60px;
  grid-template-rows: auto auto auto;
`

const DiscussionTitle = styled.text`
  grid-area: title;
  padding: 20px 0px 0px 0px;
  min-height: 4vh;
  font-family: avenir-heavy;
  font-size: 2.3vh;
  font-weight: bold;
  max-height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  align-self: start;
`

const FullPostLink = styled(Link)`
  color: black;
  text-decoration: none;
`

const Kind = styled.text`
  font: normal normal 900 15px/20px Avenir;
  color: #7380FF;
  border: 1px solid #7380FF;
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
  justify-self: start;
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
  padding: 0px 0px 10px 0px;
  font-family: avenir-roman;
  font-size: 2vh;
  max-height: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  // word-wrap: break-word
`

const BottomComponent = styled.div`
  // contains ShareFacebook, ShareTwitter, Share
  grid-area: bottom;
  display: grid;
  grid-template-columns: 1fr 8vw 2.5vw 2.5vw 2.5vw 1vw;
  grid-template-areas: '. comment facebook twitter share .';
  justify-items: start;
  align-items: center;
`

 

const Comment = styled.div`
  grid-area: comment;
`

const ShareFacebook = styled.div`
  grid-area: facebook;
`

const ShareTwitter = styled.div`
  grid-area: twitter;
`

const Share = styled.div`
  grid-area: share;
`

const ReadMore = styled.text`
  color: #000080;
  font-size: 2vh;
  font-weight: normal;
  text-decoration: underline;
`

const CommentComponent = styled.div`
  // contains DividerBottom, ShowCommentsDiv, NewCommentDiv, PostCommentDiv, CommentsDiv
  grid-area: comments;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1vh 3vh 4vh 3vh auto;
  grid-template-areas: 'dividerbottom'
                       'showcomments'
                       'newcomment'
                       'postcomment'
                       'commentsdiv';
`
const DividerBottom = styled.div`
  grid-area: dividerbottom
`
const ShowCommentsDiv = styled.div`
  grid-area: showcomments
`
const NewCommentDiv = styled.div`
  grid-area: newcomment
`
const PostCommentDiv = styled.div`
  grid-area: postcomment
`
const CommentsDiv = styled.div`
  grid-area: commentsdiv
`

// based off title box in WritePost styles
const CommentInput = styled.div`
  border: solid;
  width: 70%;
  height: 42px;
  background: #f4f4f49a 0% 0% no-repeat padding-box;
  border-radius: 5px;
  opacity: 1;
  text-align: left;
  vertical-align: middle;
  font: Roman 21px/24px Avenir;
  letter-spacing: 0px;
  color: #a9abb4;
`
// based off posting button in WritePost styles
const CommentButton = styled.button`
  position: relative;
  // background-color: #fabed6; /* Light pink */
  border: none;
  // color: black;
  padding: 5px 10px;
  text-align: center;
  // text-decoration: none;
  display: inline-block;
  cursor: pointer;
  z-index: 5;
  margin: 5px;
  &:hover {
    background-color: #e7c6c6;
    opacity: 100%;
  }
  //top: 849px;
  //left: 1222px;
  width: 150px;
  height: 46px;
  background: #ffffff 0% 0% no-repeat padding-box;
  font: Medium 20px/17px Avenir;
  letter-spacing: 0px;
  color: #747886;
  border: 2px solid #cdced2;
  border-radius: 20px;
  opacity: 1;
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
}
