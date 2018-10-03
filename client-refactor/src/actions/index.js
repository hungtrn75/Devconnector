import * as ActionTypes from "../constants/ActionTypes";
import { REMOVE_ALERT } from "../constants/AlertActions";

//Register user
export const registerUser = (userData, history) => ({
  type: ActionTypes.REGISTER_USER,
  payload: { userData, history }
});

//Login user - Set User token
export const loginUser = userData => ({
  type: ActionTypes.LOGIN_USER,
  payload: userData
});

//Set current user
export const setCurrentUser = decoded => {
  return {
    type: ActionTypes.SET_CURRENT_USER,
    payload: decoded
  };
};

//Logout user
export const logoutUser = () => ({
  type: ActionTypes.LOGOUT_USER
});

//Remove Alert
export const removeAlert = () => ({
  type: REMOVE_ALERT
});
