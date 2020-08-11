import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

import UploadToPost from "./UploadToPost";

import { useMutation } from "@apollo/client";

import { POST_CREATE } from "../graphql/Mutations";
import { Checkbox } from "@material-ui/core";

import { TOKEN_NAME } from "../utils/config";
import { Redirect, useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
    PostWrapper,
    Button,
    ButtonWrapper,
    Form,
    TitleWrapper,
    TitleBox,
    BodyWrapper,
    PostingButton,
    BodyBox,
    ImageWrapper,
    ImageBox,
    ExitButton,
    TitleFlex,
    DateWrapper,
    PaidWrapper,
    JobWrapper,
    LocationWrapper,
    LocationBox,
    TagBox,
    TagWrapper,
    TagChosenWrapper,
    TagChosen,
    TagCircle,
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
    const [isPaid, setPaid] = useState(false);
    const [isClosed, setClosed] = useState(false);
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

    console.log(isPaid);
    const togglePaid = () => setPaid(!isPaid);

    const toggleClosed = () => setClosed(!isClosed);

    switch (postType) {
        case "Discussion":
            form = (
                <Form>
                    <TitleWrapper>
                        {/* <TitleDescriptor>Enter Title. . .</TitleDescriptor> */}
                        <TitleBox id="title" contentEditable={true}>
                            Enter Title. . .
                        </TitleBox>
                    </TitleWrapper>
                    <BodyWrapper>
                        {/* <TitleDescriptor>Body</TitleDescriptor> */}
                        <BodyBox id="body" contentEditable={true}>
                            Enter Description. . .
                        </BodyBox>
                    </BodyWrapper>
                    <ImageWrapper>
                        {/* <TitleDescriptor>Images</TitleDescriptor> */}
                        <ImageBox id="image">
                            Add Image
                            <UploadToPost parentUrlCallback={callbackURL} />
                            {/* <p>{url}</p> */}
                        </ImageBox>
                    </ImageWrapper>
                    <TagWrapper>
                        Add Tag
                        <TagBox contentEditable={true}/>
                        <TagChosenWrapper>
                            Your tags: 
                            <TagChosen>
                                <TagCircle/>
                                CS
                            </TagChosen>
                        </TagChosenWrapper>
                    </TagWrapper>
                    <PostingButton
                        onClick={(e) => {
                            e.preventDefault();
                            const title = document.getElementById("title")
                                .innerHTML;
                            const body = document.getElementById("body")
                                .innerHTML;
                            if (checkTitleAndBody(title, body)) return;
                            try {
                                console.log(url);
                                console.log(postType);
                                console.log(title);
                                console.log(body);
                                console.log(userInfo.netID);
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
                                //history.push("/feed");
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
                        <TitleBox id="title" contentEditable={true}>
                            Enter Title. . .
                        </TitleBox>
                        <DateWrapper>
                            From
                            <DatePicker
                                selected={startDate}
                                onChange={changeStartDate}
                                style={{ width: "inherit" }}
                            />
                            to
                            <DatePicker
                                selected={endDate}
                                onChange={changeEndDate}
                            />
                        </DateWrapper>
                    </TitleWrapper>
                    <BodyWrapper>
                        <BodyBox id="body" contentEditable={true}>
                            Enter Description. . .
                        </BodyBox>
                    </BodyWrapper>
                    <ImageBox id="image">
                            Add Image
                            <UploadToPost parentUrlCallback={callbackURL} />
                            {/* <p>{url}</p> */}
                    </ImageBox>
                    <TagWrapper>
                        Add Tag
                        <TagBox contentEditable={true}/>
                        <TagChosenWrapper>
                            Your tags: 
                            <TagChosen>
                                <TagCircle/>
                                CS
                            </TagChosen>
                        </TagChosenWrapper>
                    </TagWrapper>
                    <JobWrapper>
                        <LocationWrapper>
                            Location: 
                            <LocationBox id="place" contentEditable={true}/>
                        </LocationWrapper>
                    </JobWrapper>
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
                            <TitleBox id="title" contentEditable={true}>
                                Enter Title. . .
                            </TitleBox>
                            <DateWrapper>
                                From
                                <DatePicker
                                    selected={startDate}
                                    onChange={changeStartDate}
                                    style={{ width: "inherit" }}
                                />
                                to
                                <DatePicker
                                    selected={endDate}
                                    onChange={changeEndDate}
                                />
                            </DateWrapper>
                        </TitleWrapper>
                        <BodyWrapper>
                            <BodyBox id="body" contentEditable={true}>
                                Enter Description. . .
                            </BodyBox>
                        </BodyWrapper>
                        <ImageBox id="image">
                            Add Image
                            <UploadToPost parentUrlCallback={callbackURL} />
                            {/* <p>{url}</p> */}
                        </ImageBox>
                        <TagWrapper>
                            Add Tag
                            <TagBox contentEditable={true}/>
                            <TagChosenWrapper>
                                Your tags: 
                                <TagChosen>
                                    <TagCircle/>
                                    CS
                                </TagChosen>
                            </TagChosenWrapper>
                        </TagWrapper>
                        <JobWrapper>
                            <LocationWrapper>
                                Location: 
                                <LocationBox id="place" contentEditable={true}/>
                            </LocationWrapper>
                            <PaidWrapper>
                                <div>Is the job paid?</div>
                                {/* Documentation for these: https://material-ui.com/api/checkbox/ */}
                                <Checkbox id="isPaid" onChange={togglePaid} />
                                <div>Is the job open?</div>
                                <Checkbox id="isOpen" onChange={toggleClosed} />
                            </PaidWrapper>
                        </JobWrapper>
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
                                            isPaid: isPaid,
                                            isClosed: isClosed,
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
                        <TitleBox id="title" contentEditable={true}>
                            Enter Title. . .
                        </TitleBox>
                        <DateWrapper>
                            Deadline
                            <DatePicker
                                selected={endDate}
                                onChange={changeEndDate}
                            />
                        </DateWrapper>
                    </TitleWrapper> 
                    {/* need to put the descriptor as a placeholder inside the box */}
                    <BodyWrapper>
                        <BodyBox id="body" contentEditable={true}>
                            Enter Description. . .
                        </BodyBox>
                    </BodyWrapper>
                    <ImageBox id="image">
                            Add Image
                            <UploadToPost parentUrlCallback={callbackURL} />
                            {/* <p>{url}</p> */}
                    </ImageBox>
                    <TagWrapper>
                        Add Tag
                        <TagBox contentEditable={true}/>
                        <TagChosenWrapper>
                            Your tags: 
                            <TagChosen>
                                <TagCircle/>
                                CS
                            </TagChosen>
                        </TagChosenWrapper>
                    </TagWrapper>
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
            <PostWrapper>
                <TitleFlex>
                    Add New Post
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
                    {/* <PostHeaderType>{postType}</PostHeaderType> */}
                    <ExitButton onClick={closeModal}>X</ExitButton>
                </TitleFlex>
                {form}
            </PostWrapper>
        </div>
    );
}

export default WritePost;
