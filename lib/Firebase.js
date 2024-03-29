// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBTIx8WyCe4svq4kLtdJY1So3UyaO9Ie4A",
    authDomain: "photocomments-b05c7.firebaseapp.com",
    projectId: "photocomments-b05c7",
    storageBucket: "photocomments-b05c7.appspot.com",
    messagingSenderId: "979595799095",
    appId: "1:979595799095:web:6f892032050a79ceda2db2",
    measurementId: "G-LME56M4RGK"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage =  getStorage(app)
export {storage}