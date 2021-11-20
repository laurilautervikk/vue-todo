<template>
  <div>
    <div class="row">
      <div class="col-lg-6 col-md-6 col-sm-12">
        <h2>{{ title }}</h2>

        <ul class="list-group mb-3">
          <li
            class="list-group-item"
            v-bind:class="{ completed: todo.status === 'DONE' }"
            v-for="todo in todosFromServer"
            :key="todo"
            @click="getTodo(todo._id)"
          >
            <!-- Displays info -->
            <p>{{ todo.title }}</p>
            <p>{{ todo.status }}</p>
            <button
              @click="completeTodo(todo._id)"
              type="submit"
              class="btn btn-primary m-1"
            >
              {{ changeState(todo.status) }}
            </button>
            <button
              @click="deleteTodo(todo._id)"
              type="submit"
              class="btn btn-primary m-1"
            >
              Delete
            </button>
          </li>
        </ul>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12 my-5">
        <div>
          <p><span>CONTENT:</span>{{ singleTodo }}</p>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 col-md-6 col-sm-12">
        <input
          v-model="newTodo"
          type="text"
          name="newTodo"
          class="form-control"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 col-md-6 col-sm-12">
        <button
          @click="addTodo"
          type="submit"
          class="btn btn-primary w-100 mt-1"
        >
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
  },
  setup() {
    const newTodo = ref("");

    const todosFromServer = ref([]);
    const singleTodo = ref({});

    //Get all todos
    async function getTodos() {
      const result = await axios.get("/api/get-todos");
      todosFromServer.value = result.data;
      console.log(result.data);
    }

    //Get one todo
    async function getTodo(id) {
      const result = await axios.get("/api/get-todo/" + id);
      singleTodo.value = result.data;
      console.log(result.data);
    }

    //Change todo state, logic is in BE
    async function completeTodo(id) {
      console.log("FE status update started", id);
      const result = await axios.patch("/api/patch-todo/" + id);
      console.log("FE status update sent: ", result.data.status);
      await getTodos();
    }

    //Delete one todo
    async function deleteTodo(id) {
      const result = await axios.post("/api/delete-todo/" + id);
      singleTodo.value = result.data;
      console.log("Delete todo: ", result.data);
      await getTodos();
    }

    //Add a new todo
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
      todoComplete: "Complete",
      todoActivate: "Activate",
      newTodo,
      todosFromServer,
      addTodo,
      singleTodo,
      getTodo,
      getTodos,
      completeTodo,
      deleteTodo,
      /* activeClass: "bg-light",
      doneClass: "bg-secondary", */
    };
  },
  methods: {
    changeState(input) {
      if (input === "ACTIVE") {
        return this.todoComplete;
      } else {
        return this.todoActivate;
      }
    },
  },
  /* changeBg(input) {
    if (input === "ACTIVE") {
      return this.activeClass;
    } else {
      return this.doneClass;
    }
  }, */
};
</script>

<style scoped>
.completed {
  background-color: silver;
}
</style>
