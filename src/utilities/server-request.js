import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase-config";

function signup(data) {
  return createUserWithEmailAndPassword(auth, data.email, data.password);
}

function updateUser(displayName) {
  return updateProfile(auth.currentUser, { displayName });
}

async function login(data) {
  return signInWithEmailAndPassword(auth, data.email, data.password);
}
function logoutUser() {
  return signOut(auth);
}

async function getUserNotes(uid) {
  const q = query(collection(db, "notes"), where("userId", "==", uid));
  return getDocs(q);
}

export { signup, login, updateUser, logoutUser, getUserNotes };
