<template>
  <div class="home container">
    <!-- <Calculate msg="Calculate App" /> -->
    <TodoList title="My todo list" />
    <!-- <AddTodo title="Add todo" /> -->
  </div>
</template>

<script>
// @ is an alias to /src
/* import Calculate from "@/components/Calculate"; */
import TodoList from "@/components/TodoList";
/* import AddTodo from "@/components/AddTodo"; */

export default {
  name: "Home",

  data: () => ({
    text: "Hi from data",
  }),
  components: {
   /*  Calculate, */
    TodoList,
    /* AddTodo, */
  },
};
</script>
