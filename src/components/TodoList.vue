<template>
  <div>
    <div class="row">
      <div class="col">
        <h2>{{ title }}</h2>

        <ul class="list-group mb-3">
          <li
            v-for="todo in todosFromServer"
            :key="todo"
            class="list-group-item"
          >
            <p>{{ todo.title }}</p>
            <p>{{ todo.status }}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <input
          v-model="newTodo"
          type="text"
          id="newTodo"
          name="newTodo"
          class="form-control"
        />
      </div>
      <div class="col">
        <button @click="addNewTodo" type="submit" class="btn btn-primary w-100">
          Add new todo
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
export default {
  name: "TodoList",
  props: {
    title: String,
    status: String,
  },
  setup() {
    //const todos = ref(["Read a book", "Go for a walk", "Eat food"]);
    const newTodo = ref("");

    const todosFromServer = ref([]);

    async function getTodos() {
      const result = await axios.get("/api/get-todos");
      todosFromServer.value = result.data;
      console.log(result.data);
    }

    getTodos();

    async function addNewTodo() {
      // POST request using axios with async/await
      const headers = {
        "Content-Type": "application/json",
      };

      /* const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "Accept": "application/json"
        }; */

      let data = {
        title: newTodo.value,
        status: "ACTIVE",
      };

      await axios.post("/api/post-todos", data, {
          headers: headers,
        })
        .then(function (res) {
          console.log(res);
        })
        .catch(function (error) {
          console.log(error);
        });

      console.log("newTodo front: ", data);

      getTodos();
    }

    /* function addNewTodo(todoload) {
      console.log('the load: ', todoload)
    } */

    return {
      newTodo,
      addNewTodo,
      todosFromServer,
    };
  },
};
</script>
