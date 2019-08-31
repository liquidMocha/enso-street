import React from 'react';
import '../styles/SearchBar.scss';
import MenuButton from "./MenuButton";
import SearchBox from "./SearchBox";
import Menu from "./Menu";

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showMenu: false};
    }

    render() {
        return (
            <div className="search-bar">
                <MenuButton onClick={() => {
                    this.setState({showMenu: !this.state.showMenu})
                }}/>
                <SearchBox/>
                {this.state.showMenu ? <Menu/> : null}
            </div>
        );
    }
}

export default SearchBar;