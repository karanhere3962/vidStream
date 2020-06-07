const signup = () => {
  return {
    type: "SIGNUP",
  };
};

const login = () => {
  console.log("login was called ");
  return {
    type: "LOGIN",
  };
};

export { signup, login };
