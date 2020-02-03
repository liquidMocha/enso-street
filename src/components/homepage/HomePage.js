import React, {useEffect, useState} from "react";
import '../../styles/Button.scss';
import '../../styles/Input.scss';
import '../../styles/HomePage.scss';
import TitleBar from "../shared/TitleBar";
import {reverseGeocode} from "../../services/LocationService";
import {useDispatch} from "react-redux";
import {UPDATE_LOCATION_ACTION} from "../../redux/current_location/CurrentLocaitonActions";
import CategoryCard from "./CategoryCard";
import ExpandableSearchBar from "../shared/ExpandableSearchBar";
import {UPDATE_SEARCH_COORDINATES_ACTION} from "../../redux/search/searchActions";

const HomePage = () => {
    const [displayLocation, setDisplayLocation] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((async position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            dispatch(UPDATE_SEARCH_COORDINATES_ACTION({latitude, longitude}));
            dispatch(UPDATE_LOCATION_ACTION({latitude, longitude}));

            const locationLabel = await reverseGeocode({latitude, longitude});
            setDisplayLocation(locationLabel);
        }), () => {
        })
    }, []);

    return (
        <div id='home-page'>
            <TitleBar/>
            <ExpandableSearchBar displayLocation={displayLocation}/>
            <section className='category-cards'>
                <CategoryCard
                    imageSource='https://enso-street-item-photos.s3.us-east-2.amazonaws.com/category-images/home+maintenance.JPG'
                    name='Home Maintenance'
                    categoryKey='home-maintenance'
                />
                <CategoryCard
                    imageSource='https://enso-street-item-photos.s3.us-east-2.amazonaws.com/category-images/garden+and+patio+3.JPG'
                    name='Garden & Patio'
                    categoryKey='garden-and-patio'
                />
                <CategoryCard
                    imageSource='https://enso-street-item-photos.s3.us-east-2.amazonaws.com/category-images/party+and+events.jpg'
                    name='Party & Events'
                    categoryKey='party-and-events'
                />
                <CategoryCard
                    imageSource='https://enso-street-item-photos.s3.us-east-2.amazonaws.com/category-images/novelty+electronics.JPG'
                    name='Novelty Electronics'
                    categoryKey='novelty-electronics'
                />
                <CategoryCard
                    imageSource='https://enso-street-item-photos.s3.us-east-2.amazonaws.com/category-images/baby+and+kids+2.jpg'
                    name='Baby & Kids'
                    categoryKey='baby-and-kids'
                />
                <CategoryCard
                    imageSource='https://enso-street-item-photos.s3.us-east-2.amazonaws.com/category-images/DIY+home+improvement+2.jpg'
                    name='DIY Home Improvement'
                    categoryKey='diy-home-improvement'
                />
            </section>
        </div>
    )
};

export default HomePage;