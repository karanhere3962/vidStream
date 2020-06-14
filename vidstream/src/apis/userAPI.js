import { store } from "../redux/store";
import {} from "./apiPaths"
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
