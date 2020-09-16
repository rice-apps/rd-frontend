import React, { useState, useCallback, useEffect } from 'react'
import {Search} from "./Search.styles"


function SearchBar ({ items, setList, setActive, style }) {
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    if (searchText.length === 0) setActive(false)
    else setActive(true)

    let filteredItems = items.filter(item =>
      item.toLowerCase().includes(searchText.toLowerCase().trim())
    )

    if (filteredItems.length === 0) {
      filteredItems = ['No results for the search']
    }
    setList(filteredItems)
  }, [searchText])

  const updateSearchText = useCallback(e => {
    setSearchText(e.target.value)
  }, [])

  return (
    <input
      style={style}
      type='text'
      placeholder={placeholder}
      value={searchText}
      onChange={updateSearchText}
    />
  )
}

export default SearchBar
