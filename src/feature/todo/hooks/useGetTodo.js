import useSWR from "swr"
import { todosUrlEndpoint } from "../../../app/api/todoApi"
import { getTodosApi } from "../../../app/api/todoApi"

const useGetTodo = () => {
    const { data, error, isLoading, isValidating } = useSWR(todosUrlEndpoint, getTodosApi)
    return {
        todos: data,
        error,
        isLoading,
        isValidating
    }
}

export default useGetTodo