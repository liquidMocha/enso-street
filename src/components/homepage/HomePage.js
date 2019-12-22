import React, {useState} from "react";
import '../../styles/Button.scss';
import '../../styles/Input.scss';
import '../../styles/HomePage.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMapMarkerAlt, faSearch} from '@fortawesome/free-solid-svg-icons';
import '../../styles/Sizing.scss';
import TitleBar from "../shared/TitleBar";

const HomePage = () => {

    const [searchExpanded, expandSearch] = useState(false);

    return (
        <div>
            <TitleBar/>
            <div>
                {searchExpanded ?
                    <>
                        <div className='input-size input-field'
                             id='location-opener'
                             onClick={() => {
                             }}>
                            <FontAwesomeIcon icon={faSearch}/>
                            Item name
                        </div>
                        <div className='input-size input-field'
                             id='location-opener'
                             onClick={() => {
                             }}>
                            <FontAwesomeIcon icon={faMapMarkerAlt}/>
                            Add location
                        </div>
                        <button id='home-page-search-button'>Search</button>
                    </>
                    :
                    <div className='input-size input-field'
                         id='location-opener'
                         onClick={() => {
                             expandSearch(true);
                         }}>
                        <FontAwesomeIcon icon={faSearch}/>
                        Search Enso Street
                    </div>
                }
            </div>
        </div>
    )
};

export default HomePage;