import { addContact, getUserProfile } from '../../services/UserProfileService';

export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';

const updateUserProfileAction = (userProfile) => ({
  type: UPDATE_USER_PROFILE,
  userProfile,
});

export const getUserProfileAction = () => async (dispatch) => {
  dispatch(updateUserProfileAction(await getUserProfile()));
};

export const addContactAction = (contact) => async (dispatch) => {
  await addContact(contact);
  dispatch(updateUserProfileAction(await getUserProfile()));
};
