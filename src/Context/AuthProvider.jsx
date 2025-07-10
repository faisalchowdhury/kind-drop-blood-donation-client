import React from "react";
import AuthContext from "./AuthContext";
import { auth } from "../Firebase/firebase.config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
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

  const userInfo = {
    createAccount,
    updateUserProfile,
  };
  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;
