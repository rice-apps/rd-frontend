import React, { useState, useCallback, useEffect } from 'react';

const SearchBar = ({ items, setList, setActive }) => {
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        if (searchText.length === 0) setActive(false);
        else setActive(true);

        let filtered_items = items.filter(item => 
            item.toLowerCase().includes(searchText.toLowerCase().trim())
        );

        if (filtered_items.length === 0){ filtered_items = ["No results for the search"]}
        setList(filtered_items);
    }, [searchText]);

    const updateSearchText = useCallback(e => {
        setSearchText(e.target.value);
    }, []);

    return (
        <input 
            type = 'text'
            placeholder = 'search'
            value={searchText}
            onChange={updateSearchText}
        />
    );

}

export default SearchBar