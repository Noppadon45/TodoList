<script setup>
import { useTodoStore } from "../stores/todo"
import { useRoute, RouterLink } from "vue-router"
import { onMounted, ref } from "vue"
import Loading from "../components/Isloading.vue"
import Isloading from "../components/Isloading.vue"

const TodoStore = useTodoStore()
const route = useRoute()
const todoID = ref(-1)
const isLoaded = ref(false)
const IsEdit = ref(false)
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
    isLoaded.value = false
    await TodoStore.editTodo(bodyData, todoID.value)
    IsEdit.value = true
    isLoaded.value = true
    setTimeout(() => {
      IsEdit.value = false
    }, 2000)
  } catch (error) {
    console.log("Error", error)
  }
}
</script>
<template>
  <div class="mx-auto">
    <h1 class="text-3xl mb-2">EditView</h1>
    <div v-if="isLoaded">
      <div class="stats shadow w-full">
        <div class="stat">
          <div class="stat-title">Edit ID</div>
          <div class="stat-value">{{ todoID }}</div>
        </div>
      </div>
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">Name</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          class="input input-bordered w-full"
          v-model="TodoStore.selectedTodo.name"
        />
        <div class="label"></div>
      </label>
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Status</span>
        </label>
        <select
          class="select select-bordered"
          v-model="TodoStore.selectedTodo.status"
        >
          <option>Select status</option>
          <option v-for="status in TodoStore.statuses" :value="status">
            {{ status }}
          </option>
        </select>
      </div>
      <div class="flex">
        <button
          class="btn btn-primary mt-3 w-full"
          @click="EditTodo(TodoStore.selectedTodo)"
        >
          Edit
        </button>
      </div>
    </div>
    <h2 v-else><Loading></Loading></h2>
    <RouterLink :to="{ name: 'todo-list' }">
      <button class="btn btn-primary mt-3 w-full">Back to HomeView</button>
    </RouterLink>
    <div class="toast toast-top toast-center">
      <div v-if="IsEdit" class="alert alert-success">
        <span class="mx-auto">Update Complete</span>
      </div>
    </div>
  </div>
</template>
