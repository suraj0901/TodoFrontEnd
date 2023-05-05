import { useSWRConfig } from "swr"
import useCustomToast from "../../../hooks/useCustomToast"
import { addTodoApi, todosUrlEndpoint } from "../../../app/api/todoApi"

const useAddTodo = ({
    onSuccess,
    onError
}) => {
    const toast = useCustomToast()
    const { mutate } = useSWRConfig()
    return async (newTodo) => {
        try {
            await mutate(
                todosUrlEndpoint,
                addTodoApi(newTodo),
                {
                    optimisticData: todos => [newTodo, ...todos],
                    rollbackOnError: true,
                    revalidate: false,
                    populateCache: (added, todos) => [...todos, added],
                }
            )
            toast.success("Created todo")
            onSuccess?.()
        } catch (error) {
            console.log(error.stack)
            toast.error(error.message)
            onError?.()
        }
    }
}

export default useAddTodo