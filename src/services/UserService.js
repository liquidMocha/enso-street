import axios from 'axios';

const baseUrl = '/api';

export const isUserLoggedIn = async () => {
  try {
    const response = axios.post(
      `${baseUrl}/users/isLoggedIn`, null,
      { withCredentials: true },
    );
    return (await response).data.loggedIn;
  } catch (e) {
    return false;
  }
};

export const logout = async () => axios.get(`${baseUrl}/users/logout`, { withCredentials: true });

export const forgetPassword = async (userEmail) => axios.post(`${baseUrl}/users/forget-password`, { email: userEmail });

export const resetPassword = async (password, token) => axios.post(`${baseUrl}/users/reset-password`, { password, token });

export const connectStripeUser = async (stripeAuthorizationCode) => axios.post(`${baseUrl}/users/connect-stripe`, { stripeAuthorizationCode }, { withCredentials: true });

export const updatePassword = async (currentPassword, newPassword) => axios.post(`${baseUrl}/users/update-password`, { currentPassword, newPassword }, { withCredentials: true });
