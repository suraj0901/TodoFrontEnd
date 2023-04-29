import { Button, useDisclosure } from "@chakra-ui/react";
import useDeleteTodo from "./hooks/useDeleteTodo";
import TodoDeleteAlert from "./TodoDeleteAlert";
import { DeleteIcon } from "@chakra-ui/icons";

const DeleteAllTodoButton = ({ todos, completed }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { deleteAllTodo } = useDeleteTodo();
  const handleDeleteAllTodo = async (e) => {
    onClose();
    const completedTodosId = todos
      .filter((todo) => todo.completed)
      .map((todo) => todo.id);
    if (completedTodosId) await deleteAllTodo(completedTodosId);
  };
  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme="red"
        variant={"solid"}
        isDisabled={!completed}
        leftIcon={<DeleteIcon />}
      >
        Delete All Completed
      </Button>
      <TodoDeleteAlert
        title="Delete All Completed Todos"
        isOpen={isOpen}
        onClose={onClose}
        onDelete={handleDeleteAllTodo}
      />
    </>
  );
};

export default DeleteAllTodoButton;
