import React from "react";
import { useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";

import { GET_POST } from "../graphql/Queries";

function PostFull() {
    let { postID } = useParams();
    console.log(postID);

    const { ...result } = useQuery(GET_POST, {
        // const { loading, error, data } = useQuery(GET_POST, {
        variables: {
            _id: postID,
        },
    });

    console.log(result);

    return (
        <div>
            <p>This is the full post page</p>
            <p>{postID}</p>
            {/* <p>{data}</p> */}
        </div>
    );
}

export default PostFull;
