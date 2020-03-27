<template>
  <div>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <span v-if="todo.created">
          <input
            type="checkbox"
            v-bind:checked="todo.done"
            @change="toggle(todo)"
          />
          <span v-bind:class="{ done: todo.done }"
            >{{ todo.name }} {{ todo.created.toDate() | dateFilter }}
          </span>
          <button v-on:click="remove(todo.id)">delete</button>
        </span>
      </li>
    </ul>
    <div class="form">
      <form v-on:submit.prevent="add">
        <input v-model="name" />
        <button>Add</button>
      </form>
    </div>
    <button v-on:click="googleLogOut">ログアウト</button>
  </div>
</template>

<script>
import moment from "moment";
import firebase from "firebase";

export default {
  data: function() {
    return {
      name: "",
      done: false
    };
  },
  created: function() {
    this.$store.dispatch("todos/init");
  },
  methods: {
    add() {
      this.$store.dispatch("todos/add", this.name);
      this.name = "";
    },
    remove(id) {
      this.$store.dispatch("todos/remove", id);
    },
    toggle(todo) {
      this.$store.dispatch("todos/toggle", todo);
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
  },
  computed: {
    todos() {
      // return this.$store.state.todos.todos;
      return this.$store.getters["todos/orderedTodos"];
    }
  },
  filters: {
    dateFilter: function(date) {
      return moment(date).format("YYYY/MM/DD HH:mm:ss");
    }
  }
};
</script>

<style>
li > span > span.done {
  text-decoration: line-through;
}
</style>
