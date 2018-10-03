import setAuthToken from "../utils/setAuthToken";
import store from "../helpers/store";
import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUser } from "../actions/index";

const isAuthenticated = () => {
  //Check token
  if (localStorage.jwtToken) {
    //Decode token
    const decoded = jwt_decode(localStorage.jwtToken);
    //Set auth token header
    setAuthToken(localStorage.jwtToken);
    //Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));

    //Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      //logout user
      store.dispatch(logoutUser());
      //redirect to login
      window.location.href = "/login";
    }
  }
};

export default isAuthenticated;
