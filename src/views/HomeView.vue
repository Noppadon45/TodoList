<script setup>
import { onMounted, ref } from "vue"
import { useTodoStore } from "../stores/todo"
import { RouterLink } from "vue-router"
const todoText = ref("")
const isLoading = ref(false)
const TodoStore = useTodoStore()
onMounted(async () => {
  isLoading.value = true
  await TodoStore.loadTodos()
  console.log(TodoStore.list)
  isLoading.value = false
})
const addTodo = async (todoText) => {
  try {
    isLoading.value = true
    await TodoStore.addTodo(todoText)
    await TodoStore.loadTodos()
    isLoading.value = false
  } catch (error) {
    console.log("Error", error)
  }
}
const EditStatus = async (todoData, todoId) => {
  try {
    isLoading.value = true
    const upDateData = {
      name: todoData.name,
      status: todoData.status,
    }
    await TodoStore.editTodo(upDateData, todoId)
    isLoading.value = false
  } catch (error) {
    console.log("Error", error)
  }
}
const DeleteTodo = async (todoId) => {
  try {
    isLoading.value = true
    await TodoStore.deleteTodo(todoId)
    await TodoStore.loadTodos()
    isLoading.value = false
  } catch (error) {
    console.log("Error", error)
  }
}
</script>

<template>
  <h1>HomeView</h1>
  <h2 v-if="isLoading">Loading</h2>
  <div>
    <input type="text" v-model="todoText" />
    <button @click="addTodo(todoText)">Add</button>
  </div>

  <ul>
    <li v-for="todo in TodoStore.list">
      {{ todo.name }}
      <select v-model="todo.status" @change="EditStatus(todo, todo.id)">
        <option>Select status</option>
        <option v-for="status in TodoStore.statuses" :value="status">
          {{ status }}
        </option>
      </select>
      <RouterLink :to="{ name: 'todo-edit', params: { id: todo.id } }"
        ><button>Edit</button></RouterLink
      >

      <button @click="DeleteTodo(todo.id)">Delete</button>
    </li>
  </ul>
</template>
