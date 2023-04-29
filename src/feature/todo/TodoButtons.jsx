import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { IconButton, Stack, useDisclosure } from "@chakra-ui/react";
import useDeleteTodo from "./hooks/useDeleteTodo";
import useUpdateTodo from "./hooks/useUpdateTodo";
import TodoDeleteAlert from "./TodoDeleteAlert";

const TodoButtons = ({
  isEditable,
  cancelEditedContent,
  confirmEditedContent,
  editedText,
  updateTodo,
  completed,
  onEdit,
  id,
}) => {
  const { deleteTodo } = useDeleteTodo();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = async (e) => {
    await deleteTodo({ id });
  };
  const handleEdit = async (e) => {
    confirmEditedContent();
    await updateTodo({ title: editedText(), completed, id });
  };
  if (isEditable)
    return (
      <Stack direction={{ sm: "row", base: "column" }}>
        <IconButton
          variant={"ghost"}
          icon={<CheckIcon />}
          onClick={handleEdit}
        />
        <IconButton
          variant={"ghost"}
          icon={<CloseIcon />}
          onClick={cancelEditedContent}
        />
      </Stack>
    );
  return (
    <>
      <Stack
        spacing={{ base: 0, sm: 1 }}
        direction={{ sm: "row", base: "column" }}
      >
        {!completed && (
          <IconButton
            display={{ base: "none", sm: !completed && "block" }}
            colorScheme="blue"
            variant={"ghost"}
            icon={<EditIcon />}
            onClick={onEdit}
          />
        )}
        <IconButton
          colorScheme="red"
          variant={"ghost"}
          icon={<DeleteIcon />}
          onClick={onOpen}
        />
      </Stack>
      <TodoDeleteAlert
        isOpen={isOpen}
        onClose={onClose}
        onDelete={handleDelete}
      />
    </>
  );
};

export default TodoButtons;
