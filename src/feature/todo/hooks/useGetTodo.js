import useSWR from "swr"
import { todosUrlEndpoint } from "../../../api/todoApi"
import { getTodosApi } from "../../../api/todoApi"

const useGetTodo = () => {
    const { data, error, isLoading } = useSWR(todosUrlEndpoint, getTodosApi)
    return {
        todos: data,
        error,
        isLoading
    }
}

export default useGetTodo