import React, { useState, useCallback, useEffect } from 'react';

const SearchBar = ({ items, setList }) => {
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const filtered_items = items.filter(item => 
            item.toLowerCase().includes(searchText.toLowerCase())
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