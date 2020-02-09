import React from 'react';
import './TitleBar.scss';
import { useHistory } from 'react-router-dom';
import { faBars, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TitleBar = () => {
  const history = useHistory();
  return (
    <div className="fixed-title-bar">
      <h1
        id="enso-street-title"
        onClick={() => {
          history.push('/');
        }}
      >
        Enso Street
      </h1>
      <div id="title-bar__right-section">
        <FontAwesomeIcon icon={faShoppingCart} />
        <FontAwesomeIcon
          icon={faBars}
          className="menu-button-container"
          onClick={() => {
            history.push('/menu');
          }}
        />
      </div>
    </div>
  );
};

export default TitleBar;
