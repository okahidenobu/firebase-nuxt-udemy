<template>
  <div>
    <h1>hi</h1>
    <button v-on:click="googleLogin">googleでログイン</button>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "login",
  asyncData(context) {
    // コンポーネントをロードする前に毎回呼び出されます
    return { name: "Hello, World！！", isLogin: false, userData: null };
  },
  mounted: function() {
    firebase.auth().onAuthStateChanged(user => {
      // console.log(user);
      if (user) {
        this.isLogin = true;
        this.userData = user;
      } else {
        this.isLogin = false;
        this.userData = null;
      }
    });
  },
  methods: {
    googleLogin: function() {
      firebase
        .auth()
        .signInWithRedirect(new firebase.auth.GoogleAuthProvider())
        .then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // ...
          console.log("login!!");
          // console.log({ token, user });
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
          console.log("login errrrrrror");
        });
    },
    googleLogOut: () => {
      firebase
        .auth()
        .signOut()
        .then(function() {
          // Sign-out successful.
          console.log("logout");
        })
        .catch(function(error) {
          // An error happened.
          console.log("logout errror");
        });
    }
  }
};
</script>