import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { currentUser } from "../utils/apollo";

import {
  CREATE_COMMENT,
  UPVOTE_COMMENT,
  DOWNVOTE_COMMENT,
  REPORT_COMMENT,
} from "../graphql/Mutations";

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
  CommentListItem,
  CommentWhole,
  CommentDiv,
  CommentMenu,
  ReplyStart,
  ReportButton,
  TimestampDiv,
  CountDiv,
  CommentVotes,
  CommentUpvote,
  CommentDownvote,
  ReplyArea,
  ReplyInput,
  PostReplyButton,
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
  const [createComment] = useMutation(CREATE_COMMENT);
  const [upvoteComment] = useMutation(UPVOTE_COMMENT);
  const [downvoteComment] = useMutation(DOWNVOTE_COMMENT);
  const [reportComment] = useMutation(REPORT_COMMENT);
  const classes = useStyles();

  const [reply, setReply] = useState("");

  const [replyAreaVisible, setVisibility] = useState(false)
  const switchModal = () => setVisibility(!replyAreaVisible)

  let listOfUpvoters = props.comment.upvotes.map((userObject) => userObject.username);

  let listOfDownvoters = props.comment.downvotes.map(
    (userObject) => userObject.username
  );

  const [isUpvoted, setUpvoted] = useState(
    listOfUpvoters.includes(userInfo.username)
  );
  const [isDownvoted, setDownvoted] = useState(
    listOfDownvoters.includes(userInfo.username)
  );

  const toggleUpvoted = () => {
    setUpvoted(!isUpvoted);
    setDownvoted(false);
  };

  const toggleDownvoted = () => {
    setDownvoted(!isDownvoted);
    setUpvoted(false);
  };

  const checkComment = (comment) => comment.length <= 0;

  console.log(props);

  // <CommentListItem key={props.comment._id}>
  // ^ resolve whether this should be used or PostFull's li should be used 

  return (
    <CommentWhole>
      <CommentVotes>
        <CommentUpvote className={classes.root}>
          <IconButton
            style={isUpvoted ? { color: '#7380FF' } : { color: grey[700] }}
            onClick={e => {
              e.preventDefault()
              toggleUpvoted()
              upvoteComment({
                variables: {
                  // netID: userInfo.netID,
                  _id: props.comment._id
                }
              })
            }}
          >
            <ArrowDropUp fontSize="large" />
          </IconButton>
        </CommentUpvote>
        <CommentDownvote className={classes.root}>
          <IconButton
            style={isDownvoted ? { color: '#7380FF' } : { color: grey[800] }}
            onClick={e => {
              e.preventDefault()
              toggleDownvoted()
              downvoteComment({
                variables: {
                  // netID: userInfo.netID,
                  _id: props.comment._id
                }
              })
            }}
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
        {/* TODO deleting comments */}
        {/* TODO ************************************************** */}
        <ReplyStart
          onClick={e => {
            e.preventDefault()

            switchModal();
          }}
        >
          Reply
        </ReplyStart>

        <CountDiv>{props.comment.upvotes.length -
          props.comment.downvotes.length} Votes</CountDiv>

        <ReportButton
          onClick={e => {
            e.preventDefault()

            // TODO doesn't work yet (bad request errors)
            reportComment({
              variables: {
                // netID: userInfo.netID,
                _id: props.comment._id
              }
            });
          }}
        >
          Report
        </ReportButton>

        <TimestampDiv>
          <TimeAgo date={props.comment.date_created} />
        </TimestampDiv>

      </CommentMenu>



      {!props.isLeaf && replyAreaVisible && (
        <ReplyArea>
          <ReplyInput
            id={String(props.comment._id)}
            placeholder="Reply here..."
            onChange={(e) => setReply(e.target.value)}
          />

          <PostReplyButton
            // onClick={e => {
            //   e.preventDefault()
            //   // get an input field to show up
            // }}
            onClick={e => {
              e.preventDefault()
              if (checkComment(reply)) return
              try {
                createComment({
                  variables: {
                    post: props.postID,
                    parent: props.comment._id,
                    body: reply,
                  },
                });
                setReply("");
                document.getElementById(String(props.comment._id)).value = "";
              } catch (error) {
                log.error(error);
              }
            }}
          >
            Post Reply
        </PostReplyButton>

        </ReplyArea>
      )}




    </CommentWhole>
  );
}

export default CommentChunk;
