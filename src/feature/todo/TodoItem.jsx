import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Card,
  CardBody,
  Checkbox,
  HStack,
  IconButton,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";

import useEditableContent from "./hooks/useEditableContent";
import useDeleteTodo from "./hooks/useDeleteTodo";
import useUpdateTodo from "./hooks/useUpdateTodo";
import TodoDeleteAlert from "./TodoDeleteAlert";

const TodoItem = ({ todo: { title: text, completed, id } }) => {
  const {
    editableProp,
    isEditable,
    onEdit,
    editedText,
    cancelEditedContent,
    confirmEditedContent,
  } = useEditableContent();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const updateTodo = useUpdateTodo({
    onError: cancelEditedContent,
  });

  const deleteTodo = useDeleteTodo();
  const handleChange = async () => {
    await updateTodo({ id, title: text, completed: !completed });
  };

  const handleEdit = async (e) => {
    confirmEditedContent();
    await updateTodo({ title: editedText(), completed, id });
  };

  const handleDelete = async (e) => {
    await deleteTodo({ id });
  };

  const buttons = isEditable ? (
    <Stack direction={{ sm: "row", base: "column" }}>
      <IconButton variant={"ghost"} icon={<CheckIcon />} onClick={handleEdit} />
      <IconButton
        variant={"ghost"}
        icon={<CloseIcon />}
        onClick={cancelEditedContent}
      />
    </Stack>
  ) : (
    <Stack direction={{ sm: "row", base: "column" }}>
      {!completed && (
        <IconButton
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
  );

  return (
    <>
      <Card
        opacity={completed ? "0.3" : "1"}
        width={"full"}
        px={2}
        borderRadius={8}
        shadow={"lg"}
      >
        <CardBody padding={{ base: "1", sm: "5" }}>
          <Box>
            <HStack>
              <Checkbox onChange={handleChange} isChecked={completed} />
              <Box
                textDecoration={completed ? "line-through" : "none"}
                flex={1}
                p={1}
                {...editableProp}
              >
                {text}
              </Box>
              {buttons}
            </HStack>
          </Box>
        </CardBody>
      </Card>
      <TodoDeleteAlert
        isOpen={isOpen}
        onClose={onClose}
        onDelete={handleDelete}
      />
    </>
  );
};

export default TodoItem;
