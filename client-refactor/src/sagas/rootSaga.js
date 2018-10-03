import { all } from "redux-saga/effects";
import {
  watchAddPost,
  watchCommentPost,
  watchGetPost,
  watchGetPosts,
  watchDeletePost,
  watchAddLike,
  watchRemoveLike,
  watchDeleteComment
} from "./PostSagas";
import {
  watchRegisterUser,
  watchLoginUser,
  watchLogoutUser
} from "./AuthSagas";
import {
  watchGetProfileByHandle,
  watchCreateProfile,
  watchGetCurrentProfile,
  watchDeleteAccount,
  watchAddExperience,
  watchAddEducation,
  watchDeleteExperience,
  watchDeleteEducation,
  watchGetProfiles
} from "./ProfileSagas";

export default function*() {
  yield all([
    watchAddPost(),
    watchCommentPost(),
    watchGetPost(),
    watchGetPosts(),
    watchDeletePost(),
    watchAddLike(),
    watchRemoveLike(),
    watchDeleteComment(),
    watchRegisterUser(),
    watchLoginUser(),
    watchGetCurrentProfile(),
    watchGetProfileByHandle(),
    watchCreateProfile(),
    watchDeleteAccount(),
    watchAddExperience(),
    watchAddEducation(),
    watchDeleteExperience(),
    watchDeleteEducation(),
    watchGetProfiles(),
    watchLogoutUser()
  ]);
}
