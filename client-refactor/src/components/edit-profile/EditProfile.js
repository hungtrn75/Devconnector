import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import InputGroup from "../common/InputGroup";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      bio: "",
      githubID: "",
      youtube: "",
      facebook: "",
      twitter: "",
      linkedin: "",
      instagram: "",
      errors: {}
    };
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps && nextProps.profile.profile) {
      const { profile } = nextProps.profile;
      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: profile.skills.join(","),
        bio: profile.bio,
        githubID: profile.githubID,
        youtube: profile.social.youtube,
        instagram: profile.social.instagram,
        twitter: profile.social.twitter,
        linkedin: profile.social.linkedin,
        facebook: profile.social.facebook
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();

    let profileData = this.state;
    delete profileData[("displaySocialInputs", "errors")];
    this.props.createProfile(profileData, this.props.history);
  };
  render() {
    const options = [
      {
        lable: "* Select Professional Status",
        value: 0
      },
      {
        lable: "Developer",
        value: "Developer"
      },
      {
        lable: "Junior Developer",
        value: "Junior Developer"
      },
      {
        lable: "Senior Developer",
        value: "Senior Developer"
      },
      {
        lable: "Manager",
        value: "Manager"
      },
      {
        lable: "Student or Learning",
        value: "Student or Learning"
      },
      {
        lable: "Instructor",
        value: "Instructor"
      },
      {
        lable: "Intern",
        value: "Intern"
      },
      {
        lable: "Other",
        value: "Other"
      }
    ];
    const { errors, displaySocialInputs } = this.state;
    let socialInputs;
    if (displaySocialInputs) {
      socialInputs = (
        <React.Fragment>
          <InputGroup
            name="twitter"
            onChange={this.onChange}
            type="input"
            icon="twitter"
            placeholder="Twitter Profile URL"
            value={this.state.twitter}
            error={errors.twitter}
          />
          <InputGroup
            name="facebook"
            onChange={this.onChange}
            type="input"
            icon="facebook"
            placeholder="Facebook Page URL"
            value={this.state.facebook}
            error={errors.facebook}
          />
          <InputGroup
            name="linkedin"
            onChange={this.onChange}
            type="input"
            icon="linkedin"
            placeholder="Linkedin Profile URL"
            value={this.state.linkedin}
            error={errors.linkedin}
          />
          <InputGroup
            name="instagram"
            onChange={this.onChange}
            type="input"
            icon="instagram"
            placeholder="Instagram Page URL"
            value={this.state.instagram}
            error={errors.instagram}
          />
          <InputGroup
            name="youtube"
            onChange={this.onChange}
            type="input"
            icon="youtube"
            placeholder="Youtube Chanel URL"
            value={this.state.youtube}
            error={errors.youtube}
          />
        </React.Fragment>
      );
    }
    return (
      // <!-- Create Profile -->
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <a
                onClick={() => this.props.history.goBack()}
                className="btn btn-light"
              >
                Go Back
              </a>
              <h1 className="display-4 text-center">Edit Your Profile</h1>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  name="handle"
                  placeholder="* Profile handle"
                  info="A unique handle for your profile URL. Your full name, company name, nickname, etc (This CAN'T be changed later)"
                  onChange={this.onChange}
                  value={this.state.handle}
                  error={errors.handle}
                />
                <SelectListGroup
                  name="status"
                  onChange={this.onChange}
                  options={options}
                  info="Give us an idea of where you are at in your career"
                  value={this.state.status}
                  error={errors.status}
                />
                <TextFieldGroup
                  name="company"
                  placeholder="Company"
                  info="Could be your own company or one you work for"
                  onChange={this.onChange}
                  value={this.state.company}
                  error={errors.company}
                />
                <TextFieldGroup
                  name="website"
                  placeholder="Website"
                  info="Could be your own or a company website"
                  onChange={this.onChange}
                  value={this.state.website}
                  error={errors.website}
                />

                <TextFieldGroup
                  name="location"
                  placeholder="Location"
                  info="City & state suggested (eg. Boston, MA)"
                  onChange={this.onChange}
                  value={this.state.location}
                  error={errors.location}
                />
                <TextFieldGroup
                  name="skills"
                  placeholder="Skills"
                  info="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP)"
                  onChange={this.onChange}
                  value={this.state.skills}
                  error={errors.skills}
                />
                <TextFieldGroup
                  name="githubID"
                  placeholder="Github Username"
                  info="If you want your latest repos and a Github link, include
                  your username"
                  onChange={this.onChange}
                  value={this.state.githubID}
                  error={errors.githubID}
                />
                <TextAreaFieldGroup
                  name="bio"
                  placeholder="A short bio of yourself"
                  info="Tell us a little about yourself"
                  onChange={this.onChange}
                  value={this.state.bio}
                  error={errors.bio}
                />

                <div className="mb-3">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted ml-3">Optional</span>
                </div>

                {socialInputs}
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

EditProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(EditProfile));
