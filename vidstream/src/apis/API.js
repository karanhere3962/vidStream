import { useRecoilValue } from "recoil";
import { user } from "../atoms";
import axios from "axios";

export function useLoginApi(formState) {
  const userState = useRecoilValue(user);
  let { username, password } = formState;
  console.log("In api call ", userState);
  let request = axios.post("/api/login/", {
    username: username,
    password: password,
  });
  return request;
}
