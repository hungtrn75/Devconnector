import Loadable from "react-loadable";
import React from "react";

function Loading() {
  return <h3>Loading...</h3>;
}

export const NotFound = Loadable({
  loader: () => import("../not-found/NotFound"),
  loading: Loading
});
export const Landing = Loadable({
  loader: () => import("../layout/Landing"),
  loading: Loading
});
export const Register = Loadable({
  loader: () => import("../register/auth/Register"),
  loading: Loading
});
export const Login = Loadable({
  loader: () => import("../register/auth/Login"),
  loading: Loading
});
export const Profile = Loadable({
  loader: () => import("../profile/Profile"),
  loading: Loading
});
export const Profiles = Loadable({
  loader: () => import("../profiles/Profiles"),
  loading: Loading
});
export const EditProfile = Loadable({
  loader: () => import("../edit-profile/EditProfile"),
  loading: Loading
});
export const CreateProfile = Loadable({
  loader: () => import("../create-profile/CreateProfile"),
  loading: Loading
});
export const Dashboard = Loadable({
  loader: () => import("../dashboard/Dashboard"),
  loading: Loading
});
export const AddEducation = Loadable({
  loader: () => import("../add-credentials/AddEducationAntd"),
  loading: Loading
});
export const AddExperience = Loadable({
  loader: () => import("../add-credentials/AddExperience"),
  loading: Loading
});
export const Posts = Loadable({
  loader: () => import("../posts/Posts"),
  loading: Loading
});
export const Post = Loadable({
  loader: () => import("../post/Post"),
  loading: Loading
});
