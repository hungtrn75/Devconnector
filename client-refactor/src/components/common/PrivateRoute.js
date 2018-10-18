import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, auth, ...rest,redirectTo }) => {
  return (
    <Route
      {...rest}
      render={props =>
        auth.isAuthenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect to={redirectTo} />
        )
      }
    />
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
  redirectTo: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps,
  null
)(PrivateRoute);
