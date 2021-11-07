<template>
  <div>
    <form @submit="addTodo">
      <input type="text" v-model="title" name="title">
      <button type="submit">Add</button>
    </form>
  </div>
</template>


<script>

/* the original was */
/* import uuid from 'uuid'; */

import {v4 as uuid} from 'uuid';


export default {
  name: 'AddTodo',
  data() {
    return {
      title: ''
    }
  },
  methods: {
    addTodo(e) {
      e.preventDefault();
      const newTodoObj = {
        /* the original was */
        /* id: uuid.v4(), */
        id: uuid(),
        title: this.title,
        completed: false
      }
      this.$emit('add-todo', newTodoObj);
      this.title = '';
    }
  }
}
</script>
<style scoped>
</style>