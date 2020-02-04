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
                <input placeholder='Search Enso Street'
                       value={props.displayValue}
                       readOnly={true}
                />
            </InputWithIcon>
        </div>
    )
};

SearchExpander.propTypes = {
    expandSearch: PropTypes.func.isRequired,
    displayValue: PropTypes.string
};

export default SearchExpander