import axios from "axios";

import {
  ADD_POST,
  GET_POST,
  GET_POSTS,
  POST_LOADING,
  DELETE_POST
} from "../constants/ActionTypes";
import { GET_ERRORS } from "../constants/ErrorTypes";

//Add post
export const addPost = postData => dispatch => {
  axios
    .post("/api/posts", postData)
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Add comment
export const addComment = (id, commentData) => dispatch => {
  axios
    .post(`/api/posts/comment/${id}`, commentData)
    .then(res => dispatch(getPost(id)))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Get posts
export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get("/api/posts")
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    );
};

//Get post id
export const getPost = id => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POST,
        payload: null
      })
    );
};

//Add delete post
export const deletePost = id => dispatch => {
  axios
    .delete(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_POST,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    );
};

//Add like post
export const addLike = id => dispatch => {
  axios
    .get(`/api/posts/like/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Remove like post
export const removeLike = id => dispatch => {
  axios
    .get(`/api/posts/unlike/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Remove comment id
export const deleteComment = (comment_id, post_id) => dispatch => {
  axios
    .delete(`/api/posts/${post_id}/comments/${comment_id}`)
    .then(res => dispatch(getPost(post_id)))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Set post loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};
