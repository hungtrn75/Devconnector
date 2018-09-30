import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deletePost, addLike, removeLike } from "../../actions/postAction";
import PropTypes from "prop-types";
import classnames from "classnames";

class PostItem extends Component {
  onDeletePost = id => {
    this.props.deletePost(id);
  };

  onCheckUserLiked = likes => {
    if (likes.filter(like => like.user === this.props.auth.user.id).length > 0)
      return true;
    return false;
  };
  render() {
    const { post, auth, showAction } = this.props;
    return (
      // <!-- Post Item -->
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <Link to="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt={post.avatar}
              />
            </Link>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            {showAction && (
              <React.Fragment>
                <button
                  type="button"
                  className="btn btn-light mr-1"
                  onClick={() => this.props.addLike(post._id)}
                >
                  <i
                    className={classnames("fas fa-thumbs-up", {
                      "text-info": this.onCheckUserLiked(post.likes)
                    })}
                  />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button
                  type="button"
                  className="btn btn-light mr-1"
                  onClick={() => this.props.removeLike(post._id)}
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>
                <Link to={`/posts/${post._id}`} className="btn btn-info mr-1">
                  {post.comments.length} Comments
                </Link>
                {post.user === auth.user.id ? (
                  <button
                    type="button"
                    className="btn btn-danger mr-1"
                    onClick={() => this.onDeletePost(post._id)}
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showAction: true
};

const mapStateToProps = state => ({
  auth: state.auth
});

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  showAction: PropTypes.bool.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { deletePost, addLike, removeLike }
)(PostItem);
