import PropTypes from 'prop-types';
import React from 'react';
import './ItemCounter.scss';

const ItemCounter = ({ count, increment, decrement }) => (
  <div className="item-counter">
    <div onClick={decrement}>-</div>
    {count}
    <div onClick={increment}>+</div>
  </div>
);

ItemCounter.propTypes = {
  count: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
};

export default ItemCounter;
