import styled from 'styled-components'
import { Link } from 'react-router-dom'

// based off title box in WritePost styles
const CommentInput = styled.div`
  border: solid;

  width: 386px;
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
  padding: 15px 20px;
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

const CommentListItem = styled.li`
  list-style-type: none;
`

const CommentWhole = styled.div`
  // single comment area
  display: grid;
  grid-template-areas:
    'votes commentbody'
    'votes commentmenu'
    'replyarea replyarea';
  grid-template-columns: 4vw 1fr;
  grid-template-rows: auto 4vh auto;
`

const CommentDiv = styled.div`
  position: relative;
  grid-area: commentbody;
  display: grid;
  grid-template-areas:
    'commentauthor commentcontent'
  grid-template-columns: auto 1fr;
  // padding: 5px 0px;
  // overflow: hidden;
  // text-overflow: ellipsis;
  // white-space: nowrap;
`

// const CommenterDiv = styled.div`
//   grid-area: commentauthor;
//   font-weight: bold;
//   // padding: 5px 0px;
//   // overflow: hidden;
//   // text-overflow: ellipsis;
//   // white-space: nowrap;
// `

// const CommentContentDiv = styled.div`
//   grid-area: commentcontent;
//   font-weight: bold;
//   // padding: 5px 0px;
//   // overflow: hidden;
//   // text-overflow: ellipsis;
//   // white-space: nowrap;
// `

const CommentVotes = styled.div`
  grid-area: votes;
  display: grid;
  grid-template-rows: 1fr 30px 30px 1fr; // add another for number if needed
  justify-items: center;
  align-items: center;
`

const CommentUpvote = styled.div`
  grid-row: 2/3;
`

// unused
// const CommentLikes = styled.div`
//   grid-row: 3/4;
// `

const CommentDownvote = styled.div`
  grid-row: 3/4;
`

const CommentMenu = styled.div`
  // comment menu of options
  // position: relative;
  grid-area: commentmenu;
  display: grid;
  grid-template-areas: 'reply hoots report time delete .';
  grid-template-columns: auto auto auto auto auto 1fr;
  align-items: center;
  grid-column-gap: 1vw;
`

const ReplyArea = styled.div`
  // contains things to reply to comment
  grid-area: replyarea;
  display: grid;
  grid-template-areas: 'replyinput postreplybutton';
  grid-template-columns: 50% 1fr;
  grid-template-rows: 1fr;
`

const ReplyStart = styled.button`
  grid-area: reply
  // padding: 5px;
  // margin: 0 10px;
  text-decoration: underline;
  border: none;
  // background-color:
`

const CountDiv = styled.div`
  grid-area: hoots
  // padding: 5px;
`

const ReportButton = styled.button`
  grid-area: report
  // padding: 5px;
  // margin: 0 10px;
  text-decoration: underline;
  border: none;
`

const DeleteButton = styled.button`
  grid-area: delete
  text-decoration: underline;
  border: none;
`

const TimestampDiv = styled.div`
  grid-area: time
  // padding: 5px;
`


const ReplyInput = styled.input`
  grid-area: replyinput;
  border: solid;

  width: 386px;
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

const PostReplyButton = styled.button`
  grid-area: postreplybutton;
  position: relative;
  padding: 15px 32px;
  text-align: center;
  display: inline-block;
  cursor: pointer;
  z-index: 5;
  margin: 5px;
  &:hover {
    background-color: #e7c6c6;
    opacity: 100%;
  }

  width: 114px;
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
  CommentInput,
  CommentButton,
  CommentListItem,
  CommentWhole,
  CommentDiv,
  // CommenterDiv,
  // CommentContentDiv,
  CommentMenu,
  ReplyStart,
  ReportButton,
  TimestampDiv,
  CountDiv,
  CommentVotes,
  CommentUpvote,
  // CommentLikes,
  CommentDownvote,
  ReplyArea,
  ReplyInput,
  PostReplyButton,
  DeleteButton
}
