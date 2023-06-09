import { useSyncExternalStore } from "react"

const atom = (state) => {
    const subscribers = new Set()
    return {
        get: () => state,
        set: newState => {
            state = newState
            subscribers.forEach(subscriber => subscriber())
        },
        subscribe(callback) {
            subscribers.add(callback)
            return () => subscribers.delete(callback)
        }
    }
}

export const useAtom = (atom) => {
    return [useSyncExternalStore(atom.subscribe, atom.get), atom.set]
}

export default atom