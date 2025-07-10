import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { auth } from "../Firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
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

  // Observer

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // sign Out user

  const signOutUser = () => {
    return signOut(auth);
  };
  const userInfo = {
    createAccount,
    updateUserProfile,
    userLogin,
    user,
    signOutUser,
    loading,
  };
  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;
