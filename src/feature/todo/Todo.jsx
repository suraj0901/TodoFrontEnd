import { Box, VStack } from "@chakra-ui/react";
import InputTodo from "./InputTodo";
import TodoList from "./TodoList";

const Todo = () => {
  return (
    <>
      <Box p={4}>
        <InputTodo />
        <Box mt={6}>
          <TodoList />
        </Box>
      </Box>
    </>
  );
};

export default Todo;
