import PropTypes from 'prop-types';
import React, {useEffect, useState} from "react";
import './CategoryCard.scss';
import CategoryService from "../../services/CategoryService";
import {useDispatch, useSelector} from "react-redux";
import {UPDATE_SEARCH_RESULTS_ACTION, UPDATE_SEARCH_TERM_ACTION} from "../../redux/search/searchActions";
import {useHistory} from "react-router-dom";
import * as SearchService from "../../services/SearchService";

const CategoryCard = (props) => {
    const [count, setCount] = useState(0);
    const [countDisplay, setCountDisplay] = useState('0');

    const coordinates = useSelector(state => state.searchData.coordinates);
    const address = useSelector(state => state.searchData.address);
    const useAddress = useSelector(state => state.searchData.useAddress);

    const dispatch = useDispatch();
    let history = useHistory();

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
        <figure className='category-card' onClick={async () => {
            dispatch(UPDATE_SEARCH_TERM_ACTION(props.categoryName));
            history.push('/search-result');
            let location = useAddress ? address : coordinates;
            const results = await SearchService.search(props.categoryName, location);
            dispatch(UPDATE_SEARCH_RESULTS_ACTION(results));
        }}>
            <img src={props.imageSource} alt={props.name}/>
            <figcaption className='category-card-texts'>
                <div>
                    <h1>{props.name}</h1>
                    <hr/>
                    <h5>{countDisplay}</h5>
                </div>
            </figcaption>
        </figure>
    )
};

CategoryCard.propTypes = {
    imageSource: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    categoryKey: PropTypes.string.isRequired,
    categoryName: PropTypes.string.isRequired
};

export default CategoryCard