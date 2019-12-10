import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faCircle} from "@fortawesome/free-regular-svg-icons";
import "../../styles/ProgressBar.scss";
import {useSelector} from "react-redux";

const ProgressBar = () => {
    const firstStepDone = useSelector(state => {
        return state.postedItem.title !== '' &&
            state.postedItem.imageUrl !== null;
    });

    const secondStepDone = useSelector(state => {
        return state.postedItem.categories.length !== 0;
    });

    const thirdStepDone = useSelector(state => {
        return true;
    });

    return (
        <div>
            <div className='horizontal-layout'>
                <div>Title & Photo</div>
                <div>Details</div>
                <div>Price & Delivery</div>
            </div>
            <div id='progress-circles' className='horizontal-layout'>
                {firstStepDone ? <FontAwesomeIcon icon={faCheckCircle}/> : <span className='fa-layers fa-fw'>
                    <FontAwesomeIcon icon={faCircle}/>
                    <strong className='circle-number'>1</strong>
                </span>}
                <hr/>
                {secondStepDone ? <FontAwesomeIcon icon={faCheckCircle}/> : <span className='fa-layers fa-fw'>
                    <FontAwesomeIcon icon={faCircle}/>
                    <strong className='circle-number'>2</strong>
                </span>}
                <hr/>
                {thirdStepDone ? <FontAwesomeIcon icon={faCheckCircle}/> : <span className='fa-layers fa-fw'>
                    <FontAwesomeIcon icon={faCircle}/>
                    <strong className='circle-number'>3</strong>
                </span>}
            </div>
        </div>
    )
};

export default ProgressBar