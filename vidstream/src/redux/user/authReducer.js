import {
  USER_DETAILS_FETCH,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAILURE,
} from "./constants";

const initialState = {
  loading: false,
  userDetails: {
    isAuthenticated: false,
    authToken: "",
    profileDetails: {},
  },
  error: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userDetails: action.payload,
        error: "",
      };
    case USER_LOGIN_FAILURE:
      return {
        loading: false,
        userDetails: initialState.userDetails,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
