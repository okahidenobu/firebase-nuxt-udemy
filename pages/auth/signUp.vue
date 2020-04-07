<template>
  <v-app>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <!-----アラート------->
            <v-alert
              v-if="error"
              type="error"
              style="white-space: pre-line"
              class="mb-6"
              >{{ error }}
            </v-alert>

            <!--ログインフォーム -->
            <v-card width="500" class="mx-auto mt-5 elevation-12">
              <v-toolbar color="success" dark flat class="display-1">
                <v-toolbar-title>Registration form</v-toolbar-title>
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
                <v-btn v-on:click="onSubmit" color="success">register</v-btn>
                <v-spacer></v-spacer>
                <v-btn to="/auth/login" color="info">login</v-btn>
              </v-card-actions>
            </v-card>

            <!--    デバック用    -->
            <v-card
              v-if="environment === 'development'"
              class="mx-auto mt-10"
              width="500"
            >
              <v-card-title>
                <p class="display-1 text--primary">
                  debugs
                </p>
              </v-card-title>
              <v-card-text class="body-1">
                <p v-if="email">email : {{ email }}</p>
                <p v-if="password">password :{{ password }}</p>
                <p v-if="error">error : {{ error }}</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import firebase from "firebase";

export default {
  name: "signUp",
  data: () => ({
    email: "",
    password: "",
    error: "",
    environment: process.env.NODE_ENV
  }),
  methods: {
    onSubmit: async function() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(r => {
          this.email = "";
          this.password = "";
          console.log(r);
        })
        .catch(e => {
          this.error = e.message;
        });
    }
  }
};
</script>
