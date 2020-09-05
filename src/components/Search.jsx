import React, { useState, useCallback, useEffect } from 'react'

function SearchBar ({ items, setList, setActive }) {
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
      type='text'
      placeholder='search'
      value={searchText}
      onChange={updateSearchText}
    />
  )
}

export default SearchBar
