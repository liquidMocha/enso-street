import React from "react";
import './styles/TitleBar.scss'
import MenuButton from "./SearchBar/MenuButton";
import {withRouter} from "react-router-dom";

const TitleBar = withRouter(({history}) => {

    return (
        <div className='enso-street-title-bar'>
            <div id='enso-street-title' onClick={() => {history.push('/')}}>EnsoStreet</div>
            <MenuButton onClick={() => {
                history.push('/menu')
            }}/>
        </div>
    )
});

export default TitleBar