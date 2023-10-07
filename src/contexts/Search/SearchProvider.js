import { useState } from 'react';
import SearchContext from './SearchContext';

const SearchProvider = ({ children }) => {
    const [searchValue, setSearchValue] = useState('');

    const data = { searchValue, setSearchValue };

    return (
        <SearchContext.Provider value={data}>
            {children}
        </SearchContext.Provider>
    )
}

export default SearchProvider
