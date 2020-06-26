import React from "react";

import { GoToPost, PostLink } from "./Home.styles";

function Home() {
    return (
        <GoToPost>
            <PostLink to="/post" />
        </GoToPost>
    );
}

export default Home;
