import React from "react";
import AuthContext from "./AuthContext";
import { auth } from "../Firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
const AuthProvider = ({ children }) => {
  // create profile
  const createAccount = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Update Profile
  const updateUserProfile = (name, image_url) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: image_url,
    });
  };
  // User login
  const userLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const userInfo = {
    createAccount,
    updateUserProfile,
    userLogin,
  };
  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;
