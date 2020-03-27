import firebase from "firebase";

const config = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  apiKey: process.env.APIKEY,
  authDomain: `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
  storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`
  // messagingSenderId: "sender-id",
  // appID: "app-id"
};

// configについて
// https://firebase.google.com/docs/web/setup#config-object

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export default firebase;
