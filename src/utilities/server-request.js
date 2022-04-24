import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase-config";

function signup(data) {
  return createUserWithEmailAndPassword(auth, data.email, data.password);
}

function login(data) {
  return signInWithEmailAndPassword(auth, data.email, data.password);
}

export { signup, login };
