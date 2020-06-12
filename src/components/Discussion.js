import React, { useEffect } from "react";

import { DiscussionTitle } from "./Discussion.styles";

function Discussion(props) {
    useEffect(() => {
        props.subscribeToNewDiscussion();
    });

    return <DiscussionTitle>hi</DiscussionTitle>;
}

export default Discussion;
