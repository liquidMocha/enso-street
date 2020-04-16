import { UPDATE_USER_PROFILE } from './UserAction';

const initialState = {
  name: '',
  profile: {
    contacts: [],
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_PROFILE: {
      const profile = action.userProfile;
      return {
        name: profile.name,
        profile: {
          contacts: profile.contacts.map((contact) => ({
            id: contact.id,
            firstName: contact.firstName,
            lastName: contact.lastName,
            phone: contact.phone,
            email: contact.email,
          })),
        },
      };
    }
    default: {
      return state;
    }
  }
};
