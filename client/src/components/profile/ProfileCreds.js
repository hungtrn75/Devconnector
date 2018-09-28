import React, { Component } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

class ProfileCreds extends Component {
  render() {
    const { education, experience } = this.props;
    const expItems = experience.map(exp => (
      <li className="list-group-item" key={exp._id}>
        <h4>{exp.company}</h4>
        <p>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
          {exp.to ? " Now" : <Moment format="YYYY/MM/DD">{exp.to}</Moment>}
        </p>
        <p>
          <strong>Position:</strong> {exp.title}
        </p>
        {exp.location && (
          <p>
            <strong>Location:</strong>
            {exp.location}
          </p>
        )}
        {exp.description && (
          <p>
            <strong>Description:</strong>
            {exp.description}
          </p>
        )}
      </li>
    ));
    const eduItems = education.map(edu => (
      <li className="list-group-item" key={edu._id}>
        <h4>{edu.school}</h4>
        <p>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
          {edu.to ? " Now" : <Moment format="YYYY/MM/DD">{edu.to}</Moment>}
        </p>
        <p>
          <strong>Degree:</strong> {edu.degree}
        </p>
        {edu.fieldOfStudy && (
          <p>
            <strong>Field of Study:</strong>
            {edu.fieldOfStudy}
          </p>
        )}
        {edu.description && (
          <p>
            <strong>Description:</strong>
            {edu.description}
          </p>
        )}
      </li>
    ));
    return (
      // <!-- Profile Creds -->
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>
          <ul className="list-group">{expItems}</ul>
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-info">Education</h3>
          <ul className="list-group">{eduItems}</ul>
        </div>
      </div>
    );
  }
}

ProfileCreds.propTypes = {
  experience: PropTypes.array.isRequired,
  education: PropTypes.array.isRequired
};

export default ProfileCreds;
