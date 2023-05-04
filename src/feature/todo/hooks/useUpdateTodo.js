import { todosUrlEndpoint, updateTodoApi } from "../../../app/api/todoApi"
import { useSWRConfig } from "swr"
import useCustomToast from "../../../hooks/useCustomToast"

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
                        return [...previousTodo, updatedTodo]
                    },
                    rollbackOnError: true,
                    revalidate: false,
                    populateCache: (updated, todos) => {
                        const prevTodos = todos.filter(todo => todo.id !== updatedTodo.id)
                        return [...prevTodos, updatedTodo]
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
