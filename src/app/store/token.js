import atom, { useAtom } from "./atom";

const token = atom(localStorage.getItem("token"))

export const useToken = () => useAtom(token)
export default token 
