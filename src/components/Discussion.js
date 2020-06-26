import React, { useEffect, useState } from "react";

import ReactHtmlParser from "react-html-parser";

import { DiscussionTitle } from "../pages/Discussion.styles";

function Discussion(props) {
    const [page, setPage] = useState(2);

    useEffect(() => {
        props.subscribeToNewDiscussions();
    });

    if (props.loading) return <h1>Loading...</h1>;
    if (props.error) return <h1>Something went wrong...</h1>;

    const discussions = props.data.postPagination.items.map((post, i) => {
        return (
            <React.Fragment key={i}>
                <DiscussionTitle>{post.title}</DiscussionTitle>
                <div>{ReactHtmlParser(post.body)}</div>
            </React.Fragment>
        );
    });

    return (
        <React.Fragment>
            {discussions}
            <button
                onClick={() => {
                    setPage(page + 1);
                    props.onLoadMore(page);
                }}
            >
                Load More
            </button>
        </React.Fragment>
    );
}

export default Discussion;
