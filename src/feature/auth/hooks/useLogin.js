import useSWRMutation from "swr/mutation"
import { refreshToken } from "../../../app/api/auth.api"
import { useNavigate } from "react-router-dom"
import useCustomToast from "../../../hooks/useCustomToast"

const useLogin = () => {
    const navigate = useNavigate()
    const toast = useCustomToast()
    const { trigger, isMutating } = useSWRMutation('/login', refreshToken, {
        onSuccess: () => {
            navigate('/')
        },
        onError: (err) => {
            console.log(err.stack)
            toast.error(err.message)
        }
    })
    return {
        login: trigger,
        isLoading: isMutating
    }
}

export default useLogin