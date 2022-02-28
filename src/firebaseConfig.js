import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAjR0yiYCLoPgrYHzB7tSyk-w2BRC5QyCg",
  authDomain: "movie-cbc5a.firebaseapp.com",
  projectId: "movie-cbc5a",
  storageBucket: "movie-cbc5a.appspot.com",
  messagingSenderId: "524786208319",
  appId: "1:524786208319:web:0330f457a30f36bcd9f28a"
};

 export const app = initializeApp(firebaseConfig);