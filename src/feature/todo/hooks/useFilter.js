import useGetTodo from "./useGetTodo";
import { useBoolean } from "@chakra-ui/react";
import { sorted } from "../../../hooks/helper"
const useFilter = () => {
    const { todos, error, isLoading } = useGetTodo();
    const [hideCompleted, setHideCompleted] = useBoolean();
    const [oldestFirst, setOldestFirst] = useBoolean();
    const [compltedFirst, setCompltedFirst] = useBoolean();
    const [showFilters, setShowFilters] = useBoolean();

    let modifiedListOfTodos = sorted(todos);
    if (oldestFirst) {
        modifiedListOfTodos = modifiedListOfTodos.reverse();
    }
    if (compltedFirst) {
        const completed = [],
            notCompleted = [];
        for (const todo of todos) {
            todo.completed ? completed.unshift(todo) : notCompleted.unshift(todo);
        }
        modifiedListOfTodos = [...completed, ...notCompleted];
    }

    const completed = todos?.reduce?.((a, b) => {
        if (b.completed) return a + 1;
        return a;
    }, 0);

    return {
        todos,
        total: todos?.length,
        error,
        isLoading,
        completed,
        toggleFilters: setShowFilters.toggle,
        showFilters,
        hideCompleted,
        compltedFirst,
        oldestFirst,
        toggleHideCompleted: setHideCompleted.toggle,
        toggleCompltedFirst: setCompltedFirst.toggle,
        toggleOldestFirst: setOldestFirst.toggle,
        modifiedListOfTodos
    }
}

export default useFilter