import React, {useEffect, useState} from "react";
import * as SearchService from "../../services/SearchService";

const SearchResults = (props) => {
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const coordinates = props.location.state.coordinates;
        const address = props.location.state.address;
        const searchLocation = coordinates ? {
            latitude: coordinates.latitude,
            longitude: coordinates.longitude
        } : {address};

        SearchService.search('', searchLocation)
            .then(searchResults => {
                setSearchResults(searchResults);
            });
    }, [props.location.state]);

    return (
        <div>
            {searchResults.map(result => {
                return (
                    <div>
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

export default SearchResults