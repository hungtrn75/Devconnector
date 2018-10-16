import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavBar from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/register/auth/Register";
import Login from "./components/register/auth/LoginAntd";
import "antd/dist/antd.css";
import "./App.css";

import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/common/PrivateRoute";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import AddEducation from "./components/add-credentials/AddEducation";
import AddExperience from "./components/add-credentials/AddExperience";
import Profile from "./components/profile/Profile";
import Profiles from "./components/profiles/Profiles";
import NotFound from "./components/not-found/NotFound";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";

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
