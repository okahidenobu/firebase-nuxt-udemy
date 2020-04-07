<!--<template>-->
<!--  <div>-->
<!--    <ul>-->
<!--      <li v-for="todo in todos" :key="todo.id">-->
<!--        <span v-if="todo.created">-->
<!--          <input-->
<!--            type="checkbox"-->
<!--            v-bind:checked="todo.done"-->
<!--            @change="toggle(todo)"-->
<!--          />-->
<!--          <span v-bind:class="{ done: todo.done }"-->
<!--            >{{ todo.name }} {{ todo.created.toDate() | dateFilter }}-->
<!--          </span>-->
<!--          <button v-on:click="remove(todo.id)">delete</button>-->
<!--        </span>-->
<!--      </li>-->
<!--    </ul>-->
<!--    <div class="form">-->
<!--      <form v-on:submit.prevent="add">-->
<!--        <input v-model="name" />-->
<!--        <button>Add</button>-->
<!--      </form>-->
<!--    </div>-->
<!--    <button v-on:click="logOut">ログアウト</button>-->
<!--  </div>-->
<!--</template>-->

<template>
  <v-app>
    <v-container>
      <v-btn v-on:click="logOut">ログアウト</v-btn>
    </v-container>
    <v-container class="fill-height display-1" fluid>
      <v-card width="500" height="500" max-height="500" class="mx-auto">
        <v-toolbar color="light-blue" dark>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>

          <v-toolbar-title>TODO list</v-toolbar-title>

          <v-spacer></v-spacer>

          <!--            <v-btn icon>-->
          <!--              <v-icon>mdi-magnify</v-icon>-->
          <!--            </v-btn>-->

          <!--            <v-btn icon>-->
          <!--              <v-icon>mdi-view-module</v-icon>-->
          <!--            </v-btn>-->
        </v-toolbar>
        <v-list subheader>
          <v-subheader>Recent TODO</v-subheader>

          <v-list-item v-for="todo in todos" :key="todo.id" @click="">
            <v-checkbox v-model="todo.done" @change="toggle(todo)"></v-checkbox>
            <v-list-item-content>
              <v-list-item-title v-bind:class="{ done: todo.done }"
                >{{ todo.name }} {{ todo.created.toDate() | dateFilter }}
              </v-list-item-title>
            </v-list-item-content>
            <v-btn v-on:click="remove(todo.id)">delete</v-btn>
          </v-list-item>
        </v-list>
        <v-spacer></v-spacer>
        <v-card-text>
          <form v-on:submit.prevent>
            <v-text-field v-model="name" label=" new TODO"></v-text-field>
            <v-btn class="mr-4" v-on:click="add">submit</v-btn>
            {{ name }}
          </form>
        </v-card-text>

        <!--        <v-list subheader>-->
        <!--          <v-subheader>Previous chats</v-subheader>-->

        <!--          <v-list-item v-for="todo in todos2" :key="todo.id" @click="">-->
        <!--            &lt;!&ndash;            <v-list-item-avatar>&ndash;&gt;-->
        <!--            &lt;!&ndash;              <v-img :src="todo.name"></v-img>&ndash;&gt;-->
        <!--            &lt;!&ndash;            </v-list-item-avatar>&ndash;&gt;-->

        <!--            <v-list-item-content>-->
        <!--              <v-list-item-title v-text="todo.name"></v-list-item-title>-->
        <!--            </v-list-item-content>-->
        <!--          </v-list-item>-->
        <!--        </v-list>-->
      </v-card>
    </v-container>
  </v-app>
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
    logOut: () => {
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
v-app
  > v-container
  > v-card
  > v-list
  > v-list-item
  > v-list-item-content
  > v-list-item-title.done {
  text-decoration: line-through;
}
</style>
