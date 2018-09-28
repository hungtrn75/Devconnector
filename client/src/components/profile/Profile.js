import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
//Import sub component
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileGithub from "./ProfileGithub";
import ProfileCreds from "./ProfileCreds";
import Spinner from "../common/Spinner";
//Import profile action
import { getProfileByHandle } from "../../actions/profileActions";

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }
  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;
    if (loading || profile == null) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-6">
                <Link to="/profiles" className="btn btn-light mb-3 float-left">
                  Back To Profiles
                </Link>
              </div>
              <div className="col-6" />
            </div>
            <ProfileHeader profile={profile} />
            <ProfileAbout profile={profile} />
            <ProfileCreds
              education={profile.education}
              experience={profile.experience}
            />
            <ProfileGithub />
          </div>
        </div>
      );
    }
    return <div className="profile">{profileContent}</div>;
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

Profile.propTypes = {
  profile: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(Profile);
