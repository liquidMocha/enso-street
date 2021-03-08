import React from 'react';
import './TitleBar.scss';
import { useHistory } from 'react-router-dom';
import { faBars, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { path, pipe } from 'ramda';
import { size } from '../../redux/cart/Cart';

function navigateToCart(history) {
  history.push('/my-cart');
}

function cartWithCount(history, count) {
  return (
    <span
      className="fa-layers fa-fw"
      onClick={() => {
        navigateToCart(history);
      }}
    >
      <FontAwesomeIcon icon={faShoppingCart} />
      <span
        className="fa-layers-counter fa-layers-top-right fa-lg"
        style={{ background: 'Tomato' }}
      >
        {count}
      </span>
    </span>
  );
}

const TitleBar = () => {
  const history = useHistory();
  const count = useSelector(pipe(path(['cart', 'cart']), size));

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
        {count === 0 ? (
          <FontAwesomeIcon
            icon={faShoppingCart}
            onClick={() => {
              navigateToCart(history);
            }}
          />
        )
          : (cartWithCount(history, count))}

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
