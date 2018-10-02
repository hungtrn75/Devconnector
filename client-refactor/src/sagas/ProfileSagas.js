import { GET_ERRORS } from "../constants/ErrorTypes";
import { call, put, takeLatest } from "redux-saga/effects";
import { Api } from "./Api";
import {
  GET_CURRENT_PROFILE,
  SET_CURRENT_USER,
  GET_PROFILE,
  PROFILE_LOADING,
  CREATE_PROFILE,
  GET_PROFILE_BY_HANDLE,
  CLEAR_CURRENT_PROFILE,
  ADD_EXPERIENCE,
  ADD_EDUCATION,
  DELETE_ACCOUNT,
  DELETE_EXPERIENCE,
  DELETE_EDUCATION,
  GET_PROFILES,
  GET_PROFILES_API
} from "../constants/ActionTypes";

function* getCurrentProfile() {
  try {
    const res = yield call(Api.getCurrentProfileApi);
    yield put({ type: GET_PROFILE, payload: res.data });
  } catch (error) {
    yield put({ type: GET_PROFILE, payload: {} });
  }
}

export function* watchGetCurrentProfile() {
  yield takeLatest(GET_CURRENT_PROFILE, getCurrentProfile);
}

function* getProfiles() {
  try {
    yield put({ type: PROFILE_LOADING });
    const res = yield call(Api.getProfilesApi);
    yield put({ type: GET_PROFILES, payload: res.data });
  } catch (error) {
    yield put({ type: GET_ERRORS, payload: error.response.data });
  }
}

export function* watchGetProfiles() {
  yield takeLatest(GET_PROFILES_API, getProfiles);
}

function* getProfileByHandle(action) {
  try {
    yield put({ type: PROFILE_LOADING });
    const res = yield call(Api.getProfileByHandleApi, action.payload);
    yield put({ type: GET_PROFILE, payload: res.data });
  } catch (error) {
    yield put({ type: GET_PROFILE, payload: {} });
  }
}

export function* watchGetProfileByHandle() {
  yield takeLatest(GET_PROFILE_BY_HANDLE, getProfileByHandle);
}

function* createProfile(action) {
  try {
    const res = yield call(Api.createProfileApi, action.payload.profileData);
    action.payload.history.push("/dashboard");
    yield put({ type: GET_PROFILE, payload: res.data });
  } catch (error) {
    yield put({ type: GET_ERRORS, payload: error.response.data });
  }
}

export function* watchCreateProfile() {
  yield takeLatest(CREATE_PROFILE, createProfile);
}

function* deleteAccount() {
  try {
    yield call(Api.deleteAccountApi);
    yield put({ type: SET_CURRENT_USER, payload: {} });
    yield put({ type: CLEAR_CURRENT_PROFILE });
  } catch (error) {
    yield put({ type: GET_ERRORS, payload: error.response.data });
  }
}

export function* watchDeleteAccount() {
  yield takeLatest(DELETE_ACCOUNT, deleteAccount);
}

function* addExperience(action) {
  try {
    yield call(Api.addExperienceApi, action.payload.expData);
    action.payload.history.push("/dashboard");
  } catch (error) {
    yield put({ type: GET_ERRORS, payload: error.response.data });
  }
}

export function* watchAddExperience() {
  yield takeLatest(ADD_EXPERIENCE, addExperience);
}

function* addEducation(action) {
  try {
    yield call(Api.addEducationApi, action.payload.eduData);
    action.payload.history.push("/dashboard");
  } catch (error) {
    yield put({ type: GET_ERRORS, payload: error.response.data });
  }
}

export function* watchAddEducation() {
  yield takeLatest(ADD_EDUCATION, addEducation);
}

function* deleteExperience(action) {
  try {
    const res = yield call(Api.deleteExperienceApi, action.payload.id);
    yield put({ type: GET_PROFILE, payload: res.data });
    yield call(action.payload.history.push, "/dashboard");
  } catch (error) {
    yield put({ type: GET_ERRORS, payload: error.response.data });
  }
}

export function* watchDeleteExperience() {
  yield takeLatest(DELETE_EXPERIENCE, deleteExperience);
}

function* deleteEducation(action) {
  try {
    const res = yield call(Api.deleteEducationApi, action.payload.id);
    yield put({ type: GET_PROFILE, payload: res.data });
    yield call(action.payload.history.push, "/dashboard");
  } catch (error) {
    yield put({ type: GET_ERRORS, payload: error.response.data });
  }
}

export function* watchDeleteEducation() {
  yield takeLatest(DELETE_EDUCATION, deleteEducation);
}
