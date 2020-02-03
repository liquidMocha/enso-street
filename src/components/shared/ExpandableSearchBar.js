import React, {useRef, useState} from "react";
import InputWithIcon from "./InputWithIcon";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMapMarkerAlt, faSearch} from "@fortawesome/free-solid-svg-icons";
import LocationAutosuggest from "./LocationAutosuggest";
import SearchExpander from "../homepage/SearchExpander";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {
    UPDATE_SEARCH_ADDRESS_ACTION,
    UPDATE_SEARCH_TERM_ACTION,
    USE_ADDRESS_FOR_SEARCH_ACTION
} from "../../redux/search/searchActions";

const ExpandableSearchBar = (props) => {
    const [searchExpanded, expandSearch] = useState(false);
    const searchTermInputElement = useRef(null);

    const dispatch = useDispatch();
    const searchTerm = useSelector(state => state.searchData.searchTerm);
    const coordinates = useSelector(state => state.searchData.coordinates);
    const address = useSelector(state => state.searchData.address);
    const useAddress = useSelector(state => state.searchData.useAddress);

    const onAddressChange = (event, {suggestion}) => {
        dispatch(USE_ADDRESS_FOR_SEARCH_ACTION());
        dispatch(UPDATE_SEARCH_ADDRESS_ACTION({
            street: `${suggestion.houseNumber ? suggestion.houseNumber : ''} ${suggestion.street}`,
            city: suggestion.city,
            state: suggestion.state,
            zipCode: suggestion.zipCode
        }));
    };

    const onClickingSearch = () => {
        if (searchTerm) {
            if (useAddress) {
                props.onSearch(searchTerm, {address: `${address.street}, ${address.city}, ${address.state}, ${address.zipCode}`});
            } else {
                props.onSearch(searchTerm, coordinates);
            }
        } else {
            searchTermInputElement.current.focus();
        }
    };

    return (
        <section>
            {searchExpanded ?
                <>
                    <InputWithIcon>
                        <FontAwesomeIcon icon={faSearch}/>
                        <input type='text'
                               placeholder='Item name'
                               onChange={(event) => {
                                   dispatch(UPDATE_SEARCH_TERM_ACTION(event.target.value))
                               }}
                               ref={searchTermInputElement}
                        />
                    </InputWithIcon>
                    <InputWithIcon>
                        <FontAwesomeIcon icon={faMapMarkerAlt}/>
                        <LocationAutosuggest onAddressChange={onAddressChange} address={props.displayLocation}/>
                    </InputWithIcon>
                    <button onClick={onClickingSearch}>Search</button>
                </>
                :
                <SearchExpander expandSearch={() => {
                    expandSearch(true)
                }}/>
            }
        </section>
    )
};

ExpandableSearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
    displayLocation: PropTypes.string
};

export default ExpandableSearchBar