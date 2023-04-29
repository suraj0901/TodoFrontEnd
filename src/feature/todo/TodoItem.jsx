import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Card,
  CardBody,
  Checkbox,
  Collapse,
  Fade,
  HStack,
  IconButton,
  ScaleFade,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";

import useEditableContent from "./hooks/useEditableContent";
import useUpdateTodo from "./hooks/useUpdateTodo";
import TodoButtons from "./TodoButtons";

const TodoItem = ({ todo: { title: text, completed, id }, hideCompleted }) => {
  const {
    editableProp,
    isEditable,
    onEdit,
    editedText,
    cancelEditedContent,
    confirmEditedContent,
  } = useEditableContent();

  const updateTodo = useUpdateTodo({
    onError: cancelEditedContent,
  });

  const handleChange = async () => {
    await updateTodo({ id, title: text, completed: !completed });
  };

  return (
    <Box width={"full"}>
      <Collapse unmountOnExit in={!(completed && hideCompleted)} animateOpacity>
        <Card
          marginY={1}
          opacity={completed ? "0.3" : "1"}
          borderRadius={8}
          scaleY={!(completed && hideCompleted) ? 0 : 1}
        >
          <CardBody padding={{ base: 3, sm: 5 }}>
            <Box>
              <HStack>
                <Checkbox onChange={handleChange} isChecked={completed} />
                <Box
                  textDecoration={completed ? "line-through" : "none"}
                  flex={1}
                  p={1}
                  onDoubleClick={() => {
                    if (!completed) onEdit();
                  }}
                  {...editableProp}
                >
                  {text}
                </Box>
                <TodoButtons
                  {...{
                    isEditable,
                    cancelEditedContent,
                    confirmEditedContent,
                    editedText,
                    completed,
                    updateTodo,
                    onEdit,
                    id,
                  }}
                />
              </HStack>
            </Box>
          </CardBody>
        </Card>
      </Collapse>
    </Box>
  );
};

export default TodoItem;
