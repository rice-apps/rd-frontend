import React from "react";

function PostFull(props) {
    return (
        <div>
            <p>This is the full post page</p>
            <p>{props.postID}</p>
        </div>
    );
}

export default PostFull;
