import React from "react";
import './styles/TitleBar.scss'
import MenuButton from "./MenuButton";
import {withRouter} from "react-router-dom";

const TitleBar = withRouter(({history}) => {

    return (
        <div className='fixed-title-bar'>
            <div id='enso-street-title' onClick={() => {history.push('/')}}>Enso Street</div>
            <MenuButton onClick={() => {
                history.push('/menu')
            }}/>
        </div>
    )
});

export default TitleBar