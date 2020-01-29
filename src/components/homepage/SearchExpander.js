import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types';
import InputWithIcon from "../shared/InputWithIcon";

const SearchExpander = (props) => {
    return (
        <div onClick={() => {
            props.expandSearch(true);
        }}>
            <InputWithIcon>
                <FontAwesomeIcon icon={faSearch}/>
                <input placeholder='Search Enso Street'/>
            </InputWithIcon>
        </div>
    )
};

SearchExpander.propTypes = {
    expandSearch: PropTypes.func.isRequired
};

export default SearchExpander