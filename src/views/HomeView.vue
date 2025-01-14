<script setup>
import { onMounted } from "vue"
import { useTodoStore } from "../stores/todo"

const TodoStore = useTodoStore()
onMounted(async () => {
  await TodoStore.loadTodos()
  console.log(TodoStore.list)
})
</script>

<template>
  <div>HomeView</div>
</template>
