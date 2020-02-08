import PropTypes from 'prop-types';
import React from "react";
import './SearchResultCard.scss';
import {useHistory} from "react-router-dom";

const SearchResultCard = (props) => {
    let history = useHistory();

    return (
        <div className='search-result-card' onClick={() => {
            history.push(`/item-detail/${props.id}`);
        }}>
            <section className='search-result-card-image-container'>
                <figure>
                    <img src={props.imageUrl} alt={props.title}/>
                </figure>
                <h5 className='search-result-card-title'>{props.title}</h5>
            </section>
            <section className='search-result-card__details'>
                <div>${props.dailyRentalPrice}/day</div>
                <div className='search-result-card__details-location'>{props.city}, {props.zipCode}</div>
            </section>
        </div>
    )
};

SearchResultCard.propTypes = {
    id: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    dailyRentalPrice: PropTypes.number.isRequired,
    city: PropTypes.string.isRequired,
    zipCode: PropTypes.string.isRequired
};

export default SearchResultCard