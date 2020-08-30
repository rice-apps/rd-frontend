import React, { useState, useEffect } from 'react'
import IconButton from '@material-ui/core/IconButton'
import TuneIcon from '@material-ui/icons/Tune'
import DropDownItem from './DropDownItem'
import SearchBar from "./Search"
import { GET_TAGS } from '../graphql/Queries'
import { useQuery } from '@apollo/client'

import {
  HorizontalDiv,
  DDWrapper,
  DDHeader,
  DDHeaderTitle,
  DDList,
  DDListItem,
  ArrowI
} from './Filters.styles'
import { getDefaultValues } from '@apollo/client/utilities'

const Filters = props => {
  const [isPostTypeOpen, setPostMenuOpen] = useState(false)
  const [isTagOpen, setTagOpen] = useState(false)
  const [isDateOpen, setDateOpen] = useState(false)
  const [isUpvotesOpen, setUpvotesOpen] = useState(false)

  const [postType, setPostType] = useState('')
  const [tags, setTags] = useState([])
  const [dates, setDates] = useState('')
  const [upvotes, setUpvotes] = useState('')
  const [searchActivated, setActive] = useState(false);
  const [filteredTags, setFilteredTags] = useState([])

  const POST_TYPES = ['Discussion', 'Event', 'Notice', 'Job']
  const DATES = ['yesterday', 'in the last week', 'in the last month']
  const UPVOTES = ['hot', 'cold']

  const {data, loading, error} = useQuery(GET_TAGS);

  useEffect(() => {
    setDates(props.dateFilter)
    setUpvotes(props.upvoteFilter)
    setTags(props.tagFilter)
    if (!props.firstTime) setPostType(props.kindFilter)
  }, [])

  
  if (loading) return <h1>Your tags are loading.</h1>
  if (error) return <h1>oshit(git) MY FILTERS ARE DUCKED</h1>
  
  const tag_list = data.getAllTags;
  const finalized_tags = searchActivated ? filteredTags : tag_list

  const togglePost = () => {
    setPostMenuOpen(!isPostTypeOpen)
    setTagOpen(false)
    setDateOpen(false)
    setUpvotesOpen(false)
  }

  const toggleTag = () => {
    setTagOpen(!isTagOpen)
    setPostMenuOpen(false)
    setDateOpen(false)
    setUpvotesOpen(false)
  }

  const toggleDate = () => {
    setDateOpen(!isDateOpen)
    setPostMenuOpen(false)
    setTagOpen(false)
    setUpvotesOpen(false)
  }

  const toggleUpvotes = () => {
    setUpvotesOpen(!isUpvotesOpen)
    setPostMenuOpen(false)
    setDateOpen(false)
    setTagOpen(false)
  }

  const handlePostTypeChange = newValue => {
    props.setFirstTime(false);
    const index_of_postType = postType.indexOf(newValue)
    setPostType(index_of_postType >= 0 ? '' : newValue)
  }

  const handleTagsChange = newValue => {
    const indexOfTag = tags.indexOf(newValue)
    setTags(
      indexOfTag >= 0
        ? tags.filter(tag => newValue !== tag)
        : [...tags, newValue]
    )
  }

  const handleDateChange = newValue => {
    const indexOfDate = dates.indexOf(newValue)
    setDates(indexOfDate >= 0 ? '' : newValue)
  }

  const handleUpvoteChange = newValue => {
    const indexOfUpvote = upvotes.indexOf(newValue)
    setUpvotes(indexOfUpvote >= 0 ? '' : newValue)
  }

  const submitFilters = () => {
    props.processDate(dates)

    let filterType = "";
    if (postType.length > 0 && !props.firstTime) filterType += " kind" 
    if (tags.length > 0) filterType += " tags"
    if (dates.length > 0) filterType += " date"
    if (upvotes.length > 0) filterType += " popularity"

    if (postType.length === 0) filterType = filterType.replace('kind', ''); 
    if (tags.length === 0) filterType = filterType.replace('tags', ''); 
    if (dates.length === 0) filterType = filterType.replace('date', ''); 
    if (upvotes.length === 0) filterType = filterType.replace('popularity', ''); 
    props.setTypeofFilter(filterType);
    // props.sort_by_upvotes(upvotes)
    console.log("fuck")

    props.setDateFilter(dates)
    props.setUpvoteFilter(upvotes)
    props.firstTime ? props.setKindFilter("Discussion") : props.setKindFilter(postType);
    props.setTagFilter(tags);
  }

  return (
    <>
      <SearchBar items={tag_list} setList={setFilteredTags} setActive={setActive}/>
      <HorizontalDiv>
        <DDWrapper>
          <DDHeader onClick={togglePost}>
            <DDHeaderTitle>
              {postType === '' ? 'Post Type' : postType}
              <ArrowI open={isPostTypeOpen} />
            </DDHeaderTitle>
          </DDHeader>
          {isPostTypeOpen && (
            <DDList>
              {POST_TYPES.map(item => (
                <DDListItem key={item}>
                  <DropDownItem
                    name={item}
                    setInfo={handlePostTypeChange}
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
              Tags
              <ArrowI open={isTagOpen} />
            </DDHeaderTitle>
          </DDHeader>
          {isTagOpen && (
            <DDList>
              {finalized_tags.map(item => (
                <DDListItem key={item}>
                  <DropDownItem
                    name={item}
                    setInfo={handleTagsChange}
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
              {dates === '' ? 'By Date' : dates}
              <ArrowI open={isDateOpen} />
            </DDHeaderTitle>
          </DDHeader>
          {isDateOpen && (
            <DDList>
              {DATES.map(item => (
                <DDListItem key={item}>
                  <DropDownItem
                    name={item}
                    setInfo={handleDateChange}
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
              {upvotes === '' ? 'By Popularity' : upvotes}
              <ArrowI open={isUpvotesOpen} />
            </DDHeaderTitle>
          </DDHeader>
          {isUpvotesOpen && (
            <DDList>
              {UPVOTES.map(item => (
                <DDListItem key={item}>
                  <DropDownItem
                    name={item}
                    setInfo={handleUpvoteChange}
                    selectedItems={upvotes}
                  />
                </DDListItem>
              ))}
            </DDList>
          )}
        </DDWrapper>
        <IconButton
          onClick={submitFilters}
          style={{
            background: 'white',
            borderRadius: '.8vw',
            height: '2.4vw',
            width: '2.4vw',
            marginLeft: '1vw'
          }}
        >
          <TuneIcon />
        </IconButton>
        {/* <SubmitButton onClick={submitFilters}> Filter! </SubmitButton> */}
      </HorizontalDiv>
    </>
  )
}

export default Filters
