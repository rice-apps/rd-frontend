import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import ArrowDropUp from "@material-ui/icons/ArrowDropUp";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import ShareIcon from "@material-ui/icons/Share";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import ReactHtmlParser from "react-html-parser";

import {
    DiscussionBoxSection,
    OP,
    Time,
    DiscussionBox,
    LeftComponent,
    Likes,
    Upvote,
    Downvote,
    TopMiddleComponent,
    DiscussionTitleDiv,
    DiscussionTitle,
    Tags,
    Tag,
    ViewTags,
    MoreTags,
    MoreOptions,
    DDMenu,
    DiscussionBody,
    BottomComponent,
    Save,
    AddTo,
    Report,
    Delete,
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
    let oneImage = <></>;

    if (props.post.node.imageUrl) {
        oneImage = (
            <img
                width={500}
                src={props.post.node.imageUrl}
                alt="Custom-thing"
            />
        );
    }

    const [isDDOpen, setDDOpen] = useState(false);
    const [isTagsOpen, setTagsOpen] = useState(false);

    const toggleDD = () => {
        setDDOpen(!isDDOpen);
    };

    const toggleTags = () => {
        setTagsOpen(!isTagsOpen);
        console.log({isTagsOpen})
    }

    return (
        <>
            <DiscussionBoxSection>
                <OP>{props.post.node.creator.username} - 5h</OP>
                
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

                    <TopMiddleComponent>
                        <DiscussionTitleDiv>
                            <DiscussionTitle>
                                {props.post.node.title}
                            </DiscussionTitle>
                        </DiscussionTitleDiv>
                        <MoreOptions className={classes.root}>
                            <IconButton onClick={toggleDD}>
                                <MoreHorizIcon open={isDDOpen} />
                            </IconButton>
                            {isDDOpen && (
                                <DDMenu>
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
                                        Save Post
                                    </Save>
                                    <AddTo>+ Add to...</AddTo>
                                    <Report 
                                        onClick={(e) => {
                                            e.preventDefault();
                                            console.log(props.post.node.reports)
                                            props.reportPost({
                                                variables: {
                                                    netID: props.userInfo.netID,
                                                    _id: props.post.node._id
                                                },
                                            });
                                            console.log(props.post.node.reports)
                                            
                                        }}
                                    >
                                        Report Post
                                    </Report>
                                    {props.post.node.creator.username === props.userInfo.username && (
                                        <Delete
                                            onClick={(e) => {
                                                e.preventDefault();
                                                props.removePost({
                                                    variables: {
                                                        _id: props.post.node._id,
                                                    },
                                                });
                                            }}
                                        >
                                            Delete Post
                                        </Delete>
                                    )}
                                </DDMenu>
                            )}
                        </MoreOptions>

                        <DiscussionBody>
                            {ReactHtmlParser(props.post.node.body)}
                        </DiscussionBody>
                        
                    </TopMiddleComponent>

                    <BottomComponent>
                        
                        <Tags>
                            {props.post.node.tags.length > 0 && <Tag>{props.post.node.tags[0]}</Tag>}
                            {props.post.node.tags.length > 1 && <Tag>{props.post.node.tags[1]}</Tag>}
                            {props.post.node.tags.length > 2 && <Tag>{props.post.node.tags[2]}</Tag>}               

                            {isTagsOpen && (
                                <MoreTags>
                                    {props.post.node.tags.slice(3,).forEach((tag) => 
                                        (
                                            <Tag>{tag}</Tag>
                                        )
                                    )}
                                </MoreTags>
                                
                            )}
                            
                            {props.post.node.tags.length > 3 && (
                                <ViewTags onClick={toggleTags}>
                                    (See All)
                                </ViewTags>
                            )}
                        </Tags>
                        
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
