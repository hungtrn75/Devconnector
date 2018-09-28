import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addEducation } from "../../actions/profileActions";

class AddEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: "",
      degree: "",
      fieldOfStydy: "",
      from: "",
      to: "",
      current: false,
      description: "",
      disabled: false,
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    const name = e.target.name;
    const value =
      e.target.type === "checkbox" ? !this.state.current : e.target.value;
    this.setState({ [name]: value });
  };

  onSubmit = e => {
    e.preventDefault();
    const expData = this.state;
    delete expData[("disabled", "errors")];
    this.props.addEducation(expData, this.props.history);
  };
  render() {
    const { errors } = this.state;
    return (
      //   <!-- Add Education -->
      <div className="section add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <a
                onClick={() => this.props.history.goBack()}
                className="btn btn-light"
              >
                Go Back
              </a>
              <h1 className="display-4 text-center">Add Your Education</h1>
              <p className="lead text-center">
                Add any school, bootcamp, etc that you have attended
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* School Or Bootcamp"
                  name="school"
                  value={this.state.school}
                  onChange={this.onChange}
                  error={errors.school}
                  required={true}
                />
                <TextFieldGroup
                  placeholder="* Degree Or Certificate"
                  name="degree"
                  value={this.state.degree}
                  onChange={this.onChange}
                  required={true}
                  error={errors.degree}
                />
                <TextFieldGroup
                  placeholder="Field Of Study"
                  name="fieldOfStydy"
                  value={this.state.fieldOfStydy}
                  onChange={this.onChange}
                />
                <h6>From Date</h6>
                <TextFieldGroup
                  type="date"
                  name="from"
                  error={errors.from}
                  value={this.state.from}
                  required={true}
                  onChange={this.onChange}
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  type="date"
                  name="to"
                  value={this.state.to}
                  onChange={this.onChange}
                  disabled={this.state.current}
                />
                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onChange}
                    id="current"
                  />
                  <label className="form-check-label" htmlFor="current">
                    Current Job
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder="Program Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  info="Tell us about your experience and what you learned"
                />
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

AddEducation.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addEducation: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { addEducation }
)(withRouter(AddEducation));
