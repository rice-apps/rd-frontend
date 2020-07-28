import React, {useState} from "react";
import { COMMENT_CREATE } from "../graphql/Mutations";
import { useMutation } from "@apollo/client";
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
<<<<<<< HEAD
    const [body, setBody] = useState("");

    const [commentCreate] = useMutation(COMMENT_CREATE);

=======
    let oneImage = <React.Fragment></React.Fragment>

    if (props.post.node.imageUrl) {
        oneImage = <img src={props.post.node.imageUrl} alt="Custom-thing" />
    }
>>>>>>> 4ede5c63b9a9a96e5b99f3936e1afad244cfb09c

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
                        {oneImage}
                    </MiddleComponent>

                    <BottomComponent>
                        <Save
                            onClick={(e) => {
                                e.preventDefault();

                                const currentSavedPosts = props.userInfo.savedPosts.map(
                                    (tup) => tup._id,
                                );
                                props.savePost({
                                    variables: {
                                        netID: props.userInfo.netID,
                                        savedPosts: [
                                            ...currentSavedPosts,
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
                    <input
                        type="text"
                        name="body"
                        placeholder="Comment"
                        onChange={(e) => setBody(e.target.value)}
                    />
                    <Save
                        onClick={(e) => {
                            e.preventDefault();
                            commentCreate({
                                variables: {
                                    body: body,
                                    creator: props.userInfo.netID,
                                    post: props.post.node._id,
                                    depth: 0
                                },
                            });
                        }}
                    >
                        Comment
                    </Save>
                </DiscussionBox>
            </DiscussionBoxSection>
        </>
    );
}

export default PostChunk;
