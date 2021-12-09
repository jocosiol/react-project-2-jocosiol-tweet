
import firebase from "firebase";

// Your web app's Firebase configuration
 const firebaseConfig = {
    apiKey: "AIzaSyAFT7q685FFGr5p6u3dQ-8TFTFZiTuj9a8",
    authDomain: "tweet-react-project.firebaseapp.com",
    projectId: "tweet-react-project",
    storageBucket: "tweet-react-project.appspot.com",
    messagingSenderId: "955900648748",
    appId: "1:955900648748:web:96747dc87f364cf96ee089"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export { firebase as default };

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAFT7q685FFGr5p6u3dQ-8TFTFZiTuj9a8",
//   authDomain: "tweet-react-project.firebaseapp.com",
//   projectId: "tweet-react-project",
//   storageBucket: "tweet-react-project.appspot.com",
//   messagingSenderId: "955900648748",
//   appId: "1:955900648748:web:96747dc87f364cf96ee089"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
