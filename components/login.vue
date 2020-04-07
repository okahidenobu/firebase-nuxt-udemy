<template>
  <v-app>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <!--    <div>-->
            <!--      メール{{ email }}<br />-->
            <!--      <input type="text" v-model="email" /><br />-->
            <!--      パスワード{{ password }}<br />-->
            <!--      <input type="password" v-model="password" /><br />-->
            <!--      <button v-on:click="onSubmit">ログイン</button>-->
            <!--    </div>-->

            <!--    <br />-->
            <!--    <nuxt-link to="/auth/signUp">-->
            <!--      <button>新規登録はこちら</button>-->
            <!--    </nuxt-link>-->
            <v-alert
              v-if="error"
              type="error"
              style="white-space: pre-line"
              class="mb-6"
              >{{ error }}
            </v-alert>
            <v-card width="500" class="mx-auto mt-5 elevation-12">
              <v-toolbar color="info" dark flat class="display-1">
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="email"
                    prepend-icon="mdi-email"
                    v-model="email"
                  />
                  <v-text-field
                    label="Password"
                    type="password"
                    prepend-icon="mdi-lock"
                    append-icon="mdi-eye-off"
                    v-model="password"
                  />
                </v-form>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn v-on:click="login" color="info">login</v-btn>
                <v-spacer></v-spacer>
                <v-btn to="/auth/signUp" color="success">register</v-btn>
              </v-card-actions>
            </v-card>
            <br />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import firebase from "firebase";

export default {
  name: "login",

  data: () => ({
    email: "",
    password: "",
    error: ""
  }),

  methods: {
    async login() {
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
