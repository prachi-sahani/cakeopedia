import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";

async function signup(data) {
  const userData = await createUserWithEmailAndPassword(
    auth,
    data.email,
    data.password
  );
  await updateUser(data.name);
  sessionStorage.setItem("uid", userData.user.uid);
  const notesRef = doc(db, "notes", userData.user.uid);
  return setDoc(notesRef, {
    notes: [],
    userID: userData.user.uid,
    labels: ["Recipes", "Orders", "Personal"],
  });
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
  const q = query(collection(db, "notes"), where("userID", "==", uid));
  return getDocs(q);
}

async function addUserNote(dataToSend) {
  const notesRef = doc(db, "notes", dataToSend.userID);
  return updateDoc(notesRef, dataToSend);
}

export { signup, login, updateUser, logoutUser, getUserNotes, addUserNote };
