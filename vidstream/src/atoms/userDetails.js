import { atom } from "recoil";

export const user = atom({
  key: "userAtom",
  default: {
    isAuthenticated: false,
    authToken: "",
    userDetails: {
      username: "",
      email: "",
      date_joined: "",
      last_login: "",
      profile_pic: "",
      gender: "",
      id: "",
    },
  },
});
