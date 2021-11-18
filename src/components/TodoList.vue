<template>
  <div>
    <div class="row">
      <div class="col-6">
        <h2>{{ title }}</h2>

        <ul class="list-group mb-3">
          <li
            v-for="todo in todosFromServer"
            :key="todo"
            class="list-group-item"
            @click="getTodo(todo._id)"
          >
          <p>{{ todo.title }}</p>
          <p>{{ todo.status }}</p>
          <button @click="completeTodo" type="submit" class="btn btn-primary m-1">
          It's Done
        </button>
        <button @click="deleteTodo" type="submit" class="btn btn-primary m-1">
          Delete
        </button>
          </li>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <input
          v-model="newTodo"
          type="text"
          name="newTodo"
          class="form-control"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <button @click="addTodo" type="submit" class="btn btn-primary w-100 mt-1">
          Add new todo
        </button>
      </div>
    </div>
    {{ singleTodo }}
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  name: "TodoList",
  props: {
    title: String,
  },
  setup() {
    const newTodo = ref("");

    const todosFromServer = ref([]);
    const singleTodo = ref({});

    async function getTodos() {
      const result = await axios.get("/api/get-todos");
      todosFromServer.value = result.data;
      console.log(result.data);
    }

    async function getTodo(id) {
      const result = await axios.get("/api/get-todo/" + id);
      singleTodo.value = result.data;
      console.log(result.data);
    }

    async function addTodo() {
      await axios.post("/api/add-todo", {
        title: newTodo.value,
        status: "ACTIVE",
      });
      newTodo.value = "";
      await getTodos();
    }

    getTodos();

   

    return {
      newTodo,
      todosFromServer,
      addTodo,
      singleTodo,
      getTodo,
      getTodos,
    };
  },
};
</script>
