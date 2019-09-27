import React, {useState} from 'react';
import '../styles/SearchBar.scss';
import MenuButton from "./MenuButton";
import SearchBox from "./SearchBox";
import Menu from "./Menu";

const SearchBar = () => {
    const [showMenu, toggleMenu] = useState(false);

    return (
        <div className="search-bar">
            <MenuButton onClick={() => {toggleMenu(!showMenu)}}/>
            <SearchBox/>
            {showMenu ? <Menu/> : null}
        </div>
    );
};

export default SearchBar;