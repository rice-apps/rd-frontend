import React from "react";
import { Helmet } from "react-helmet"

import { PostLink } from "./Home.styles";

function Home() {
    return (
        <>
            <Helmet>
                <title>RiceDiscuss &middot; Home</title>
            </Helmet>
            <PostLink to="/post">Write a post</PostLink>
            <PostLink to="/feed">Go to feed</PostLink>
        </>
    );
}

export default Home;
