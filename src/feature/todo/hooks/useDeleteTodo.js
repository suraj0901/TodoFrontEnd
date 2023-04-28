import { deleteTodoApi, todosUrlEndpoint } from "../../../api/todoApi"
import { useSWRConfig } from "swr"
import useCustomToast from "../../../hooks/useCustomToast"

const useDeleteTodo = () => {
    const toast = useCustomToast()
    const { mutate } = useSWRConfig()

    return async ({ id }) => {
        try {
            await mutate(
                todosUrlEndpoint,
                deleteTodoApi({ id }),
                {
                    optimisticData: (todos) => todos.filter(todo => todo.id !== id),
                    revalidate: false,
                    rollbackOnError: true,
                    populateCache: (_res, todos) => todos.filter(todo => todo.id !== id)
                }
            )
            toast.success("deleted Todo")
        } catch (error) {
            console.log(error.stack);
            toast.error(error.message)
        }
    }
}

export default useDeleteTodo