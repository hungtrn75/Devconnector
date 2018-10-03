import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profile from "./profileReducer";
import postReducer from "./postReducer";
import alertsReducer from "./alertsReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile,
  post: postReducer,
  alert: alertsReducer
});
