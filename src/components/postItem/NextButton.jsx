import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ColoredButton from '../shared/ColoredButton';

const NextButton = ({ destination }) => (
  <Link to={destination}>
    <ColoredButton buttonText="Next" id="next-button" mode="dark" />
  </Link>
);

NextButton.propTypes = {
  destination: PropTypes.string.isRequired,
};

export default NextButton;
