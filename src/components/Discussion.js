import React, { useEffect, useState } from "react";

import ReactHtmlParser from "react-html-parser";

import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ArrowDropUp from "@material-ui/icons/ArrowDropUp";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";

<<<<<<< HEAD
import { DiscussionBoxSection, DiscussionBox, LeftComponent, Likes, Upvote, 
        Downvote, Dislikes, MiddleComponent, DiscussionTitle, DiscussionBody, BottomComponent, OP } from "./Discussion.styles";
=======
import {
    DiscussionBoxSection,
    DiscussionBox,
    LeftComponent,
    Likes,
    Upvote,
    Downvote,
    Dislikes,
    MiddleComponent,
    DiscussionTitle,
    DiscussionBody,
    BottomComponent,
} from "./Discussion.styles";
>>>>>>> 10f14530606824a3b773b203e1d0d223ea346d3f


        
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

    useEffect(() => {
        props.subscribeToNewDiscussions();
    });

    if (props.loading) return <h1>Loading...</h1>;
    if (props.error) return <h1>Something went wrong...</h1>;


    const discussions = props.data.postPagination.items.map((post, i) => {
        console.log(post);
        return (
            <DiscussionBoxSection>
                <React.Fragment key={i}>
                    <DiscussionBox>
                        <LeftComponent>
                            <Likes>15</Likes>
                            <Upvote className={classes.root}>
                                <IconButton>
                                    <ArrowDropUp />
                                </IconButton>
                            </Upvote>
                            <Downvote className={classes.root}>
                                <IconButton>
                                    <ArrowDropDown />
                                </IconButton>
                            </Downvote>
                            <Dislikes>3</Dislikes>
                        </LeftComponent>

                        <MiddleComponent>
                            <DiscussionTitle>{post.title}</DiscussionTitle>
                            <DiscussionBody>
                                {ReactHtmlParser(post.body)}
                            </DiscussionBody>
                        </MiddleComponent>

<<<<<<< HEAD
                        <BottomComponent>
                            <OP>
                                {post.creator.username}
                            </OP>
                        </BottomComponent>

=======
                        <BottomComponent></BottomComponent>
>>>>>>> 10f14530606824a3b773b203e1d0d223ea346d3f
                    </DiscussionBox>
                </React.Fragment>
            </DiscussionBoxSection>
            
        );
    });

    return (
        <React.Fragment>
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
