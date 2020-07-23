import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import ArrowDropUp from "@material-ui/icons/ArrowDropUp";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import ShareIcon from "@material-ui/icons/Share";

import ReactHtmlParser from "react-html-parser";

import {
    DiscussionBoxSection,
    DiscussionBox,
    LeftComponent,
    Likes,
    Upvote,
    Downvote,
    TopComponent,
    DiscussionTitle,
    Tags,
    MiddleComponent,
    DiscussionBody,
    BottomComponent,
    Save,
    AddTo,
    OP,
    Time,
    Date,
    ShareFacebook,
    ShareTwitter,
    Share,
} from "./PostChunk.styles";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
        },
    },
}));

function PostChunk(props) {
    const classes = useStyles();

    return (
        <>
            <DiscussionBoxSection>
                <DiscussionBox>
                    <LeftComponent>
                        <Upvote className={classes.root}>
                            <IconButton
                                onClick={(e) => {
                                    e.preventDefault();
                                    props.upvotePost({
                                        variables: {
                                            netID: props.userInfo.netID,
                                            _id: props.post.node._id,
                                        },
                                    });
                                }}
                            >
                                <ArrowDropUp />
                            </IconButton>
                        </Upvote>
                        <Likes>
                            {props.post.node.upvotes.length -
                                props.post.node.downvotes.length}
                        </Likes>
                        <Downvote className={classes.root}>
                            <IconButton
                                onClick={(e) => {
                                    e.preventDefault();
                                    props.downvotePost({
                                        variables: {
                                            netID: props.userInfo.netID,
                                            _id: props.post.node._id,
                                        },
                                    });
                                }}
                            >
                                <ArrowDropDown />
                            </IconButton>
                        </Downvote>
                    </LeftComponent>

                    <TopComponent>
                        <DiscussionTitle>
                            {props.post.node.title}
                        </DiscussionTitle>
                        <Tags>Tags</Tags>
                    </TopComponent>

                    <MiddleComponent>
                        <DiscussionBody>
                            {ReactHtmlParser(props.post.node.body)}
                        </DiscussionBody>
                    </MiddleComponent>

                    <BottomComponent>
                        <Save
                            onClick={(e) => {
                                e.preventDefault();
                                props.savePost({
                                    variables: {
                                        netID: props.userInfo.netID,
                                        savedPosts: [
                                            ...props.userInfo.savedPosts,
                                            props.post.node._id,
                                        ],
                                    },
                                });
                            }}
                        >
                            Save
                        </Save>
                        <AddTo>+ Add to...</AddTo>
                        <OP>{props.post.node.creator.username}</OP>
                        <Time>
                            {props.post.node.date_created.substring(11, 16)}
                        </Time>
                        <Date>
                            {props.post.node.date_created.substring(5, 7) +
                                "/" +
                                props.post.node.date_created.substring(8, 10) +
                                "/" +
                                props.post.node.date_created.substring(0, 4)}
                        </Date>
                        <ShareFacebook>
                            <IconButton>
                                <FacebookIcon />
                            </IconButton>
                        </ShareFacebook>
                        <ShareTwitter>
                            <IconButton>
                                <TwitterIcon />
                            </IconButton>
                        </ShareTwitter>
                        <Share>
                            <IconButton>
                                <ShareIcon />
                            </IconButton>
                        </Share>
                    </BottomComponent>
                </DiscussionBox>
            </DiscussionBoxSection>
        </>
    );
}

export default PostChunk;
