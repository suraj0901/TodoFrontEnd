import { Box, Hide, IconButton, Show, VStack } from "@chakra-ui/react";
import InputTodo from "./InputTodo";
import TodoList from "./TodoList";
import { AddIcon } from "@chakra-ui/icons";

const Todo = () => {
  return (
    <>
      <Box px={4} pb={4}>
        <InputTodo />
        {/* <Hide below="sm"></Hide>
        <Show below="sm">
          <IconButton
            position={"fixed"}
            bottom={5}
            right={5}
            zIndex={10}
            variant={"solid"}
            rounded={"full"}
            width={"4rem"}
            height={"4rem"}
            colorScheme="blue"
            fontSize={"1.5rem"}
            icon={<AddIcon />}
          />
        </Show> */}
        <Box marginTop={{ base: 0, sm: 6 }}>
          <TodoList />
        </Box>
      </Box>
    </>
  );
};

export default Todo;
