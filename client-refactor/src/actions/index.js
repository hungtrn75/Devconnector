import * as ActionTypes from "../constants/ActionTypes";
import setAuthToken from "../utils/setAuthToken";

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
export const logoutUser = () => dispatch => {
  //Remove token from localStorage
  localStorage.removeItem("jwtToken");
  //Remove auth header for future requests
  setAuthToken(false);
  //Set isAuthenticated to false and remove user
  dispatch(setCurrentUser({}));
  dispatch({ type: ActionTypes.CLEAR_CURRENT_PROFILE });
};
