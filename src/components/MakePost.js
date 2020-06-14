import React, { useState } from "react";

import { useMutation } from "@apollo/react-hooks";

import {
    CREATE_DISCUSSION,
    CREATE_EVENT,
    CREATE_JOB,
    CREATE_NOTICE,
} from "../server/Mutations";

import { TOKEN_NAME } from "../config";

function MakePost() {
    const userInfo = JSON.parse(localStorage.getItem(TOKEN_NAME));
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [startDate, setStart] = useState(new Date().getTime());
    const [endDate, setEnd] = useState(new Date().getTime());
    const [place, setPlace] = useState("");
    const [isPaid, setPaid] = useState(false);
    const [isClosed, setClosed] = useState(false);
    const [deadline, setDeadline] = useState(new Date().getTime());
    const [postType, setPostType] = useState("Discussion");

    const [addDiscussion, { discussionData }] = useMutation(CREATE_DISCUSSION);
    const [addEvent, { eventData }] = useMutation(CREATE_EVENT);
    const [addJob, { jobData }] = useMutation(CREATE_JOB);
    const [addNotice, { noticeData }] = useMutation(CREATE_NOTICE);

    let form = <div></div>;

    switch (postType) {
        case "Discussion":
            form = (
                <form>
                    <input
                        type="text"
                        name="Post Title"
                        placeholder="Title"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        type="text"
                        name="Post Body"
                        placeholder="Content"
                        onChange={(e) => setBody(e.target.value)}
                    />
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            addDiscussion({
                                variables: {
                                    title: title,
                                    body: body,
                                    creator: userInfo.netID,
                                },
                            });
                        }}
                    >
                        Post
                    </button>
                </form>
            );
            break;
        case "Event":
            form = (
                <form>
                    <input
                        type="text"
                        name="Post Title"
                        placeholder="Title"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        type="text"
                        name="Post Body"
                        placeholder="Content"
                        onChange={(e) => setBody(e.target.value)}
                    />
                    <input
                        type="text"
                        name="Event Start Date"
                        placeholder={new Date().getUTCDay().toString()}
                        onChange={(e) => setStart(e.target.valueAsDate())}
                    />
                    <input
                        type="text"
                        name="Event End Date"
                        placeholder={new Date().getUTCDay().toString()}
                        onChange={(e) => setEnd(e.target.valueAsDate())}
                    />
                    <input
                        type="text"
                        name="Place of Event"
                        placeholder="Event Location"
                        onChange={(e) => setPlace(e.target.value)}
                    />
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            addEvent({
                                variables: {
                                    title: title,
                                    body: body,
                                    creator: userInfo.netID,
                                    start: startDate,
                                    end: endDate,
                                    place: place,
                                },
                            });
                        }}
                    >
                        Post
                    </button>
                </form>
            );
            break;
        case "Job":
            form = (
                <form>
                    <input
                        type="text"
                        name="Post Title"
                        placeholder="Title"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        type="text"
                        name="Post Body"
                        placeholder="Content"
                        onChange={(e) => setBody(e.target.value)}
                    />
                    <input
                        type="text"
                        name="Job Start Date"
                        placeholder={new Date().getUTCDate.toString()}
                        onChange={(e) => setStart(e.target.valueAsDate())}
                    />
                    <input
                        type="text"
                        name="Job End Date"
                        placeholder={new Date().getUTCDate.toString()}
                        onChange={(e) => setEnd(e.target.valueAsDate())}
                    />
                    <input
                        type="text"
                        name="Place of Job"
                        placeholder="Event Location"
                        onChange={(e) => setPlace(e.target.value)}
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
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            addJob({
                                variables: {
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
                        }}
                    >
                        Post
                    </button>
                </form>
            );
            break;
        case "Notice":
            form = (
                <form>
                    <input
                        type="text"
                        name="Post Title"
                        placeholder="Title"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        type="text"
                        name="Post Body"
                        placeholder="Content"
                        onChange={(e) => setBody(e.target.value)}
                    />
                    <input
                        type="text"
                        name="Deadline"
                        placeholder={new Date().getUTCDay().toString}
                        onChange={(e) => setDeadline(e.target.valueAsDate())}
                    />
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            addNotice({
                                variables: {
                                    title: title,
                                    body: body,
                                    creator: userInfo.netID,
                                    deadline: deadline,
                                },
                            });
                        }}
                    >
                        Post
                    </button>
                </form>
            );
            break;
        default:
            form = <div>Something went wrong! Please report to riceapps.</div>;
    }

    return (
        <div>
            <select onChange={(e) => setPostType(e.target.value)}>
                <option value="Discussion">Discussion</option>
                <option value="Notice">Notice</option>
                <option value="Event">Event</option>
                <option value="Job">Job</option>
            </select>
            {form}
        </div>
    );
}

export default MakePost;
