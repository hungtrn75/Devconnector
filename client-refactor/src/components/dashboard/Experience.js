import React, { Component } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteExperience } from "../../actions/profileActions";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

class Experience extends Component {
  onDelete = id => {
    this.props.deleteExperience(id, this.props.history);
  };
  render() {
    const experience = this.props.experience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
          {exp.to ? <Moment format="YYYY/MM/DD">{exp.to}</Moment> : " Now"}
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => this.onDelete(exp._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <React.Fragment>
        <h4 className="mb-2">Experience Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{experience}</tbody>
        </table>
      </React.Fragment>
    );
  }
}

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteExperience }
)(withRouter(Experience));
