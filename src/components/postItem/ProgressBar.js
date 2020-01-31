import React, {useContext} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faCircle} from "@fortawesome/free-regular-svg-icons";
import "./ProgressBar.scss";
import PostItemProgressContext from "./PostItemProgressContext";

const ProgressBar = () => {
    const progress = useContext(PostItemProgressContext);

    const iconTransform = 'down-1';

    return (
        <div>
            <div className='horizontal-layout'>
                <div>Title & Photo</div>
                <div>Details</div>
                <div>Price & Delivery</div>
            </div>
            <div id='progress-circles' className='horizontal-layout'>
                {progress.firstStepDone ?
                    <FontAwesomeIcon icon={faCheckCircle} size='lg' transform={iconTransform}/> :
                    <span className='fa-layers fa-fw'>
                        <FontAwesomeIcon icon={faCircle} size='lg' transform={iconTransform}/>
                        <strong className='circle-number'>1</strong>
                    </span>
                }
                <hr/>
                {progress.secondStepDone ?
                    <FontAwesomeIcon icon={faCheckCircle} size='lg' transform={iconTransform}/> :
                    <span className='fa-layers fa-fw'>
                        <FontAwesomeIcon icon={faCircle} size='lg' transform={iconTransform}/>
                        <strong className='circle-number'>2</strong>
                    </span>
                }
                <hr/>
                {progress.thirdStepDone ?
                    <FontAwesomeIcon icon={faCheckCircle} size='lg' transform={iconTransform}/> :
                    <span className='fa-layers fa-fw'>
                        <FontAwesomeIcon icon={faCircle} size='lg' transform={iconTransform}/>
                        <strong className='circle-number'>3</strong>
                    </span>
                }
            </div>
        </div>
    )
};

export default ProgressBar