import PropTypes from 'prop-types';
import React, {useEffect, useState} from "react";
import './CategoryCard.scss';
import CategoryService from "../../services/CategoryService";

const CategoryCard = (props) => {
    const [count, setCount] = useState(0);
    const [countDisplay, setCountDisplay] = useState('0');

    useEffect(() => {
        async function getItemCount() {
            const count = await CategoryService.getItemCountForCategory(props.categoryKey);
            setCount(count || 0);
        }

        getItemCount();
    }, []);

    useEffect(() => {
        if (count > 10) {
            setCountDisplay("10+ options")
        } else if (count > 100) {
            setCountDisplay("100+ options")
        } else if (count > 500) {
            setCountDisplay("500+ options")
        } else if (count > 1000) {
            setCountDisplay("1000+ options")
        } else {
            setCountDisplay(`${count} options`)
        }
    }, [count]);

    return (
        <figure className='category-card'>
            <img src={props.imageSource} alt={props.name}/>
            <figcaption className='category-card-texts'>
                <p>{props.name}</p>
                <hr/>
                <p>{countDisplay}</p>
            </figcaption>
        </figure>
    )
};

CategoryCard.propTypes = {
    imageSource: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    categoryKey: PropTypes.string.isRequired
};

export default CategoryCard