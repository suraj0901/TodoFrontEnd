import { deleteTodoApi, todosUrlEndpoint } from "../../../api/todoApi"
import { useSWRConfig } from "swr"
import useCustomToast from "../../../hooks/useCustomToast"


const useDeleteTodo = () => {
    const toast = useCustomToast()
    const { mutate } = useSWRConfig()
    const deleteAllTodo = async (list) => {
        try {
            await mutate(
                todosUrlEndpoint,
                Promise.all(
                    list.map(id => deleteTodoApi({ id }))
                ),
                {
                    optimisticData: (todos) => todos.filter(todo => !list.some(id => id === todo.id)),
                    revalidate: false,
                    rollbackOnError: true,
                    populateCache: (_res, todos) => todos.filter(todo => !list.some(id => id === todo.id))
                }
            )

            toast.success(`Deleted All Completed ${list.length} Todo`)
        } catch (error) {
            console.log(error.stack);
            toast.error(error.message)
        }
    }
    const deleteTodo = async ({ id }) => {
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
            toast.success("Deleted Todo")
        } catch (error) {
            console.log(error.stack);
            toast.error(error.message)
        }
    }
    return { deleteTodo, deleteAllTodo }
}

export default useDeleteTodo