import {
  Alert,
  AlertIcon,
  Box,
  Spinner,
  Stack,
  StackDivider,
  VStack,
} from "@chakra-ui/react";
import TodoItem from "./TodoItem";
import useGetTodo from "./hooks/useGetTodo";

const TodoList = () => {
  const { todos, error, isLoading } = useGetTodo();

  if (isLoading) return <Spinner />;
  if (error) {
    console.log(error.stack);
    return (
      <Alert status="error">
        <AlertIcon />
        {error.message}
      </Alert>
    );
  }

  let completed = [],
    notCompleted = [];
  for (const todo of todos) {
    todo.completed ? completed.push(todo) : notCompleted.push(todo);
  }
  const completedTodos = completed.map((todo) => (
    <TodoItem key={todo.id} todo={todo} />
  ));
  const notCompletedTodos = notCompleted.map((todo) => (
    <TodoItem key={todo.id} todo={todo} />
  ));

  return (
    <Stack direction={{ base: "column", md: "row" }} divider={<StackDivider />}>
      <VStack flex={1} spacing={2}>
        {notCompletedTodos}
      </VStack>
      <VStack flex={1} spacing={2}>
        {completedTodos}
      </VStack>
    </Stack>
  );
};

export default TodoList;
