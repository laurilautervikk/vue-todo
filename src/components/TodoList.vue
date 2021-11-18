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
          <p>{{ todo.status }}</p><!-- MUUDA STATUS > 'ACTIVE: true'
          sealt edasi areta IF ELSE ja muuda kujundust vms -->
          <button @click="completeTodo(todo._id)" type="submit" class="btn btn-primary m-1">
          It's Done
        </button>
        <button @click="deleteTodo(todo._id)" type="submit" class="btn btn-primary m-1">
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

    //Change one todo
    async function completeTodo(id) {//NOT WORKING
      await axios.post(`/api/patch-todo/" + ${id}`, {//NOT WORKING
        title: 'whatever',//NOT WORKING
        status: "DONE",//NOT WORKING
      });
      console.log('sent a patch something')
    }

    //Delete one todo
    async function deleteTodo(id) {
      const result = await axios.post("/api/delete-todo/" + id);
      singleTodo.value = result.data;
      console.log(result.data);
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
      newTodo,
      todosFromServer,
      addTodo,
      singleTodo,
      getTodo,
      getTodos,
      completeTodo,
      deleteTodo,
    };
  },
};
</script>

<style scoped>
.done {
  text-decoration: line-through;
}
</style>
