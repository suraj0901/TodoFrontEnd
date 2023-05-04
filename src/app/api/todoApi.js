import token from "../store/token.js"
import { refreshToken } from "./auth.api.js"
import baseApi from "./index.js"

baseApi.interceptors.request.use(config => {
    const authToken = token.get()
    if (authToken) {
        config.headers = {
            'Authorization': `Bearer ${authToken}`,
        }
    }
    return config
})

baseApi.interceptors.response.use(response => response, async (error) => {
    const originalRequest = error.config;
    if (error?.response?.status === 403 && !originalRequest?._retry) {
        originalRequest._retry = true;
        const access_token = await refreshToken();
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
        return baseApi(originalRequest);
    }
    return Promise.reject(error)
})


export const todosUrlEndpoint = '/todos'

export const getTodosApi = async () => {
    const response = await baseApi.get(todosUrlEndpoint)
    return response.data.slice(0, 20)
}

export const addTodoApi = async (todo) => {
    const response = await baseApi.post(todosUrlEndpoint, todo)
    return response.data
}

export const updateTodoApi = async (todo) => {
    const response = await baseApi.patch(`${todosUrlEndpoint}/${todo.id}`, todo)
    return response.data
}

export const deleteTodoApi = async ({ id }) => {
    const response = await baseApi.delete(`${todosUrlEndpoint}/${id}`)
    return response.data
}