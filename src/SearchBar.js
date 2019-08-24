import React from 'react';
import './styles/SearchBar.scss';
import MenuButton from "./MenuButton";

class SearchBar extends React.Component {
    render() {
        return (
            <div className="search-bar">
                <MenuButton/>
            </div>
        );
    }
}

export default SearchBar;