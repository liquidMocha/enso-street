import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types';

const SearchExpander = (props) => {
    return (
        <div className='input-size input-field'
             id='location-opener'
             onClick={() => {
                 props.expandSearch(true);
             }}>
            <FontAwesomeIcon icon={faSearch}/>
            Search Enso Street
        </div>
    )
};

SearchExpander.propTypes = {
    expandSearch: PropTypes.func.isRequired
};

export default SearchExpander