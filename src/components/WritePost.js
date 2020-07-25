import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

import UploadToPost from "./UploadToPost";

import { useMutation } from "@apollo/client";

import { POST_CREATE } from "../graphql/Mutations";

import { TOKEN_NAME } from "../utils/config";
import { Redirect, useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
    PostWrapper,
    Button,
    ButtonWrapper,
    PostHeaderType,
    Form,
    TitleDescriptor,
    TitleWrapper,
    TitleBox,
    BodyWrapper,
    PostingButton,
    BodyBox,
    ImageWrapper,
    ImageBox,
    ExitButton,
    TitleFlex,
} from "./WritePost.styles";

function WritePost(props) {
    const [url, setUrl] = useState("");

    const callbackURL = (childData) => {
        setUrl(childData);
    };

    useEffect(() => {
        console.log("event happened");
    });

    const history = useHistory();

    const userInfo = JSON.parse(localStorage.getItem(TOKEN_NAME));
    const [startDate, setStart] = useState(new Date().getTime());
    const [endDate, setEnd] = useState(new Date().getTime());
    const [place, setPlace] = useState("");
    const [, setPaid] = useState(false);
    const [, setClosed] = useState(false);
    const [postType, setPostType] = useState("Discussion");

    const [postCreate] = useMutation(POST_CREATE);

    if (!props.show) {
        return null;
    }

    if (!localStorage.getItem(TOKEN_NAME)) {
        return <Redirect to="/login" />;
    }

    let form = <div>Something went wrong! Please report to riceapps.</div>;

    const changeStartDate = (date) => setStart(date);
    const changeEndDate = (date) => setEnd(date);
    const changePostType = (e) => setPostType(e.target.id);

    const closeModal = () => {
        props.switchVisibility(false);
    };

    const checkTitleAndBody = (title, body) =>
        title.length <= 0 || body.length <= 0;

    switch (postType) {
        case "Discussion":
            form = (
                <Form>
                    <TitleWrapper>
                        <TitleDescriptor>Title</TitleDescriptor>
                        <TitleBox id="title" contentEditable={true} />
                    </TitleWrapper>
                    <BodyWrapper>
                        <TitleDescriptor>Body</TitleDescriptor>
                        <BodyBox id="body" contentEditable={true} />
                    </BodyWrapper>
                    <ImageWrapper>
                        <TitleDescriptor>Images</TitleDescriptor>
                        <ImageBox id="image">
                            <UploadToPost parentUrlCallback={callbackURL} />
                            {/* <p>{url}</p> */}
                        </ImageBox>
                    </ImageWrapper>
                    <PostingButton
                        onClick={(e) => {
                            e.preventDefault();
                            const title = document.getElementById("title")
                                .innerHTML;
                            const body = document.getElementById("body")
                                .innerHTML;
                            if (checkTitleAndBody(title, body)) return;
                            try {
                                postCreate({
                                    variables: {
                                        kind: postType,
                                        title: title,
                                        body: body,
                                        creator: userInfo.netID,
                                        imageUrl: url,
                                    },
                                });
                                props.switchVisibility(false);
                                history.push("/feed");
                            } catch (error) {
                                console.log("error", error);
                            }
                        }}
                    >
                        Post
                    </PostingButton>
                </Form>
            );
            break;
        case "Event":
            form = (
                <Form>
                    <TitleWrapper>
                        <TitleDescriptor>Title</TitleDescriptor>
                        <TitleBox id="title" contentEditable={true} />
                    </TitleWrapper>
                    <BodyWrapper>
                        <TitleDescriptor>Body</TitleDescriptor>
                        <BodyBox id="body" contentEditable={true} />
                    </BodyWrapper>
                    <ImageWrapper>
                        <TitleDescriptor>Images</TitleDescriptor>
                        <ImageBox id="image">
                            <UploadToPost parentUrlCallback={callbackURL} />
                        </ImageBox>
                    </ImageWrapper>
                    Start Date
                    <DatePicker
                        selected={startDate}
                        onChange={changeStartDate}
                    />
                    End Date
                    <DatePicker selected={endDate} onChange={changeEndDate} />
                    <input
                        type="text"
                        name="Place of Event"
                        placeholder="Event Location"
                        onChange={(e) => setPlace(e.target.value)}
                    />
                    <PostingButton
                        onClick={(e) => {
                            e.preventDefault();
                            try {
                                const title = document.getElementById("title")
                                    .innerHTML;
                                const body = document.getElementById("body")
                                    .innerHTML;
                                if (checkTitleAndBody(title, body)) return;
                                postCreate({
                                    variables: {
                                        kind: postType,
                                        title: title,
                                        body: body,
                                        creator: userInfo.netID,
                                        start: startDate,
                                        end: endDate,
                                        place: place,
                                        imageUrl: url,
                                    },
                                });
                                props.switchVisibility(false);
                                history.push("/feed");
                            } catch (error) {
                                console.log("error", error);
                            }
                        }}
                    >
                        Post
                    </PostingButton>
                </Form>
            );
            break;
        case "Job":
            form = (
                <>
                    <Form>
                        <TitleWrapper>
                            <TitleDescriptor>Title</TitleDescriptor>
                            <TitleBox id="title" contentEditable={true} />
                        </TitleWrapper>
                        <BodyWrapper>
                            <TitleDescriptor>Body</TitleDescriptor>
                            <BodyBox id="body" contentEditable={true} />
                        </BodyWrapper>
                        <ImageWrapper>
                            <TitleDescriptor>Images</TitleDescriptor>
                            <ImageBox id="image">
                                <UploadToPost parentUrlCallback={callbackURL} />
                            </ImageBox>
                        </ImageWrapper>
                        <input
                            type="text"
                            name="Place of Job"
                            placeholder="Event Location"
                            onChange={(e) => setPlace(e.target.value)}
                        />
                        Start Date
                        <DatePicker
                            selected={startDate}
                            onChange={changeStartDate}
                            style={{ width: "inherit" }}
                        />
                        End Date
                        <DatePicker
                            selected={endDate}
                            onChange={changeEndDate}
                        />
                        <input
                            type="text"
                            name="Is the job paid?"
                            placeholder="Unpaid"
                            onChange={(e) => setPaid(e.target.value)}
                        />
                        <input
                            type="text"
                            name="Is the job closed?"
                            placeholder="Job open"
                            onChange={(e) => setClosed(e.target.value)}
                        />
                        <PostingButton
                            onClick={(e) => {
                                e.preventDefault();
                                try {
                                    const title = document.getElementById(
                                        "title",
                                    ).innerHTML;
                                    const body = document.getElementById("body")
                                        .innerHTML;
                                    if (checkTitleAndBody(title, body)) return;
                                    postCreate({
                                        variables: {
                                            kind: postType,
                                            title: title,
                                            body: body,
                                            creator: userInfo.netID,
                                            start: startDate,
                                            end: endDate,
                                            place: place,
                                            isPaid: true,
                                            isClosed: true,
                                        },
                                    });
                                    console.log("Submitted and push!");
                                    props.switchVisibility(false);
                                    history.push("/feed");
                                } catch (error) {
                                    console.log("error", error);
                                }
                            }}
                        >
                            Post
                        </PostingButton>
                    </Form>
                </>
            );
            break;
        case "Notice":
            form = (
                <Form>
                    <TitleWrapper>
                        <TitleDescriptor>Title</TitleDescriptor>
                        <TitleBox id="title" contentEditable={true} />
                    </TitleWrapper>
                    <BodyWrapper>
                        <TitleDescriptor>Body</TitleDescriptor>
                        <BodyBox id="body" contentEditable={true} />
                    </BodyWrapper>
                    <ImageWrapper>
                        <TitleDescriptor>Images</TitleDescriptor>
                        <ImageBox id="image">
                            <UploadToPost parentUrlCallback={callbackURL} />
                        </ImageBox>
                    </ImageWrapper>
                    Deadline Date
                    <DatePicker
                        selected={endDate}
                        onChange={changeEndDate}
                        style={{ width: "inherit" }}
                    />
                    <PostingButton
                        onClick={(e) => {
                            e.preventDefault();
                            try {
                                const title = document.getElementById("title")
                                    .innerHTML;
                                const body = document.getElementById("body")
                                    .innerHTML;
                                if (checkTitleAndBody(title, body)) return;
                                postCreate({
                                    variables: {
                                        kind: postType,
                                        title: title,
                                        body: body,
                                        creator: userInfo.netID,
                                        deadline: endDate,
                                    },
                                });
                                props.switchVisibility(false);
                                history.push("/feed");
                            } catch (error) {
                                console.log("error", error);
                            }
                        }}
                    >
                        Post
                    </PostingButton>
                </Form>
            );
            break;

        default:
            throw new Error("something went horribly wrong!");
    }

    return (
        <div>
            <Helmet>
                <title>RiceDiscuss &middot; Compose post</title>
            </Helmet>
            <ButtonWrapper>
                <Button id="Discussion" onClick={changePostType}>
                    Discussion
                </Button>
                <Button id="Notice" onClick={changePostType}>
                    Notice
                </Button>
                <Button id="Event" onClick={changePostType}>
                    Event
                </Button>
                <Button id="Job" onClick={changePostType}>
                    Job
                </Button>
            </ButtonWrapper>
            <PostWrapper>
                <TitleFlex>
                    <PostHeaderType>{postType}</PostHeaderType>
                    <ExitButton onClick={closeModal}>X</ExitButton>
                </TitleFlex>
                {form}
            </PostWrapper>
        </div>
    );
}

export default WritePost;
