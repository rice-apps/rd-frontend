import React from "react";
import { useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";

import { GET_POST } from "../graphql/Queries";

function PostFull() {
    let { postID } = useParams();
    // console.log(postID);

    // const { ...result } = useQuery(GET_POST, {
    const { loading, error, data } = useQuery(GET_POST, {
        variables: {
            id: postID,
        },
    });

    if (loading) {
        return (<p>Loading</p>);
    }

    if (error) {
        return (<p>Error</p>);
    }

    console.log(data);
    console.log(data.postById);

    const thePost = data.postById;

    return (
        <div>
            <p>This is the full post page</p>
            {/* <p>{postID}</p> */}
            <div className="post-content">
                <h1>{thePost.title}</h1>
                <p>{thePost.body}</p>
                <p>{thePost.creator.username}</p>
                <h3>Tags:</h3>
                <ul>
                    {thePost.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
                <h3>Comments:</h3>
                <ul>
                    {thePost.comments.map((comment) => <li key={comment.id}>{comment}</li>)}
                </ul>

            </div>
        </div>
    );

    // <div>
    //     <p>This is the full post page</p>
    //     {/* <p>{postID}</p> */}
    //     <div className="post-content">
    //         <h1>{thePost.title}</h1>
    //         <p>{thePost.body}</p>
    //         <p>{thePost.creator.username}</p>
    //         <h3>Tags:</h3>
    //         <ul>
    //             {thePost.tags.map((tag) => <li key={tag}>{tag}</li>)}
    //         </ul>
    //         <h3>Comments:</h3>
    //         <ul>
    //             {thePost.comments.map((comment) => <li key={comment.id}>{comment}</li>)}
    //         </ul>

    //     </div>
    // </div>

    // POST STRUCTURE
    // _id -- unique identifier
    // date_created
    // upvotes -- array
    // downvotes -- array
    // tags -- array
    // postType
    // start (dep)
    // end (dep)
    // place (dep)
    // creator
    // title
    // body
    // __v
}

export default PostFull;
