<script setup>
import { onMounted, ref, computed } from "vue"
import { useTodoStore } from "../stores/todo"
import { RouterLink } from "vue-router"
import Loading from "../components/Isloading.vue"

const todoText = ref("")
const isLoading = ref(false)
const TodoStore = useTodoStore()
const selectedStatus = ref("Pending")

onMounted(async () => {
  isLoading.value = true
  await TodoStore.loadTodos()
  console.log(TodoStore.list)
  isLoading.value = false
})

const FilterTodoList = computed(() => {
  return TodoStore.list.filter((todo) => todo.status === selectedStatus.value)
})

const addTodo = async (todoText) => {
  isLoading.value = true
  try {
    await TodoStore.addTodo(todoText)
    await TodoStore.loadTodos()
    isLoading.value = false
  } catch (error) {
    console.log("Error", error)
  }
  isLoading.value = false
}
const EditStatus = async (todoData, todoId) => {
  isLoading.value = true
  try {
    const upDateData = {
      name: todoData.name,
      status: todoData.status,
    }
    await TodoStore.editTodo(upDateData, todoId)
  } catch (error) {
    console.log("Error", error)
  }
  isLoading.value = false
}
const DeleteTodo = async (todoId) => {
  isLoading.value = true
  try {
    await TodoStore.deleteTodo(todoId)
    await TodoStore.loadTodos()
  } catch (error) {
    console.log("Error", error)
  }
  isLoading.value = false
}
const changeStatus = async (event, todoId) => {
  try {
    if (event.target.checked) {
      await TodoStore.editTodo({ status: "Done" }, todoId)
    } else {
      await TodoStore.editTodo({ status: "Doing" }, todoId)
    }
    await TodoStore.loadTodos()
  } catch (error) {
    console.log("Error", error)
  }
}
const changeSelect = async (newStatus) => {
  selectedStatus.value = newStatus
}
</script>

<template>
  <h1 class="text-3xl mb-2">HomeView</h1>
  <Loading v-if="isLoading"> </Loading>

  <div class="flex">
    <input
      class="input input-bordered w-full"
      type="text"
      v-model="todoText"
      placeholder="Add todo"
    />
    <button class="btn btn-primary ml-4 btn" @click="addTodo(todoText)">
      Add
    </button>
  </div>
  <div role="tablist" class="tabs tabs-boxed mt-2">
    <a
      v-for="status in TodoStore.statuses"
      :key="status"
      :class="status === selectedStatus ? 'tab tab-active' : 'tab'"
      @click="changeSelect(status)"
    >
      {{ status }}</a
    >
  </div>

  <div
    class="flex items-center justify-between mt-2"
    v-for="todo in FilterTodoList"
    :key="todo.id"
  >
    <div class="form-control">
      <label class="cursor-pointer label">
        <span class="label-text"></span>
        <input
          type="checkbox"
          :checked="todo.status === 'Done'"
          class="checkbox checkbox-success"
          @change="changeStatus($event, todo.id)"
        />
      </label>
    </div>
    <div :class="todo.status === 'Done' ? 'line-through' : ''">
      {{ todo.name }}
    </div>
    <div>
      <RouterLink :to="{ name: 'todo-edit', params: { id: todo.id } }">
        <button class="btn btn-square btn-outline">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
          >
            <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
            <path
              d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"
            />
          </svg>
        </button>
      </RouterLink>

      <button
        class="btn btn-square btn-outline ml-3"
        @click="DeleteTodo(todo.id)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 448 512"
        >
          <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
          <path
            d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
svg {
  fill: white;
}
</style>
