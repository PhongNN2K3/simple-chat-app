import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  TwitterAuthProvider,
} from "firebase/auth";

//tạo firebase config để liên kết với firebase
const firebaseConfig = {
  apiKey: "AIzaSyBJ5cVQAVZT3r9M1cWvT6_babAg50NNmgU",
  authDomain: "chat-app-3ccc5.firebaseapp.com",
  projectId: "chat-app-3ccc5",
  storageBucket: "chat-app-3ccc5.appspot.com",
  messagingSenderId: "545338558844",
  appId: "1:545338558844:web:8370cb8edc978ed4163cf9",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const twitterProvider = new TwitterAuthProvider();

export { auth, googleProvider, twitterProvider };
