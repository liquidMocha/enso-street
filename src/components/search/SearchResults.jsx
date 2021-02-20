import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import SearchResultCard from './SearchResultCard';
import TitleBar from '../shared/TitleBar';
import './SearchResults.scss';
import * as SearchService from '../../services/SearchService';

const SearchResults = ({ keyword }) => {
  const coordinates = useSelector((state) => state.searchData.coordinates);
  const address = useSelector((state) => state.searchData.address);
  const useAddress = useSelector((state) => state.searchData.useAddress);

  const [results, setResults] = useState([]);

  useEffect(() => {
    let location;
    if (useAddress) {
      location = { address: `${address.street}, ${address.city}, ${address.state}, ${address.zipCode}` };
    } else {
      location = coordinates;
    }

    SearchService.search(keyword, location).then((response) => setResults(response));
  }, [keyword, useAddress, coordinates, address]);

  return (
    <div>
      <TitleBar />
      <section className="search-results">
        {results.map((result) => (
          <SearchResultCard
            key={result.id}
            id={result.id}
            city={result.city}
            imageUrl={result.imageUrl}
            title={result.title}
            dailyRentalPrice={result.dailyRentalPrice}
            zipCode={result.zipCode}
          />
        ))}
      </section>
    </div>
  );
};

SearchResults.propTypes = {
  keyword: PropTypes.string.isRequired,
};

export default SearchResults;
