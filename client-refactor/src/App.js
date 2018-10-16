import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "antd/dist/antd.css";

import NavBar from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import "./App.css";
import {
  NotFound,
  Landing,
  Register,
  Login,
  Profile,
  Profiles,
  EditProfile,
  CreateProfile,
  Dashboard,
  AddEducation,
  AddExperience,
  Posts,
  Post
} from "./components/loadable/Loadable";
import PrivateRoute from "./components/common/PrivateRoute";
import AlertContainer from "./components/alert";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <AlertContainer />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile/:handle" component={Profile} />
            <Switch>
              <PrivateRoute
                exact
                path="/dashboard"
                component={Dashboard}
                redirectTo="/login"
              />
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
                redirectTo="/login"
              />
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
                redirectTo="/login"
              />
              <PrivateRoute
                exact
                path="/add-education"
                component={AddEducation}
                redirectTo="/login"
              />
              <PrivateRoute
                exact
                path="/add-experience"
                component={AddExperience}
                redirectTo="/login"
              />
              <PrivateRoute
                exact
                path="/profiles"
                component={Profiles}
                redirectTo="/login"
              />
              <PrivateRoute
                exact
                path="/feed"
                component={Posts}
                redirectTo="/login"
              />
              <PrivateRoute
                exact
                path="/posts/:id"
                component={Post}
                redirectTo="/login"
              />
            </Switch>
            <Route exact path="/not-found" component={NotFound} />
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
