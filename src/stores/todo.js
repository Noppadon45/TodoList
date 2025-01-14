import { defineStore } from "pinia"
import axios from "axios"
const BASE_URL = "https://67860bc5f80b78923aa53158.mockapi.io"

export const useTodoStore = defineStore("todo", {
  state: () => ({
    list: [],
    selectedTodo: {},
    status: ["Pending", "Doing", "Done"],
  }),
  actions: {
    async loadTodos() {
      try {
        const response = await axios.get(`${BASE_UR}/todos`)
        this.list = response.data
      } catch (error) {
        console.log("Error", error)
      }
    },
    async loadTodo(id) {
      try {
        const response = await axios.get(`${BASE_URL}/todos/${id}`)
        this.selectedTodo = response.data
      } catch (error) {
        console.log("Error", error)
      }
    },
    async addTodo(todoText) {
      const bodyData = {
        name: "todoText",
        status: "Pending",
      }
      try {
        const response = await axios.post(`${BASE_URL}/todos/${id}`, bodyData)
        console.log("Add todo completed")
      } catch (error) {
        console.log("Error", error)
      }
    },
    async editTodo(todoData, id) {
      try {
        const response = await axios.put(`${BASE_URL}/todos/${id}`, todoData)
        console.log("Edit todo completed")
      } catch (error) {
        console.log("Error", error)
      }
    },
    async deleteTodo(id) {
      try {
        const response = await axios.delete(`${BASE_URL}/todos/${id}`)
        console.log("Delete todo completed")
      } catch (error) {
        console.log("Error", error)
      }
    },
  },
})
