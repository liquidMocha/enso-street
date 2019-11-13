import React from "react";
import {Link} from "react-router-dom";

const NextButton = (props) => {
    return (
        <Link to={props.destination}>
            <button id='next-button' className='home-page-button'>
                Next
            </button>
        </Link>
    )
};

export default NextButton