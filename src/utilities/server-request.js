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
  return setDoc(notesRef, { notes: [], userID: userData.user.uid });
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

async function addUserNote(uid, notes) {
  const notesRef = doc(db, "notes", uid);
  return updateDoc(notesRef, { userID: uid, notes });
}

export { signup, login, updateUser, logoutUser, getUserNotes, addUserNote };
