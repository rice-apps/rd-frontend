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
  padding: 1vh 0px;
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
  grid-template-rows: 1vh 3vh 3.5vh 1fr;
  grid-template-areas: '.'
                       'upvote'
                       'downvote';
                       '.';
  justify-items: center;
  align-items: center;
`

const CommentUpvote = styled.div`
  grid-area: upvote
`

const CommentDownvote = styled.div`
  grid-area: downvote;
`

const CommentMenu = styled.div`
  // comment menu of options
  // position: relative;
  grid-area: commentmenu;
  display: grid;
  grid-template-areas: 'reply hoots report time delete .';
  grid-template-columns: 3vw auto auto auto auto 1fr;
  align-items: center;
  justify-items: start;
  grid-column-gap: 1vw;
`

const ReplyArea = styled.div`
  // contains things to reply to comment
  grid-area: replyarea;
  display: grid;
  padding: 1vh 0px;
  justify-items: start;
  grid-template-areas: 'replyinput'
                       'replybutton';
  grid-template-rows: auto auto;
`

/* const ReplyStart = styled.button`
  grid-area: reply
  text-decoration: underline;
  border: none;
  background: none;
  font-size: 1.7vh;
  text-align: left;
  color: #A9ABB4;
  opacity: 1;
` */

const ReplyStart = styled.button`
  grid-area: reply;
  margin-left: -0.8vh;
  text-decoration: none;
  border: none;
  background: none;
  font-size: 1.7vh;
  color: #A9ABB4;
  opacity: 1;
  cursor: pointer;
  &:hover {
    color: #e7c6c6;
  }
`


const CountDiv = styled.text`
  grid-area: hoots
  font-size: 1.7vh;
  color: #A9ABB4;
  opacity: 1;
  min-width: 4vw;
  // padding: 5px;
`

const ReportButton = styled.button`
  grid-area: report;
  // padding: 5px;
  // margin: 0 10px;
  text-decoration: none;
  border: none;
  background: none;
  font-size: 1.7vh;
  color: #A9ABB4;
  opacity: 1;
  cursor: pointer;
  &:hover {
    color: #e7c6c6;
  }
`

const DeleteButton = styled.button`
  grid-area: delete
  text-decoration: none;
  border: none;
  background: none;
  font-size: 1.7vh;
  text-align: left;
  color: #A9ABB4;
  opacity: 1;
  cursor: pointer;
  &:hover {
    color: #e7c6c6;
  }
`

const TimestampDiv = styled.text`
  grid-area: time
  font-size: 1.7vh;
  color: #A9ABB4;
  opacity: 1;
  // padding: 5px;
`


const ReplyInput = styled.input`
  grid-area: replyinput;
  background: #F8F8F8 0% 0% no-repeat padding-box;
  border: none;
  border-radius: 20px;

  width: 40vw;
  height: auto;
  min-height: 5vh;

  overflow-y: auto;

  padding-left: 0.5vw;
  padding-top: 0.5vh;
  margin-left: 4vw;

  text-align: left;
  font: normal normal medium 16px/22px Avenir;
  letter-spacing: 0px;
  opacity: 1;
`

const PostReplyButton = styled.button`
  grid-area: replybutton;
  position: relative;
  padding: 0.5vh 1vw;
  text-align: center;
  display: inline-block;
  cursor: pointer;
  margin: 1vh 0px 0px 5vw;
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
const ReplyButtonText = styled.text`
  font: normal normal 700 15px/20px Avenir;
  letter-spacing: 0px;
  color: #FFFFFF;
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
  ReplyButtonText,
  DeleteButton
}
