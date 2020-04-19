import { UPDATE_USER_PROFILE } from './UserAction';

const initialState = {
  name: '',
  firstName: null,
  lastName: null,
  phone: null,
  email: null,
  contacts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_PROFILE: {
      const profile = action.userProfile;
      return {
        name: profile.name,
        firstName: profile.firstName,
        lastName: profile.lastName,
        phone: profile.phone,
        email: profile.email,
        contacts: profile.contacts.map((contact) => ({
          id: contact.id,
          firstName: contact.firstName,
          lastName: contact.lastName,
          phone: contact.phone,
          email: contact.email,
        })),
      };
    }
    default: {
      return state;
    }
  }
};
