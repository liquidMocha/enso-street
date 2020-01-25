import PropTypes from 'prop-types';
import React from "react";
import './CategoryCard.scss';

const CategoryCard = (props) => {
    return (
        <div className='category-card'>
            <img src={props.imageSource} alt={props.name}/>
            <div className='category-card-texts'>
                <p>{props.name}</p>
                <hr/>
                <p>{props.approximateItemCount}</p>
            </div>
        </div>
    )
};

CategoryCard.propTypes = {
    imageSource: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    approximateItemCount: PropTypes.string.isRequired
};

export default CategoryCard