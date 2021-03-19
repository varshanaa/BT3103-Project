import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBkESONKSNIyY6umsp_wQtc5S9I74bRZQo",
    authDomain: "bt3103-project-f89ba.firebaseapp.com",
    projectId: "bt3103-project-f89ba",
    storageBucket: "bt3103-project-f89ba.appspot.com",
    messagingSenderId: "660574068009",
    appId: "1:660574068009:web:715c37b70e113028c6eb38",
    measurementId: "G-M8VVWD3ED7"
  };

  firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;