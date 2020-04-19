import { addContact, getUserProfile, updateUserProfile } from '../../services/UserProfileService';

export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';

const refreshUserProfile = (userProfile) => ({
  type: UPDATE_USER_PROFILE,
  userProfile,
});

export const getUserProfileAction = () => async (dispatch) => {
  dispatch(refreshUserProfile(await getUserProfile()));
};

export const addContactAction = (contact) => async (dispatch) => {
  await addContact(contact);
  dispatch(refreshUserProfile(await getUserProfile()));
};

export const updateUserProfileAction = (profile) => async (dispatch) => {
  await updateUserProfile(profile);

  dispatch(refreshUserProfile(await getUserProfile()));
};
