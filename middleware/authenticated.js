import firebase from "~/plugins/firebase";

// export default function({ route, store, redirect }) {
//   firebase.auth().onAuthStateChanged(user => {
//     if (user) {
//       this.$router.push({ path: `/` });
//     } else {
//       if (route.name !== "login") this.$router.push({ path: `/login` });
//     }
//   });
// }

export default function({ store, route, redirect }) {
  if (!store.getters.isAuthenticated && route.name !== "login") {
    redirect("/login");
  }
  if (store.getters.isAuthenticated && route.name === "login") {
    redirect("/");
  }
}
