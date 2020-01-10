import React from "react";
import PropTypes from 'prop-types';

const SearchResults = (props) => {
    return (
        <div>
            {props.results.map(result => {
                return (
                    <div key={result.id}>
                        title: {result.title},
                        ${result.rentaldailyprice}/day,
                        zip code: {result.zipcode},
                        city: {result.city}
                    </div>
                )
            })}
        </div>
    )
};

SearchResults.propTypes = {
    results: PropTypes.array.isRequired
};

export default SearchResults