import React from "react";
import { Link } from "react-router-dom";

const ProfileActions = ({ handle }) => {
  return (
    // <!-- Dashboard Actions -->
    <div className="btn-group mb-4" role="group">
      <Link to={`/profile/${handle}`} className="btn btn-light mr-1">
        <i className="fas fa-user-circle text-info mr-2" /> Profile
      </Link>
      <Link to="/edit-profile" className="btn btn-light mr-1">
        <i className="fas fa-user-circle text-info mr-2" /> Edit Profile
      </Link>
      <Link to="/add-experience" className="btn btn-light mr-1">
        <i className="fab fa-black-tie text-info mr-2" />
        Add Experience
      </Link>
      <Link to="/add-education" className="btn btn-light mr-1">
        <i className="fas fa-graduation-cap text-info mr-2" />
        Add Education
      </Link>
    </div>
  );
};

export default ProfileActions;
