import atom, { useAtom } from "./atom";

const user = atom(localStorage.getItem("user"))

export const useUser = () => useAtom(user)

export default user
