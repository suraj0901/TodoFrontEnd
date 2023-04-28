import { useToast } from "@chakra-ui/react"

const useCustomToast = () => {
    const toast = useToast({
        position: "top",
        isClosable: true,
    })
    const success = (description) => toast({ status: "success", description, duration: 900 })
    const error = (description) => toast({ status: 'error', description })
    return { success, error }
}

export default useCustomToast