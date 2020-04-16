import React from 'react';
import PropTypes from 'prop-types';
import './PersonInfo.scss';

const PersonInfo = ({ fullName, phone, email }) => (
  <section className="person-info">
    <div>
      <label>Full Name</label>
      <span>{fullName}</span>
    </div>
    <div>
      <label>Phone</label>
      <span>{phone}</span>
    </div>
    <div>
      <label>Email</label>
      <span>{email}</span>
    </div>
  </section>
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
