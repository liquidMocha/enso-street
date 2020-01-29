import React from "react";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';

const NextButton = (props) => {
    return (
        <Link to={props.destination}>
            <button id='next-button'>
                Next
            </button>
        </Link>
    )
};

NextButton.propTypes = {
    destination: PropTypes.string
};

export default NextButton