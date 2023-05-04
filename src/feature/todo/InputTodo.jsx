import { Box, Button, FormControl, Stack, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import useAddTodo from "./hooks/useAddTodo";
import useGetTodo from "./hooks/useGetTodo";

const InputTodo = () => {
  const { todos } = useGetTodo();
  const [todo, setTodo] = useState("");
  const addTodo = useAddTodo({
    onError: () => {
      setTodo(todo);
    },
  });

  const onTodoChange = (e) => setTodo(e.target.value);

  const handleSubmit = async () => {
    if (!todo.trim()) return;
    setTodo("");
    await addTodo({
      id: todos[0]?.id ?? 0 + 1,
      title: todo,
      completed: false,
    });
  };

  return (
    <Box>
      <Stack direction={{ lg: "row", base: "column" }}>
        <FormControl>
          <Textarea
            type="text"
            placeholder="Enter your todos"
            value={todo}
            onChange={onTodoChange}
          />
        </FormControl>
        <Button onClick={handleSubmit} px={10} type="submit">
          Add Todo
        </Button>
      </Stack>
    </Box>
  );
};

export default InputTodo;
