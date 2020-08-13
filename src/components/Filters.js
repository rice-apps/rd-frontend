import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import DropDownItem from "./DropDownItem.js";

import {
    SubmitButton,
    DDWrapper,
    DDHeader,
    DDHeaderTitle,
    DDList,
    DDListItem,
    ArrowI,
} from "./MoreInfo.styles";

const Filters = () => {
    const [isPostTypeOpen, setPostMenuOpen] = useState(false);
    const [isTagOpen, setTagOpen] = useState(false);
    const [isDateOpen, setDateOpen] = useState(false);
    const [isUpvotesOpen, setUpvotesOpen] = useState(false);

    const [postType, setPostType] = useState([]);
    const [tags, setTags] = useState([]);
    const [dates, setDates] = useState([]);
    const [upvotes, setUpvotes] = useState([]);

    const POST_TYPES = ["Discussion", "Event", "Notice", "Job"];
    const TAGS = ["Going", "to", "query", "the", "tags"];
    const DATES = ["One day ago", "One week ago"];
    const UPVOTES = ["By greatest", "by least"];
    // on mount we want to render without any filters

    const togglePost = () => setPostMenuOpen(!isPostTypeOpen);
    const toggleTag = () => setTagOpen(!isTagOpen);
    const toggleDate = () => setDateOpen(!isDateOpen);
    const toggleUpvotes = () => setUpvotesOpen(!isUpvotesOpen);

    const handlePostTypeChange = (newValue) => {
        const index_of_postType = postType.indexOf(newValue);
        setPostType(index_of_postType >= 0 ? "" : newValue);
    };

    const handleTagsChange = (newValue) => {
        const index_of_tags = tags.indexOf(newValue);
        setPostType(index_of_tags >= 0 ? "" : newValue);
    };

    const handleDateChange = (newValue) => {
        const index_of_date = dates.indexOf(newValue);
        setPostType(index_of_date >= 0 ? "" : newValue);
    };

    const handleUpvoteChange = newValue => {
        const index_of_upvote = dates.indexOf(newValue);
        setPostType(index_of_upvote >= 0 ? "" : newValue);
    }

    const submitFilters = () => {
        // send up to post feed
    }

    return(
        <>
        <DDWrapper>
            <DDHeader onClick={togglePost}>
                <DDHeaderTitle>
                    {postType === "" ? "Post Type" : postType}
                    <ArrowI open={isPostTypeOpen} />
                </DDHeaderTitle>
            </DDHeader>
            {isPostTypeOpen && (
                <DDList>
                    {POST_TYPES.map((item) => (
                        <DDListItem key={item}>
                            <DropDownItem
                                name={item}
                                setInfo={
                                    handlePostTypeChange
                                }
                                selectedItems={postType}
                            />
                        </DDListItem>
                    ))}
                </DDList>
            )}
        </DDWrapper>

        <DDWrapper>
            <DDHeader onClick={toggleTag}>
                <DDHeaderTitle>
                    {tags === "" ? "Tags" : tags}
                    <ArrowI open={isTagOpen} />
                </DDHeaderTitle>
            </DDHeader>
            {isTagOpen && (
                <DDList>
                    {TAGS.map((item) => (
                        <DDListItem key={item}>
                            <DropDownItem
                                name={item}
                                setInfo={
                                    handleTagsChange
                                }
                                selectedItems={tags}
                            />
                        </DDListItem>
                    ))}
                </DDList>
            )}
        </DDWrapper>

        <DDWrapper>
            <DDHeader onClick={toggleDate}>
                <DDHeaderTitle>
                    {dates === "" ? "By Date" : dates}
                    <ArrowI open={isDateOpen} />
                </DDHeaderTitle>
            </DDHeader>
            {isDateOpen && (
                <DDList>
                    {DATES.map((item) => (
                        <DDListItem key={item}>
                            <DropDownItem
                                name={item}
                                setInfo={
                                    handleDateChange
                                }
                                selectedItems={dates}
                            />
                        </DDListItem>
                    ))}
                </DDList>
            )}
        </DDWrapper>

        <DDWrapper>
            <DDHeader onClick={toggleUpvotes}>
                <DDHeaderTitle>
                    {upvotes === "" ? "Upvotes" : upvotes}
                    <ArrowI open={isUpvotesOpen} />
                </DDHeaderTitle>
            </DDHeader>
            {isUpvotesOpen && (
                <DDList>
                    {UPVOTES.map((item) => (
                        <DDListItem key={item}>
                            <DropDownItem
                                name={item}
                                setInfo={
                                    handleUpvoteChange
                                }
                                selectedItems={upvotes}
                            />
                        </DDListItem>
                    ))}
                </DDList>
            )}
        </DDWrapper>
        <SubmitButton onClick={submitFilters}> Filter! </SubmitButton>
        </>

    );
}

export default Filters;