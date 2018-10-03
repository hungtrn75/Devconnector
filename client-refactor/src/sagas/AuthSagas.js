import {
  REGISTER_USER,
  SET_CURRENT_USER,
  LOGIN_USER,
  LOGOUT_USER,
  CLEAR_CURRENT_PROFILE
} from "../constants/ActionTypes";
import { takeLatest, put, call } from "redux-saga/effects";
import { Api } from "./Api";
import { GET_ERRORS } from "../constants/ErrorTypes";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import { ADD_ALERT } from "../constants/AlertActions";

function* registerUserWorker(action) {
  try {
    yield call(Api.registerUserApi, action.payload.userData);
    yield call(action.payload.history.push, "/login");
    yield put({
      type: ADD_ALERT,
      payload: { text: "Register successfull", status: "success" }
    });
  } catch (error) {
    yield put({ type: GET_ERRORS, payload: error.response.data });
    yield put({
      type: ADD_ALERT,
      payload: { text: "Register failed", status: "danger" }
    });
  }
}

export function* watchRegisterUser() {
  yield takeLatest(REGISTER_USER, registerUserWorker);
}

function* loginUserWorker(action) {
  try {
    const res = yield call(Api.loginUserApi, action.payload);
    const { token } = res.data;
    //Save to localStorage
    localStorage.setItem("jwtToken", token);
    //Set user token
    setAuthToken(token);
    //Decode user token
    const decoded = jwt_decode(token);
    yield put({ type: SET_CURRENT_USER, payload: decoded });
    yield put({
      type: ADD_ALERT,
      payload: { text: "Login successfull", status: "success" }
    });
  } catch (error) {
    yield put({ type: GET_ERRORS, payload: error.response.data });
    yield put({
      type: ADD_ALERT,
      payload: { text: "Login failed", status: "danger" }
    });
  }
}

export function* watchLoginUser() {
  yield takeLatest(LOGIN_USER, loginUserWorker);
}

function* logoutUserWorker(action) {
  try {
    //Remove token from localStorage
    localStorage.removeItem("jwtToken");
    //Remove auth header for future requests
    setAuthToken(false);
    //Set isAuthenticated to false and remove user
    yield put({ type: SET_CURRENT_USER, payload: {} });
    yield put({ type: CLEAR_CURRENT_PROFILE });
    yield put({
      type: ADD_ALERT,
      payload: { text: "Logout successfull", status: "success" }
    });
  } catch (error) {
    yield put({ type: GET_ERRORS, payload: error.response.data });
    yield put({
      type: ADD_ALERT,
      payload: { text: "Login failed", status: "danger" }
    });
  }
}

export function* watchLogoutUser() {
  yield takeLatest(LOGOUT_USER, logoutUserWorker);
}
