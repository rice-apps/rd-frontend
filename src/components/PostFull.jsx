import React from "react";
import { useParams } from "react-router-dom";

function PostFull() {
    let { postID } = useParams();

    console.log(postID);

    return (
        <div>
            <p>This is the full post page</p>
            <p>{postID}</p>
        </div>
    );
}

export default PostFull;
