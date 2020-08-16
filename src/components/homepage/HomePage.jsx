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

const HomePage = () => {
  const [displayLocation, setDisplayLocation] = useState(null);

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

  return (
    <div id="home-page">
      <TitleBar />
      <ExpandableSearchBar displayLocation={displayLocation} />
      <section className="category-cards">
        <CategoryCard
          imageSource="https://enso-street-item-photos.s3.us-east-2.amazonaws.com/category-images/home+maintenance.png"
          name="Home Maintenance"
          categoryKey="home-maintenance"
          categoryName="home maintenance"
        />
        <CategoryCard
          imageSource="https://enso-street-item-photos.s3.us-east-2.amazonaws.com/category-images/garden+and+patio+3.png"
          name="Garden & Patio"
          categoryKey="garden-and-patio"
          categoryName="garden and patio"
        />
        <CategoryCard
          imageSource="https://enso-street-item-photos.s3.us-east-2.amazonaws.com/category-images/party+and+events.png"
          name="Party & Events"
          categoryKey="party-and-events"
          categoryName="party and events"
        />
        <CategoryCard
          imageSource="https://enso-street-item-photos.s3.us-east-2.amazonaws.com/category-images/novelty+electronics.png"
          name="Novelty Electronics"
          categoryKey="novelty-electronics"
          categoryName="novelty electronics"
        />
        <CategoryCard
          imageSource="https://enso-street-item-photos.s3.us-east-2.amazonaws.com/category-images/baby+and+kids+2.png"
          name="Baby & Kids"
          categoryKey="baby-and-kids"
          categoryName="baby and kids"
        />
        <CategoryCard
          imageSource="https://enso-street-item-photos.s3.us-east-2.amazonaws.com/category-images/DIY+home+improvement+2.png"
          name="DIY Home Improvement"
          categoryKey="diy-home-improvement"
          categoryName="diy home improvement"
        />
      </section>
    </div>
  );
};

export default HomePage;
