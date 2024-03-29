import axios from 'axios';

const baseUrl = '/api';

export const getUserProfile = async () => (await axios.get(`${baseUrl}/userprofile`, { withCredentials: true })).data;

export const addContact = async (contact) => axios.put(`${baseUrl}/userprofile/contact`, { contact: { ...contact } }, { withCredentials: true });

export const updateUserProfile = async (profile) => axios.put(`${baseUrl}/userprofile`, { profile }, { withCredentials: true });
