import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

let config = {
  apiKey: "AIzaSyBV1TsnWRuQoRLvmtMVwbnQ-Wb0lQj7Qvg",
  authDomain: "catch-of-the-day-2d53c.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-2d53c.firebaseio.com"
};

firebase.initializeApp(config);

export const database = firebase.database()
export const auth = firebase.auth()
