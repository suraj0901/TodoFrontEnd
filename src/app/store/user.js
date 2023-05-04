import atom, { useAtom } from "./atom";

const user = atom(null)

export const useUser = () => useAtom(user)

export default user
