import useSWR from "swr"
import { todosUrlEndpoint } from "../../../api/todoApi"
import { getTodosApi } from "../../../api/todoApi"
import { sorted } from "../../../hooks/helper"

const useGetTodo = () => {
    const { data, error, isLoading } = useSWR(todosUrlEndpoint, getTodosApi)
    return {
        todos: sorted(data),
        error,
        isLoading
    }
}

export default useGetTodo