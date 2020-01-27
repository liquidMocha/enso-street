import React from "react";
import PropTypes from 'prop-types';
import SearchResultCard from "./SearchResultCard";
import TitleBar from "../shared/TitleBar";
import './SearchResults.scss'

const SearchResults = (props) => {
    return (
        <div>
            <TitleBar/>
            <section className='search-results'>
                {props.results.map(result => {
                    return (
                        <SearchResultCard
                            key={result.id}
                            city={result.city}
                            imageUrl={result.imageUrl}
                            title={result.title}
                            dailyRentalPrice={result.dailyRentalPrice}
                            zipCode={result.zipCode}
                        />
                    )
                })}
            </section>
        </div>
    )
};

SearchResults.propTypes = {
    results: PropTypes.array.isRequired
};

export default SearchResults