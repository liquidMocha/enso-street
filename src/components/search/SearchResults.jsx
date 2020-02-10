import React from 'react';
import { useSelector } from 'react-redux';
import SearchResultCard from './SearchResultCard';
import TitleBar from '../shared/TitleBar';
import './SearchResults.scss';
import ExpandableSearchBar from '../shared/ExpandableSearchBar';

const SearchResults = () => {
  const results = useSelector((state) => state.searchData.searchResults);

  return (
    <div>
      <TitleBar />
      <ExpandableSearchBar displayLocation="" />
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

export default SearchResults;
