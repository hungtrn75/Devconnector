import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteComment } from "../../actions/postAction";
import PropTypes from "prop-types";

class CommentItem extends Component {
  render() {
    const { comment, auth, postId } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={comment.user.avatar}
                alt={comment.user.avatar}
              />
            </a>
            <br />
            <p className="text-center">{comment.user.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{comment.text}</p>
            {comment.user._id === auth.user.id ? (
              <button
                className="btn btn-danger mr-1"
                type="button"
                onClick={() => this.props.deleteComment(comment._id, postId)}
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
