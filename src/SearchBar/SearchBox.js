import React from "react";
import '../styles/SearchBox.scss'

const SearchBox = () => {
    return (
        <div className="search-box-container">
            <i className="fa fa-search"/>
            <input type="text" className="search-box"/>
        </div>
    );
};

export default SearchBox;