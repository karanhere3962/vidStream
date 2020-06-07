let authObj = {
  isAuthenticated: false,
  authToken: "",
};

const authenticationReducer = (state = authObj, action) => {
  switch (action.type) {
    case "SIGNUP":
      state.authToken = "";
      state.isAuthenticated = false;
      return state;

    case "LOGIN":
      state.isAuthenticated = true;
      state.authToken = "randomToken";
      return state;
    default:
      return state;
  }
};

export default authenticationReducer;
