import { useSWRConfig } from "swr"
import useCustomToast from "../../../hooks/useCustomToast"
import { sorted } from "../../../hooks/helper"
import { addTodoApi, todosUrlEndpoint } from "../../../api/todoApi"

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
                    optimisticData: todos => sorted([...todos, newTodo]),
                    rollbackOnError: true,
                    populateCache: (added, todos) => sorted([...todos, newTodo]),
                    revalidate: false
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