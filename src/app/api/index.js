import axios from "axios"

axios.defaults.retry = 3

const baseApi = axios.create({
    baseURL: "https://todoapi-r7dr.onrender.com/api",
    withCredentials: true
})


export default baseApi
