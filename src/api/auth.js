import {
  API_URL,
  EMAIL_LOGIN_ENDPOINT,
  EMAIL_SIGNUP_ENDPOINT,
  GOOGLE_LOGIN_ENDPOINT,
  GOOGLE_SIGNUP_ENDPOINT,
  JSON_HEADERS,
} from '../constants/api';

import store from 'store';
import axios from 'axios';

import { forEach } from 'lodash/collection';

export const signup = ({ email, password }) => {
  const url = `${API_URL}${EMAIL_SIGNUP_ENDPOINT}`;

  return axios.post(url, { email, password }, { headers: {...JSON_HEADERS} });
}

export const login = ({ email, password }) => {
  const url = `${API_URL}${EMAIL_LOGIN_ENDPOINT}`;

  return axios.post(url, { email, password }, { headers: {...JSON_HEADERS} });
}

export const loginWithGoogle = (googleAuthCode) => {
  const url = `${API_URL}${GOOGLE_LOGIN_ENDPOINT}`;

  return axios.post(url, { ...googleAuthCode }, { headers: {...JSON_HEADERS} });
}

export const signupWithGoogle = (googleAuthCode, inviteNonce) => {
  const url = `${API_URL}${GOOGLE_SIGNUP_ENDPOINT}`;

  return axios.post(url, { ...googleAuthCode }, { headers: {...JSON_HEADERS} });
};

export const logout = () => {
  const keysToRemove = [
    'accessToken',
    'refreshToken',
    'userId',
    'userInfo',
  ];

  forEach(keysToRemove, key => store.remove(key));
};
