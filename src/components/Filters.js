import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
<<<<<<< HEAD
import DropDownItem from "./DropDownItem.js";

import {
=======
import DropDownItem from "./DropDownItem";

import {
    HorizontalDiv,
>>>>>>> 70cdd1bfe2bb3643bb3df8b9425419b57e0fcfea
    SubmitButton,
    DDWrapper,
    DDHeader,
    DDHeaderTitle,
    DDList,
    DDListItem,
    ArrowI,
<<<<<<< HEAD
} from "./MoreInfo.styles";
=======
} from "./Filters.styles";
>>>>>>> 70cdd1bfe2bb3643bb3df8b9425419b57e0fcfea

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
<<<<<<< HEAD
    const DATES = ["One day ago", "One week ago"];
    const UPVOTES = ["By greatest", "by least"];
    // on mount we want to render without any filters

    const togglePost = () => setPostMenuOpen(!isPostTypeOpen);
    const toggleTag = () => setTagOpen(!isTagOpen);
    const toggleDate = () => setDateOpen(!isDateOpen);
    const toggleUpvotes = () => setUpvotesOpen(!isUpvotesOpen);
=======
    const DATES = ["yesterday", "in the last week", "in the last month"];
    const UPVOTES = ["most", "least"];
    // on mount we want to render without any filters

    const togglePost = () => {
        setPostMenuOpen(!isPostTypeOpen);
        setTagOpen(false);
        setDateOpen(false);
        setUpvotesOpen(false);
    }

    const toggleTag = () => {
        setTagOpen(!isTagOpen);
        setPostMenuOpen(false);
        setDateOpen(false);
        setUpvotesOpen(false);
    }

    const toggleDate = () => {
        setDateOpen(!isDateOpen);
        setPostMenuOpen(false);
        setTagOpen(false);
        setUpvotesOpen(false);
    }

    const toggleUpvotes = () => {
        setUpvotesOpen(!isUpvotesOpen);
        setPostMenuOpen(false);
        setDateOpen(false);
        setTagOpen(false);
    }
>>>>>>> 70cdd1bfe2bb3643bb3df8b9425419b57e0fcfea

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
<<<<<<< HEAD
=======
        <HorizontalDiv>
        <div style={{"margin-left": "30px"}}>Filter:</div>
>>>>>>> 70cdd1bfe2bb3643bb3df8b9425419b57e0fcfea
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
<<<<<<< HEAD
=======
        </HorizontalDiv>
>>>>>>> 70cdd1bfe2bb3643bb3df8b9425419b57e0fcfea
        </>

    );
}

export default Filters;