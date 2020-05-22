import { combineReducers } from "redux";
import hotel from "./hotel";
import user from "./user";
import spinner from "./spinner";
import admin from "./admin";
import avatar from "./avatar";

export default combineReducers({
  user,
  hotel,
  spinner,
  admin,
  avatar,
});
