import React from 'react';
import './styles/SearchBar.scss';
import MenuButton from "./MenuButton";
import SearchBox from "./SearchBox";

class SearchBar extends React.Component {
    render() {
        return (
            <div className="search-bar">
                <MenuButton/>
                <SearchBox/>
            </div>
        );
    }
}

export default SearchBar;