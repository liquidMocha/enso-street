import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';

const LocationInput = ({ address, chooseLocationPath, displayReassurance }) => {
  const displayLocation = () => {
    let result = '';
    if (address) {
      if (address.street) {
        result += address.street;
      }
      if (address.zipCode) {
        result += `, ${address.zipCode}`;
      }
    }

    return result;
  };

  return (
    <div id="price-and-delivery-location-container">
      <h3>Location</h3>
      <div id="price-and-delivery-location-input">
        <span>{displayLocation()}</span>
        <Link to={chooseLocationPath}>
          <FontAwesomeIcon icon={faEdit} />
        </Link>
      </div>
      {displayReassurance
        ? <span className="deemphasize">Public search will only show vague location of the item.</span>
        : null}
    </div>
  );
};

LocationInput.propTypes = {
  address: PropTypes.shape({
    street: PropTypes.string,
    zipCode: PropTypes.string,
  }),
  chooseLocationPath: PropTypes.string.isRequired,
  displayReassurance: PropTypes.bool,
};

LocationInput.defaultProps = {
  displayReassurance: true,
  address: null,
};

export default LocationInput;
