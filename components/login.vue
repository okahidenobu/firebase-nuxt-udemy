<template>
  <div>
    <div>
      メール{{ email }}<br />
      <input type="text" v-model="email" /><br />
      パスワード{{ password }}<br />
      <input type="password" v-model="password" /><br />
      <button v-on:click="onSubmit">ログイン</button>
    </div>

    <br />
    <button v-on:click="googleLogin">googleでログイン</button>
    <nuxt-link to="/auth/signUp">
      <button>新規登録はこちら</button>
    </nuxt-link>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "login",

  methods: {
    googleLogin() {
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
    async onSubmit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(r => {
          this.$router.push("/");
        })
        .catch(e => {
          const { code, message } = e;
          this.error = `${code}\n${message}`;
        });
    }
  }
};
</script>
