<template>
  <v-app>
    <v-card width="500" class="mx-auto mt-5">
      <v-card-title class="display-1">
        <h1 class="font-weight-light">registration</h1>
      </v-card-title>
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
        <v-btn to="/auth/login" color="info">login page</v-btn>
      </v-card-actions>
    </v-card>
    <v-alert
      v-if="error"
      type="error"
      style="white-space: pre-line"
      class="mb-6"
      >{{ error }}
    </v-alert>

    <!--    debug-->
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
