import React, { useState } from "react";
import { currentUser } from "../utils/apollo";

import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import ArrowDropUp from "@material-ui/icons/ArrowDropUp";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import TimeAgo from "react-timeago";
import log from "loglevel";

import {
  // CommentInput,
  // CommentButton,
  // ReplyInput,
  CommentListItem,
  CommentWhole,
  CommentDiv,
  CommentMenu,
  ReplyButton,
  ReportButton,
  TimestampDiv,
  CountDiv,
  CommentVotes,
  CommentUpvote,
  CommentDownvote,
  ReplyInputForNow,
} from "./CommentChunk.styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function CommentChunk(props) {
  const userInfo = currentUser();
  const classes = useStyles();

  const [comment, setComment] = useState("");

  console.log(props);

  // <CommentListItem key={props.comment._id}>
  // ^ resolve whether this should be used or PostFull's li should be used 

  return (
    < CommentWhole >
      <CommentVotes>
        <CommentUpvote className={classes.root}>
          <IconButton
          // style={isUpvoted ? { color: '#7380FF' } : { color: grey[700] }}
          // onClick={e => {
          //   e.preventDefault()
          //   toggleUpvoted()
          //   upvoteComment({
          //     variables: {
          //       netID: userInfo.netID,
          //       _id: thePost._id
          //     }
          //   })
          // }}
          >
            <ArrowDropUp fontSize="large" />
          </IconButton>
        </CommentUpvote>
        <CommentDownvote className={classes.root}>
          <IconButton
          // style={isDownvoted ? { color: '#7380FF' } : { color: grey[800] }}
          // onClick={e => {
          //   e.preventDefault()
          //   // toggleDownvoted()
          //   // downvotePost({
          //   //   variables: {
          //   //     netID: userInfo.netID,
          //   //     _id: thePost._id
          //   //   }
          //   // })
          // }}
          >
            <ArrowDropDown fontSize="large" />
          </IconButton>
        </CommentDownvote>
      </CommentVotes>
      <CommentDiv>
        <p>
          <strong>{props.comment.creator.username}: </strong>
          {props.comment.body}
        </p>
      </CommentDiv>

      <CommentMenu>
        {/* TODO ************************************************** */}
        {/* <ReplyInput
            placeholder="Reply here..."
            onChange={(e) => setReply1(e.target.value)}
          /> */}

        {/* <ReplyButton
            // onClick={e => {
            //   e.preventDefault()
            //   // get an input field to show up
            // }}
            onClick={e => {
              e.preventDefault()
              const cmt = document.getElementById('reply1').innerHTML
              if (checkComment(cmt)) return
              try {
                createComment({
                  variables: {
                    post: props.postID,
                    parent: props.comment._id,
                    body: cmt
                  }
                })
              } catch (error) {
                log.error(error)
                // console.log(error)
              }
            }}
          >
            Post Reply
          </ReplyButton> */}

        <CountDiv>2 Likes</CountDiv>

        <ReportButton
        // onClick={e => {
        //   e.preventDefault()
        // }}
        >
          Report
          </ReportButton>

        <TimestampDiv>
          <TimeAgo date={props.comment.date_created} />
        </TimestampDiv>
      </CommentMenu>
    </CommentWhole >
  );
}

export default CommentChunk;
