import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ColoredButton from '../shared/ColoredButton';

const NextButton = ({ destination, disabled }) => (
  <Link to={destination}>
    <ColoredButton buttonText="Next" id="next-button" mode="dark" disabled={disabled} />
  </Link>
);

NextButton.propTypes = {
  destination: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

NextButton.defaultProps = {
  disabled: false,
};

export default NextButton;
