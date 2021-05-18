import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import 'firebase/database';
import 'firebase/storage';


var firebaseConfig = {
    apiKey: "AIzaSyCtotz7Fgw6Cz3UHEHZ_tfMs5Z1LoNFUG4",
    authDomain: "slack-chat-926b4.firebaseapp.com",
    databaseURL: "https://slack-chat-926b4-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "slack-chat-926b4",
    storageBucket: "slack-chat-926b4.appspot.com",
    messagingSenderId: "832601189065",
    appId: "1:832601189065:web:8d2f59d780e2618ec83b18",
    measurementId: "G-GLN6B5WS7E",

};


firebase.initializeApp(firebaseConfig);

export default firebase;