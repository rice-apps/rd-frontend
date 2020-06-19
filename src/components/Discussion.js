import React, { useEffect } from "react";

import { DiscussionTitle, DiscussionBody } from "./Discussion.styles";

function Discussion(props) {
    useEffect(() => {
        props.subscribeToNewDiscussion();
    });

    if (props.loading) return <h1>Loading...</h1>;
    if (props.error) return <h1>Something went wrong...</h1>;

    const discussions = props.data.discussionMany.map((post, i) => {
        return (
            <div key={i}>
                <DiscussionTitle>{post.title}</DiscussionTitle>
                <div dangerouslySetInnerHTML={{__html: post.body}}/>
            </div>
        );
    });

    return <div>{discussions}</div>;
}

export default Discussion;
