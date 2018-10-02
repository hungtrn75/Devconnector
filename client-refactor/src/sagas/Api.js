import axios from "axios";

function addPostApi(postData) {
  return axios.request({
    url: "/api/posts",
    method: "post",
    data: postData
  });
}
function addCommentApi(id, commentData) {
  return axios.request({
    url: `/api/posts/comment/${id}`,
    method: "post",
    data: commentData
  });
}
function getPostsApi() {
  return axios.request({
    url: "/api/posts",
    method: "get"
  });
}

function getPostApi(id) {
  return axios.request({
    url: `/api/posts/${id}`,
    method: "get"
  });
}

function deletePostApi(id) {
  return axios.request({
    url: `/api/posts/${id}`,
    method: "delete"
  });
}
function addLikeApi(id) {
  return axios.request({
    url: `/api/posts/like/${id}`,
    method: "get"
  });
}
function removeLikeApi(id) {
  return axios.request({
    url: `/api/posts/unlike/${id}`,
    method: "get"
  });
}
function deleteCommentApi(comment_id, post_id) {
  return axios.request({
    url: `/api/posts/${post_id}/comments/${comment_id}`,
    method: "delete"
  });
}

function registerUserApi(userData) {
  return axios.request({
    url: "/api/users/register",
    method: "post",
    data: userData
  });
}

function loginUserApi(userData) {
  return axios.request({
    url: "/api/users/login",
    method: "post",
    data: userData
  });
}
//PROFILE
function getCurrentProfileApi() {
  return axios.request({
    url: "/api/profile",
    method: "get"
  });
}

function getProfilesApi() {
  return axios.request({
    url: "/api/profile/all",
    method: "get"
  });
}

function getProfileByHandleApi(handle) {
  return axios.request({
    url: `/api/profile/handle/${handle}`,
    method: "get"
  });
}

function createProfileApi(profileData) {
  return axios.request({
    url: `/api/profile`,
    method: "post",
    data: profileData
  });
}

function addExperienceApi(expData) {
  return axios.request({
    url: `/api/profile/experience`,
    method: "post",
    data: expData
  });
}

function addEducationApi(eduData) {
  return axios.request({
    url: `/api/profile/education`,
    method: "post",
    data: eduData
  });
}

function deleteExperienceApi(id) {
  return axios.request({
    url: `/api/profile/experience/${id}`,
    method: "delete"
  });
}

function deleteEducationApi(id) {
  return axios.request({
    url: `/api/profile/education/${id}`,
    method: "delete"
  });
}

function deleteAccountApi() {
  return axios.request({
    url: `/api/profile`,
    method: "delete"
  });
}

export const Api = {
  addPostApi,
  addCommentApi,
  getPostApi,
  getPostsApi,
  deleteCommentApi,
  deletePostApi,
  addLikeApi,
  removeLikeApi,
  registerUserApi,
  loginUserApi,
  getCurrentProfileApi,
  getProfilesApi,
  getProfileByHandleApi,
  createProfileApi,
  addExperienceApi,
  addEducationApi,
  deleteExperienceApi,
  deleteEducationApi,
  deleteAccountApi
};
