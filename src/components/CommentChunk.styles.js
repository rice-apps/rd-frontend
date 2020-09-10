import styled from "styled-components";
import { Link } from "react-router-dom";

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
`;
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
`;

const CommentListItem = styled.li`
  list-style-type: none;
`;

const CommentWhole = styled.div`
  // single comment area
  display: grid;
  grid-template-areas:
    "votes comment"
    "votes commentmenu"
    "replyarea replyarea";
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr 1fr 1fr;
`;

const CommentDiv = styled.div`
  position: relative;
  grid-area: comment;
  display: grid;
  grid-template-areas:
    'commentauthor commentcontent'
  grid-template-columns: auto 1fr;
  // padding: 5px 0px;
  // overflow: hidden;
  // text-overflow: ellipsis;
  // white-space: nowrap;
`;

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
`;

const CommentUpvote = styled.div`
  grid-row: 2/3;
`;

// unused
// const CommentLikes = styled.div`
//   grid-row: 3/4;
// `

const CommentDownvote = styled.div`
  grid-row: 3/4;
`;

const CommentMenu = styled.div`
  // comment menu of options
  // position: relative;
  grid-area: commentmenu;
  display: grid;
  grid-template-areas: "commentoption1 commentoption2 commentoption3 commentoption4 commentoption5 space";
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 15%;
  grid-template-rows: 1fr;
`;

const ReplyArea = styled.div`
  // contains things to reply to comment
  grid-area: replyarea;
  display: grid;
  grid-template-areas: "replyinput postreplybutton";
  grid-template-columns: 50% 1fr;
  grid-template-rows: 1fr;
`;

const ReplyStart = styled.button`
  grid-area: commentoption1
  // padding: 5px;
  // margin: 0 10px;
  text-decoration: underline;
  border: none;
  // background-color:
`;

const ReportButton = styled.button`
  grid-area: commentoption3
  // padding: 5px;
  // margin: 0 10px;
  text-decoration: underline;
  border: none;
`;

const DeleteButton = styled.button`
  grid-area: commentoption4
  text-decoration: underline;
  border: none;
`;

const TimestampDiv = styled.div`
  grid-area: commentoption5;
  // padding: 5px;
`;

const CountDiv = styled.div`
  grid-area: commentoption2;
  // padding: 5px;
`;

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
  DeleteButton,
};
