import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle} from "@fortawesome/free-solid-svg-icons";
import '../../../styles/Skeleton.scss';

const MyItemCardSkeleton = () => {
    return (
        <div className='my-item-card'>
            <div className='column-layout my-item-card-content'>
                <div className='my-item-card-title skeleton-row'/>
                <div className='row-layout my-item-card-content-data'>
                    <div className='skeleton-block'/>
                    <div className='column-layout'>
                        <div className='my-item-card-rental-price'>
                            <div className='skeleton-row'/>
                        </div>
                        <div>
                            <div className='skeleton-row'/>
                        </div>
                    </div>
                </div>
            </div>
            <div className='my-item-card-buttons column-layout skeleton-container'>
                <FontAwesomeIcon icon={faCircle}/>
                <FontAwesomeIcon icon={faCircle}/>
            </div>
        </div>
    )
};

export default MyItemCardSkeleton