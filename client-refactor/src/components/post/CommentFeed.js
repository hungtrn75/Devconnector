import React from "react";
import CommentItem from "./CommentItem";

export default ({ comments, postId }) => {
  let commentsContent;
  if (comments === null || comments.length === 0) {
    commentsContent = null;
  } else {
    commentsContent = comments.map(comment => (
      <CommentItem key={comment._id} comment={comment} postId={postId} />
    ));
  }
  return <div className="comments">{commentsContent}</div>;
};
