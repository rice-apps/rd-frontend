import React, { useEffect, useState } from "react";

import ReactHtmlParser from "react-html-parser";

import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ArrowDropUp from "@material-ui/icons/ArrowDropUp";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import ShareIcon from '@material-ui/icons/Share';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useMutation } from "@apollo/react-hooks";

import {
    UPVOTE_POST,
    DOWNVOTE_POST
} from "../graphql/Mutations";

import { TOKEN_NAME } from "../utils/config";

import {
    Banner,
    DiscussionBoxSection,
    DiscussionBox,
    LeftComponent,
    Likes,
    Upvote,
    Downvote,
    TopComponent,
    DiscussionTitle,
    TagOne,
    TagTwo,
    TagThree,
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
    Share
} from "./Discussion.styles";


        
const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
        },
    },
}));

function Discussion(props) {
    const [page, setPage] = useState(2);

    const classes = useStyles();

    const userInfo = JSON.parse(localStorage.getItem(TOKEN_NAME));

    const [upvotePost] = useMutation(UPVOTE_POST);

    const [downvotePost] = useMutation(DOWNVOTE_POST);

    useEffect(() => {
        props.subscribeToNewPosts();
        props.subscribeToNewVotes();
    }, []);

    if (props.loading) return <h1>Loading...</h1>;
    if (props.error) return <h1>Something went wrong...</h1>;

    const discussions = props.data.postPagination.items.map((post, i) => {
        return (
            <React.Fragment key={i}>
                <DiscussionBoxSection>
                    <DiscussionBox>
                        <LeftComponent>
                            <Upvote className={classes.root}>
                                <IconButton onClick={(e) => {
                                    e.preventDefault();
                                    upvotePost({
                                        variables: {
                                            netID: userInfo.netID,
                                            _id: post._id,
                                        },
                                    });
                                }}>
                                    
                                    <ArrowDropUp />
                                </IconButton>
                            </Upvote>
                            <Likes>{post.upvotes.length - post.downvotes.length}</Likes>
                            <Downvote className={classes.root}>
                                <IconButton onClick={(e) => {
                                    e.preventDefault();
                                    downvotePost({
                                        variables: {
                                            netID: userInfo.netID,
                                            _id: post._id,
                                        },
                                    });
                                }}>
                                    <ArrowDropDown />
                                </IconButton>
                            </Downvote>
                        </LeftComponent>

                        <TopComponent>
                            <DiscussionTitle>{post.title}</DiscussionTitle>
                            <TagOne>Tag 1</TagOne>
                            <TagTwo>Tag 2</TagTwo>
                            <TagThree>Tag 3</TagThree>
                        </TopComponent>

                        <MiddleComponent>
                            <DiscussionBody>
                                {ReactHtmlParser(post.body)}
                            </DiscussionBody>
                        </MiddleComponent>

                        <BottomComponent>
                            <Save>Save</Save>
                            <AddTo>+ Add to...</AddTo>
                            <OP>
                                {post.creator.username}
                            </OP>
                            <Time>{post.date_created.substring(11, 16)}</Time>
                            <Date>
                                {post.date_created.substring(5, 7) + '/' + 
                                post.date_created.substring(8, 10) + '/' + 
                                post.date_created.substring(0, 4)}
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
            </React.Fragment>
            
            
        );
    });

    return (
        <React.Fragment>
            <Banner />
            {discussions}
            <button
                onClick={() => {
                    setPage(page + 1);
                    props.onLoadMore(page);
                }}
            >
                Load More
            </button>
        </React.Fragment>
    );
}

export default Discussion;
