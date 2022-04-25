import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase-config";

function signup(data) {
  return createUserWithEmailAndPassword(auth, data.email, data.password);
}

function updateUser(displayName) {
  return updateProfile(auth.currentUser, { displayName });
}

function login(data) {
  return signInWithEmailAndPassword(auth, data.email, data.password);
}

export { signup, login, updateUser };
