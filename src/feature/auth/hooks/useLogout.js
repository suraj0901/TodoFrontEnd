import useSWRMutation from "swr/mutation"
import { logout } from "../../../app/api/auth.api"
import { useNavigate } from "react-router-dom"
import useCustomToast from "../../../hooks/useCustomToast"

const useLogout = () => {
    const navigate = useNavigate()
    const toast = useCustomToast()
    const { trigger, isMutating } = useSWRMutation('/logout', logout, {
        onSuccess: () => {
            navigate('/login')
        },
        onError: (err) => {
            console.log(err.stack)
            toast.error(err.message)
        }
    })
    return {
        logout: trigger,
        isLoading: isMutating
    }
}

export default useLogout