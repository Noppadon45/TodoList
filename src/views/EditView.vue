<script setup>
import { useTodoStore } from "../stores/todo"
import { useRoute, RouterLink } from "vue-router"
import { onMounted, ref } from "vue"

const TodoStore = useTodoStore()
const route = useRoute()
const todoID = ref(-1)
const isLoaded = ref(false)
onMounted(async () => {
  await TodoStore.loadTodo(route.params.id)
  todoID.value = parseInt(route.params.id)
  isLoaded.value = true
  console.log(TodoStore.selectedTodo)
})
const EditTodo = async (TodoData) => {
  try {
    const bodyData = {
      name: TodoData.name,
      status: TodoData.status,
    }
    await TodoStore.editTodo(bodyData, todoID.value)
    alert("EditTodo successfully")
  } catch (error) {
    console.log("Error", error)
  }
}
</script>
<template>
  <h1>EditView</h1>
  <div v-if="isLoaded">
    Edit ID {{ todoID }}
    <div>
      Name
      <input type="text" v-model="TodoStore.selectedTodo.name" />
    </div>
    <div>
      Status
      <select v-model="TodoStore.selectedTodo.status">
        <option>Select status</option>
        <option v-for="status in TodoStore.statuses" :value="status">
          {{ status }}
        </option>
      </select>
    </div>
    <div><button @click="EditTodo(TodoStore.selectedTodo)">Edit</button></div>
  </div>
  <h2 v-else>Loading....</h2>
  <RouterLink :to="{ name: 'todo-list' }">
    <button>Back to HomeView</button>
  </RouterLink>
</template>
