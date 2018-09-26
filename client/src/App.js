import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import setAuthToken from "./utils/setAuthToken";
import store from "./store";
import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUser } from "./actions/index";

import NavBar from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/register/auth/Register";
import Login from "./components/register/auth/Login";

import "./App.css";

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

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
