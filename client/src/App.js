import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavBar from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/register/auth/Register";
import Login from "./components/register/auth/Login";
import "./App.css";

import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/common/PrivateRoute";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import AddEducation from "./components/add-credentials/AddEducation";
import AddExperience from "./components/add-credentials/AddExperience";

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
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
