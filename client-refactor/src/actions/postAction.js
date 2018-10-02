import {
  ADD_POST_API,
  ADD_COMENT_API,
  GET_POST_API,
  GET_POSTS_API,
  ADD_LIKE_POST_API,
  UN_LIKE_POST_API,
  DELETE_POST_API,
  DELETE_COMMENT_API
} from "../constants/ActionTypes";

export const addPost = postData => ({
  type: ADD_POST_API,
  payload: postData
});

export const addComment = (id, commentData) => ({
  type: ADD_COMENT_API,
  payload: { id, commentData }
});
//Get posts
export const getPosts = () => ({
  type: GET_POSTS_API
});

export const getPost = id => ({
  type: GET_POST_API,
  payload: id
});

//Add delete post
export const deletePost = id => ({
  type: DELETE_POST_API,
  payload: id
});

//Add like post
export const addLike = id => ({
  type: ADD_LIKE_POST_API,
  payload: id
});

//Remove like post
export const removeLike = id => ({
  type: UN_LIKE_POST_API,
  payload: id
});

//Remove comment id
export const deleteComment = (comment_id, post_id) => ({
  type: DELETE_COMMENT_API,
  payload: { comment_id, post_id }
});
