import React from "react";
import '../../styles/TitleBar.scss'
import MenuButton from "./MenuButton";
import {useHistory} from "react-router-dom";

const TitleBar = () => {
    let history = useHistory();

    return (
        <div className='fixed-title-bar'>
            <div id='enso-street-title' onClick={() => {
                history.push('/')
            }}>Enso Street
            </div>
            <MenuButton onClick={() => {
                history.push('/menu')
            }}/>
        </div>
    )
};

export default TitleBar