import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropType from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/index";
import { clearCurrentProfile } from "../../actions/profileActions";

class Header extends Component {
  onLogout = e => {
    e.preventDefault();
    this.props.logoutUser();
    this.props.clearCurrentProfile();
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const guestLink = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );
    const authLink = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/post-feed">
            Post Feed
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/profile">
            <img
              className="rounded-circle"
              style={{ width: "25px", marginRight: "5px" }}
              src={user.avatar}
              alt=""
              title="You must have a Gravatar connected to your email to display an image"
            />
            {user.name}
          </Link>
        </li>
        <li className="nav-item" onClick={this.onLogout}>
          <a className="nav-link">Logout</a>
        </li>
      </ul>
    );

    return (
      // <!-- Navbar -->
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            DevConnector
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/post-feed">
                  {" "}
                  Developers
                </Link>
              </li>
            </ul>

            {isAuthenticated ? authLink : guestLink}
          </div>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  auth: PropType.object.isRequired,
  logoutUser: PropType.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(Header);
