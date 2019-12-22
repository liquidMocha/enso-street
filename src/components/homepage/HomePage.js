import React, {useState} from "react";
import '../../styles/Button.scss';
import '../../styles/Input.scss';
import '../../styles/HomePage.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMapMarkerAlt, faSearch} from '@fortawesome/free-solid-svg-icons';
import '../../styles/Sizing.scss';
import TitleBar from "../shared/TitleBar";
import {useSpring, animated} from 'react-spring';

const HomePage = () => {
    const [searchExpanded, expandSearch] = useState(false);
    const expandingInputAnimation = useSpring({
        height: searchExpanded ? '15px' : '0px',
        overflow: 'hidden'
    });

    return (
        <div>
            <TitleBar/>
            <div>
                {searchExpanded ?
                    <>
                        <animated.div style={expandingInputAnimation} className='input-field'
                                      id='location-opener'
                                      onClick={() => {
                                      }}>
                            <FontAwesomeIcon icon={faSearch}/>
                            Item name
                        </animated.div>
                        <animated.div style={expandingInputAnimation} className='input-field'
                                      id='location-opener'
                                      onClick={() => {
                                      }}>
                            <FontAwesomeIcon icon={faMapMarkerAlt}/>
                            Add location
                        </animated.div>
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

export default animated(HomePage);