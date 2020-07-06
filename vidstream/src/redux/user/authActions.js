import {
  USER_DETAILS_FETCH,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAILURE,
} from "./constants";

export const fetchUserDetails = () => {
  return {
    type: USER_LOGIN_REQUEST,
  };
};

export const fetchUserSuccess = (payload) => {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: payload,
  };
};

export const fetchUserFailure = (payload) => {
  return {
    type: USER_LOGIN_FAILURE,
    payload: payload,
  };
};
