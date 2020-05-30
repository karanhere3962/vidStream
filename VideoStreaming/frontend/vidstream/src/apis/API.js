import axios from "axios";
import { stateManager } from "../kStateManager";

const baseUrl = "/api/";
const API = axios.create({
  baseURL: "/api/",
});
let header = {};

