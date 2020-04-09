import React from 'react';
import PropTypes from 'prop-types';

const PersonInfo = ({ fullName, phone, email }) => (
  <div>
    <div>
      Full Name
      <span>{fullName}</span>
    </div>
    <div>
      Phone
      <span>{phone}</span>
    </div>
    <div>
      Email
      <span>{email}</span>
    </div>
  </div>
);

PersonInfo.propTypes = {
  fullName: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
};

PersonInfo.defaultProps = {
  fullName: '',
  phone: '',
  email: '',
};

export default PersonInfo;
