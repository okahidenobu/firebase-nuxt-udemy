<template>
  <div>
    <login v-if="!isLogin" :user="userData"></login>
    <todos v-if="isLogin" :user="userData"></todos>
  </div>
</template>

<script>
import firebase from "firebase";
import todos from "../components/todos";
import login from "../components/login";

export default {
  name: "home",
  components: {
    todos,
    login
  },
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
  methods: {}
};
</script>
