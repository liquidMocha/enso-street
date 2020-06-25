import { addContact, getUserProfile, updateUserProfile } from '../../services/UserProfileService';
import { updatePassword } from '../../services/UserService';

export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';
export const START_UPDATE_PASSWORD = 'START_UPDATE_PASSWORD';
export const COMPLETE_UPDATE_PASSWORD = 'COMPLETE_UPDATE_PASSWORD';
export const FAILED_UPDATE_PASSWORD = 'FAILED_UPDATE_PASSWORD';

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

const startUpdatePasswordAction = () => ({
  type: START_UPDATE_PASSWORD,
});

const completeUpdatePasswordAction = (result) => ({
  type: COMPLETE_UPDATE_PASSWORD,
  result,
});

const failedToUpdatePassword = () => ({
  type: FAILED_UPDATE_PASSWORD,
});

export const updatePasswordAction = (currentPassword, newPassword) => async (dispatch) => {
  dispatch(startUpdatePasswordAction());

  let response;
  try {
    response = await updatePassword(currentPassword, newPassword);
    dispatch(completeUpdatePasswordAction(response));
  } catch (e) {
    dispatch(failedToUpdatePassword());
  }
};
