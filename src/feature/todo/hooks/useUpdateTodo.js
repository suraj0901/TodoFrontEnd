import { todosUrlEndpoint, updateTodoApi } from "../../../api/todoApi"
import { useSWRConfig } from "swr"
import useCustomToast from "../../../hooks/useCustomToast"
import { sorted } from "../../../hooks/helper"

const useUpdateTodo = ({
    onSuccess,
    onError
}) => {
    const toast = useCustomToast()
    const { mutate } = useSWRConfig()
    return async (updatedTodo) => {
        try {
            await mutate(
                todosUrlEndpoint,
                updateTodoApi(updatedTodo),
                {
                    optimisticData: (todos) => {
                        const previousTodo = todos.filter(todo => todo.id !== updatedTodo.id)
                        return sorted([...previousTodo, updatedTodo])
                    },
                    rollbackOnError: true,
                    revalidate: false,
                    populateCache: (updated, todos) => {
                        const prevTodos = todos.filter(todo => todo.id !== updatedTodo.id)
                        return sorted([...prevTodos, updatedTodo])
                    }
                }
            )
            toast.success("Updated Todo")
            onSuccess?.()
        } catch (error) {
            console.log(error.stack);
            toast.error(error.message)
            onError?.(error)
        }

    }
}

export default useUpdateTodo
