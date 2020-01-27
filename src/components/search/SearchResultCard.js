import PropTypes from 'prop-types';
import React from "react";
import './SearchResultCard.scss';

const SearchResultCard = (props) => {
    return (
        <div>
            <section className='search-result-card-image-container'>
                <img src={props.imageUrl} alt={props.title}/>
                <div className='search-result-card-title'>{props.title}</div>
            </section>
            <div>${props.dailyRentalPrice}/day</div>
            <div>{props.city}, {props.zipCode}</div>
        </div>
    )
};

SearchResultCard.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    dailyRentalPrice: PropTypes.number.isRequired,
    city: PropTypes.string.isRequired,
    zipCode: PropTypes.string.isRequired
};

export default SearchResultCard