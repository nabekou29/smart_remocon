import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: "raspi-home-1823.firebaseapp.com",
  databaseURL: "https://raspi-home-1823.firebaseio.com",
  projectId: "raspi-home-1823",
  storageBucket: "raspi-home-1823.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: "1:398066115568:web:46c1716c0d169916"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
