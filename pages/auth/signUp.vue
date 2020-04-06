<template>
  <div>
    <div>
      メール{{ email }}<br />
      <input type="text" v-model="email" /><br />
      パスワード{{ password }}<br />
      <input type="password" v-model="password" /><br />
      <button v-on:click="onSubmit">新規登録</button>
    </div>
    <div>
      <nuxt-link to="/auth/login">ログイン</nuxt-link>
    </div>
    {{ error }}
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "signUp",
  data: () => ({
    email: "",
    password: "",
    name: "",
    error: ""
  }),
  methods: {
    onSubmit: function() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.name = "";
          this.password = "";
        })
        .catch(function(e) {
          this.error = e.message;
        });
    }
  }
};
</script>

<style scoped></style>
