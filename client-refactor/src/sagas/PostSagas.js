import {
  ADD_POST_API,
  ADD_POST,
  GET_POSTS,
  GET_POSTS_API,
  POST_LOADING,
  GET_POST,
  ADD_COMENT_API,
  GET_POST_API,
  DELETE_POST,
  DELETE_POST_API,
  ADD_LIKE_POST_API,
  UN_LIKE_POST_API,
  DELETE_COMMENT_API
} from "../constants/ActionTypes";
import { GET_ERRORS } from "../constants/ErrorTypes";
import { call, put, takeLatest } from "redux-saga/effects";
import { Api } from "./Api";

function* addPostWorker(action) {
  try {
    const res = yield call(Api.addPostApi, action.payload);
    yield put({ type: ADD_POST, payload: res.data });
  } catch (error) {
    yield put({ type: GET_ERRORS, payload: error.response.data });
  }
}

function* addCommentWorker(action) {
  try {
    yield call(
      Api.addCommentApi,
      action.payload.id,
      action.payload.commentData
    );
    yield put({ type: GET_POST_API, payload: action.payload.id });
  } catch (error) {
    yield put({ type: GET_ERRORS, payload: error.response.data });
  }
}
function* getPostsWorker() {
  try {
    yield put({ type: POST_LOADING });
    const res = yield call(Api.getPostsApi);
    yield put({ type: GET_POSTS, payload: res.data });
  } catch (error) {
    yield put({ type: GET_POSTS, payload: null });
  }
}
function* getPostWorker(action) {
  try {
    yield put({ type: POST_LOADING });
    const res = yield call(Api.getPostApi, action.payload);
    yield put({ type: GET_POST, payload: res.data });
  } catch (error) {
    yield put({ type: GET_POST, payload: null });
  }
}
function* deletePostWorker(action) {
  try {
    yield call(Api.deletePostApi, action.payload);
    yield put({ type: DELETE_POST, payload: action.payload });
  } catch (error) {
    yield put({ type: GET_POSTS, payload: null });
  }
}
function* addLikeWorker(action) {
  try {
    yield call(Api.addLikeApi, action.payload);
    yield put({ type: GET_POSTS_API });
  } catch (error) {
    yield put({ type: GET_ERRORS, payload: error.response.data });
  }
}
function* removeLikeWorker(action) {
  try {
    yield call(Api.removeLikeApi, action.payload);
    yield put({ type: GET_POSTS_API });
  } catch (error) {
    yield put({ type: GET_ERRORS, payload: error.response.data });
  }
}
function* deleteCommentWorker(action) {
  try {
    yield call(
      Api.deleteCommentApi,
      action.payload.comment_id,
      action.payload.post_id
    );
    yield put({ type: GET_POST_API, payload: action.payload.post_id });
  } catch (error) {
    yield put({ type: GET_ERRORS, payload: error.response.data });
  }
}

export function* watchAddPost() {
  yield takeLatest(ADD_POST_API, addPostWorker);
}
export function* watchCommentPost() {
  yield takeLatest(ADD_COMENT_API, addCommentWorker);
}
export function* watchGetPost() {
  yield takeLatest(GET_POST_API, getPostWorker);
}
export function* watchGetPosts() {
  yield takeLatest(GET_POSTS_API, getPostsWorker);
}
export function* watchDeletePost() {
  yield takeLatest(DELETE_POST_API, deletePostWorker);
}
export function* watchAddLike() {
  yield takeLatest(ADD_LIKE_POST_API, addLikeWorker);
}
export function* watchRemoveLike() {
  yield takeLatest(UN_LIKE_POST_API, removeLikeWorker);
}
export function* watchDeleteComment() {
  yield takeLatest(DELETE_COMMENT_API, deleteCommentWorker);
}
