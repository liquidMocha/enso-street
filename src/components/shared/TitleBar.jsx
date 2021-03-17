import React, { useEffect, useState } from 'react';
import './TitleBar.scss';
import { Link, useHistory } from 'react-router-dom';
import { faBars, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { getUserProfile } from '../../services/UserProfileService';

function cartWithCount(history, count) {
  return (
    <Link
      to="/my-cart"
      className="fa-layers fa-fw"
      id="title-bar-cart-icon"
    >
      <FontAwesomeIcon icon={faShoppingCart} />
      {count !== 0
        && (
        <span
          className="fa-layers-counter fa-layers-top-right fa-lg"
          style={{ background: 'Tomato' }}
        >
          {count}
        </span>
        )}
    </Link>
  );
}

const TitleBar = () => {
  const history = useHistory();
  const count = useSelector((state) => state.cart.itemCount);

  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    getUserProfile().then((value) => setFirstName(value.firstName));
  }, []);

  return (
    <div className="fixed-title-bar">
      <Link to="/" id="enso-street-title">
        Enso Street
      </Link>
      <div id="title-bar__right-section">
        <span className="title-bar__greetings">
          Hello
          {` ${firstName}`}
        </span>
        {cartWithCount(history, count)}
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
