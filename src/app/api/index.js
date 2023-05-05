import axios from "axios"

axios.defaults.retry = 3

const baseApi = axios.create({
    baseURL: "http://todoapi-r7dr.onrender.com/api",
    withCredentials: true
})


export default baseApi
