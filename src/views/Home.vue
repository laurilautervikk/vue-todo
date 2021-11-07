<template>
  <div class="home container">
    <Calculate msg="Calculate App" />
    <TodoList title="My todo list" />
  </div>
</template>

<script>
// @ is an alias to /src
import Calculate from "@/components/Calculate";
import TodoList from "@/components/TodoList";

export default {
  name: "Home",

  data: () => ({
    text: "Hi from data",
  }),
  components: {
    Calculate,
    TodoList,
  },
};
</script>
