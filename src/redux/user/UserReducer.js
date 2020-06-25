import _ from 'lodash';
import {
  COMPLETE_UPDATE_PASSWORD,
  FAILED_UPDATE_PASSWORD,
  START_UPDATE_PASSWORD,
  UPDATE_USER_PROFILE,
} from './UserAction';

const initialState = {
  name: '',
  firstName: null,
  lastName: null,
  phone: null,
  email: null,
  defaultAddress: null,
  contacts: [],
  updatingPassword: false,
  updatePasswordError: false,
};

export default (state = initialState, action) => {
  const newState = _.cloneDeep(state);

  switch (action.type) {
    case UPDATE_USER_PROFILE: {
      const profile = action.userProfile;
      return {
        name: profile.name,
        firstName: profile.firstName,
        lastName: profile.lastName,
        phone: profile.phone,
        email: profile.email,
        defaultAddress: profile.defaultAddress,
        contacts: profile.contacts.map((contact) => ({
          id: contact.id,
          firstName: contact.firstName,
          lastName: contact.lastName,
          phone: contact.phone,
          email: contact.email,
        })),
      };
    }
    case START_UPDATE_PASSWORD: {
      return { ...newState, updatingPassword: true, updatePasswordError: false };
    }
    case COMPLETE_UPDATE_PASSWORD: {
      return { ...newState, updatingPassword: false, updatePasswordError: false };
    }
    case FAILED_UPDATE_PASSWORD: {
      return { ...newState, updatingPassword: false, updatePasswordError: true };
    }
    default: {
      return state;
    }
  }
};
