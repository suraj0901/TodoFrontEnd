import axios from "redaxios"

const todosApi = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
})

export const todosUrlEndpoint = '/todos'

export const getTodosApi = async () => {
    const response = await todosApi.get(todosUrlEndpoint)
    return response.data.slice(0, 20)
}

export const addTodoApi = async (todo) => {
    const response = await todosApi.post(todosUrlEndpoint, todo)
    return response.data
}

export const updateTodoApi = async (todo) => {
    const response = await todosApi.patch(`${todosUrlEndpoint}/${todo.id}`, todo)
    return response.data
}

export const deleteTodoApi = async ({ id }) => {
    const response = await todosApi.delete(`${todosUrlEndpoint}/${id}`)
    return response.data
}