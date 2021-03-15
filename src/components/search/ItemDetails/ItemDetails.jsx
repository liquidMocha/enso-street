import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLuggageCart, faMapMarkerAlt, faTruckPickup } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const ItemDetails = ({ distance, item }) => (
  <section className="item-detail__detail-bottom">
    <section className="item-detail__delivery-distance">
      <FontAwesomeIcon icon={faMapMarkerAlt} />
      {distance.toFixed(1)}
      {' '}
      miles
    </section>
    {item.canBeDelivered
      ? (
        <section className="item-detail__delivery-price">
          <FontAwesomeIcon icon={faLuggageCart} />
          Can be delivered: $
          {(item.deliveryStarting).toFixed(0)}
          {' '}
          (3 miles) + $
          {(item.deliveryAdditional).toFixed(0)}
          /mile
        </section>
      )
      : (
        <section>
          <FontAwesomeIcon icon={faTruckPickup} />
          {' '}
          Pickup Only
        </section>
      )}
    <div id="item-detail__description">
      <h5>Discounts applied at checkout:</h5>
      <br />
      <h5>1-3 days: Daily Rate</h5>
      <br />
      <h5>4-9 days: 15% off</h5>
      <br />
      <h5>10-20 days: 25% off</h5>
      <br />
      <h5>20+ days: 35% off</h5>
      <br />
      <h5>Description</h5>
      <p>{item.description}</p>
    </div>
  </section>

);

ItemDetails.propTypes = {
  distance: PropTypes.number,
  item: PropTypes.shape({
    canBeDelivered: PropTypes.bool,
    deliveryStarting: PropTypes.number,
    deliveryAdditional: PropTypes.number,
    description: PropTypes.string,
  }).isRequired,
};

ItemDetails.defaultProps = {
  distance: 0.0,
};

export default ItemDetails;
