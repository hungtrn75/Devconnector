import {
  CREATE_PROFILE,
  GET_CURRENT_PROFILE,
  PROFILE_LOADING,
  GET_PROFILES_API,
  GET_PROFILE_BY_HANDLE,
  DELETE_ACCOUNT,
  ADD_EXPERIENCE,
  ADD_EDUCATION,
  DELETE_EXPERIENCE,
  DELETE_EDUCATION
} from "../constants/ActionTypes";

//Get current profile
export const getCurrentProfile = () => ({
  type: GET_CURRENT_PROFILE
});

//Get profile by handle
export const getProfileByHandle = handle => ({
  type: GET_PROFILE_BY_HANDLE,
  payload: handle
});

//Create profile
export const createProfile = (profileData, history) => ({
  type: CREATE_PROFILE,
  payload: { profileData, history }
});

//Delete account
export const deleteAccount = () => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    return {
      type: DELETE_ACCOUNT
    };
  }
};

//Delete experience
export const deleteExperience = (id, history) => ({
  type: DELETE_EXPERIENCE,
  payload: { id, history }
});

//Delete education
export const deleteEducation = (id, history) => ({
  type: DELETE_EDUCATION,
  payload: { id, history }
});

//Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

//Add experience
export const addExperience = (expData, history) => ({
  type: ADD_EXPERIENCE,
  payload: { expData, history }
});

//Add education
export const addEducation = (eduData, history) => ({
  type: ADD_EDUCATION,
  payload: { eduData, history }
});

// Get profiles
export const getProfiles = () => ({
  type: GET_PROFILES_API
});
