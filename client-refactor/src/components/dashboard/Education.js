import React, { Component } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteEducation } from "../../actions/profileActions";
import PropTypes from "prop-types";

class Education extends Component {
  onDelete = id => {
    this.props.deleteEducation(id);
  };
  render() {
    const education = this.props.education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
          {edu.to ? <Moment format="YYYY/MM/DD">{edu.to}</Moment> : " Now"}
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => this.onDelete(edu._id)}
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
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{education}</tbody>
        </table>
      </React.Fragment>
    );
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteEducation }
)(Education);
