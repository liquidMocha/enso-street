import PropTypes from 'prop-types';
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import {useHistory} from "react-router-dom";

const PostItemTitleBar = (props) => {
    let history = useHistory();

    return (
        <div className='fixed-title-bar'>
            {props.hideBackButton ? <span/> :
                <span onClick={() => {
                    history.push(props.backLink)
                }}>
                <FontAwesomeIcon icon={faAngleLeft}/>
            </span>
            }
            <h1>{props.title}</h1>
            {props.renderRightItem ?
                props.renderRightItem() :
                <h3 className='fixed-title-bar__right-element'
                    onClick={() => {
                        history.push('/')
                    }}>
                    Cancel
                </h3>
            }
        </div>
    )
};

PostItemTitleBar.propTypes = {
    hideBackButton: PropTypes.bool,
    backLink: PropTypes.string,
    title: PropTypes.string.isRequired,
    renderRightItem: PropTypes.func
};

export default PostItemTitleBar;