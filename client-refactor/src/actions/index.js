import * as ActionTypes from "../constants/ActionTypes";
import * as ErrorTypes from "../constants/ErrorTypes";
import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";

//Register user
export const registerUser = (userData, history) => dispatch => {
  return axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: ErrorTypes.GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Login user - Set User token
export const loginUser = userData => dispatch => {
  return axios
    .post("/api/users/login", userData)
    .then(res => {
      const { token } = res.data;
      //Save to localStorage
      localStorage.setItem("jwtToken", token);
      //Set user token
      setAuthToken(token);
      //Decode user token
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({
        type: ErrorTypes.GET_ERRORS,
        payload: err.response.data
      });
    });
};

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
};
