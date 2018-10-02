import {
  REGISTER_USER,
  SET_CURRENT_USER,
  LOGIN_USER
} from "../constants/ActionTypes";
import { takeLatest, put, call } from "redux-saga/effects";
import { Api } from "./Api";
import { GET_ERRORS } from "../constants/ErrorTypes";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";

function* registerUserWorker(action) {
  try {
    yield call(Api.registerUserApi, action.payload.userData);
    yield call(action.payload.history.push, "/login");
  } catch (error) {
    yield put({ type: GET_ERRORS, payload: error.response.data });
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
  } catch (error) {
    yield put({ type: GET_ERRORS, payload: error.response.data });
  }
}

export function* watchLoginUser() {
  yield takeLatest(LOGIN_USER, loginUserWorker);
}
