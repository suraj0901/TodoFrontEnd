import axios from "axios"

axios.defaults.retry = 3

const baseApi = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true
})


export default baseApi
