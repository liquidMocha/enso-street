import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const NextButton = ({ destination }) => (
  <Link to={destination}>
    <button type="button" id="next-button">
      Next
    </button>
  </Link>
);

NextButton.propTypes = {
  destination: PropTypes.string.isRequired,
};

export default NextButton;
