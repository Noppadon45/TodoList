<script setup>
import { onMounted, ref } from "vue"
import { useTodoStore } from "../stores/todo"
const todoText = ref("")

const TodoStore = useTodoStore()
onMounted(async () => {
  await TodoStore.loadTodos()
  console.log(TodoStore.list)
})
const addTodo = async (todoText) => {
  try {
    await TodoStore.addTodo(todoText)
    await TodoStore.loadTodos()
  } catch (error) {
    console.log("Error", error)
  }
}
const EditStatus = async (todoData, todoId) => {
  try {
    const upDateData = {
      name: todoData.name,
      status: todoData.status,
    }
    await TodoStore.editTodo(upDateData, todoId)
  } catch (error) {
    console.log("Error", error)
  }
}
const DeleteTodo = async (todoId) => {
  try {
    await TodoStore.deleteTodo(todoId)
    await TodoStore.loadTodos()
  } catch (error) {
    console.log("Error", error)
  }
}
</script>

<template>
  <div>HomeView</div>
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
      <button>Edit</button>
      <button @click="DeleteTodo(todo.id)">Delete</button>
    </li>
  </ul>
</template>
