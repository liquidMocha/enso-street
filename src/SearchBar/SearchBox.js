import React from "react";
import '../styles/SearchBox.scss'

class SearchBox extends React.Component {
    render() {
        return (
            <div className="search-box-container">
                <i className="fa fa-search"/>
                <input type="text" className="search-box"/>
            </div>
        );
    }
}

export default SearchBox;