import React, { useState, useEffect } from 'react'
import { useMutation, useQuery, useLazyQuery } from '@apollo/client'
import DropDownItem from './DropDownItem'
import SearchBar from "./Search"
import { GET_TAGS, FILTER_KIND, FILTER_TAGS, FILTER_DATES } from '../graphql/Queries'

import {
  HorizontalDiv,
  SubmitButton,
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

  const [tagDropDown, setTagDropDown] = useState([])

  const POST_TYPES = ['Discussion', 'Event', 'Notice', 'Job']
  const DATES = ['yesterday', 'in the last week', 'in the last month']
  const UPVOTES = ['hot', 'cold']

  const {data, loading, error} = useQuery(GET_TAGS);
  const [kindFilter, {data: kind_post_ids, loading: kind_loading, error: kind_error}] = useLazyQuery(FILTER_KIND);
  const [dateFilter, {data: date_post_ids, loading: date_loading, error: date_error}] = useLazyQuery(FILTER_DATES);
  const [tagsFilter, {data: tags_post_ids, loading: tags_loading, error: tags_error}] = useLazyQuery(FILTER_TAGS);

  useEffect(() => {
    setDates(props.dateFilter)
    setUpvotes(props.upvoteFilter)
    setTags(props.tagFilter)
    setPostType(props.kindFilter)
    setTagDropDown(props.tagList)
  }, [])

  
  if (loading) return <h1>Your tags are loading.</h1>
  if (error) return <h1>oshit(git) MY FILTERS ARE DUCKED</h1>
  console.log(data);

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
    const index_of_postType = postType.indexOf(newValue)
    setPostType(index_of_postType >= 0 ? '' : newValue)
  }

  const handleTagsChange = newValue => {
    const index_of_tag = tags.indexOf(newValue)
    setTags(
      index_of_tag >= 0
        ? tags.filter(tag => newValue !== tag)
        : [...tags, newValue]
    )
  }

  const handleDateChange = newValue => {
    const index_of_date = dates.indexOf(newValue)
    setDates(index_of_date >= 0 ? '' : newValue)
  }

  const handleUpvoteChange = newValue => {
    const index_of_upvote = upvotes.indexOf(newValue)
    setUpvotes(index_of_upvote >= 0 ? '' : newValue)
  }

  //fire the useLazyQuery
  const submitFilters = () => {
    props.processDate(dates)
    props.setDateFilter(dates)
    props.sort_by_upvotes(upvotes)
    props.setUpvoteFilter(upvotes)

    props.setKindFilter(postType)

    props.setTagFilter(tags)
    props.setTags(tags);

    kindFilter(
      
    )
    dateFilter(

    )
    tagsFilter()

  }

  return (
    <>
      <HorizontalDiv>
        <div style={{ 'margin-left': '30px' }}>Filter:</div>
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
              {data.getAllTags.map(item => (
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
        <SubmitButton onClick={submitFilters}> Filter! </SubmitButton>
      </HorizontalDiv>
    </>
  )
}

export default Filters
