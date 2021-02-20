import React, { useEffect, useState } from 'react';
import '../../styles/Button.scss';
import '../../styles/Input.scss';
import '../../styles/HomePage.scss';
import { useDispatch } from 'react-redux';
import TitleBar from '../shared/TitleBar';
import { UPDATE_LOCATION_ACTION } from '../../redux/current_location/CurrentLocaitonActions';
import CategoryCard from './CategoryCard';
import ExpandableSearchBar from '../shared/ExpandableSearchBar';
import { UPDATE_SEARCH_COORDINATES_ACTION } from '../../redux/search/searchActions';
import SearchResults from '../search/SearchResults';

const HomePage = () => {
  const [displayLocation, setDisplayLocation] = useState(null);
  const [displaySearchResults, setDisplaySearchResults] = useState(false);
  const [keyword, setKeyword] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((async (position) => {
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      dispatch(UPDATE_SEARCH_COORDINATES_ACTION({ latitude, longitude }));
      dispatch(UPDATE_LOCATION_ACTION({ latitude, longitude }));

      setDisplayLocation('Using Current Location');
    }), () => {
    });
  }, []);

  const onClickCategory = (categorySearchTerm) => {
    setKeyword(categorySearchTerm);
    setDisplaySearchResults(true);
  };

  return (
    <div id="home-page">
      <TitleBar />
      <ExpandableSearchBar
        displayLocation={displayLocation}
        onSearchTermChanges={setKeyword}
        onSearch={() => { setDisplaySearchResults(true); }}
        searchTerm={keyword}
      />
      {displaySearchResults
        ? <SearchResults keyword={keyword} />
        : (
          <section className="category-cards">
            <CategoryCard
              onClick={() => {
                onClickCategory('home maintenance');
              }}
              imageSource="https://enso-street-item-photos.s3.us-east-2.amazonaws.com/category-images/home+maintenance.png"
              name="Home Maintenance"
              categoryKey="home-maintenance"
            />
            <CategoryCard
              onClick={() => {
                onClickCategory('garden and patio');
              }}
              imageSource="https://enso-street-item-photos.s3.us-east-2.amazonaws.com/category-images/garden+and+patio+3.png"
              name="Garden & Patio"
              categoryKey="garden-and-patio"
            />
            <CategoryCard
              onClick={() => {
                onClickCategory('party and events');
              }}
              imageSource="https://enso-street-item-photos.s3.us-east-2.amazonaws.com/category-images/party+and+events.png"
              name="Party & Events"
              categoryKey="party-and-events"
            />
            <CategoryCard
              onClick={() => {
                onClickCategory('novelty electronics');
              }}
              imageSource="https://enso-street-item-photos.s3.us-east-2.amazonaws.com/category-images/novelty+electronics.png"
              name="Novelty Electronics"
              categoryKey="novelty-electronics"
            />
            <CategoryCard
              onClick={() => {
                onClickCategory('baby and kids');
              }}
              imageSource="https://enso-street-item-photos.s3.us-east-2.amazonaws.com/category-images/baby+and+kids+2.png"
              name="Baby & Kids"
              categoryKey="baby-and-kids"
            />
            <CategoryCard
              onClick={() => {
                onClickCategory('diy home improvement');
              }}
              imageSource="https://enso-street-item-photos.s3.us-east-2.amazonaws.com/category-images/DIY+home+improvement+2.png"
              name="DIY Home Improvement"
              categoryKey="diy-home-improvement"
            />
          </section>
        )}
    </div>
  );
};

export default HomePage;
