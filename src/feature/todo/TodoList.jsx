import {
  Alert,
  AlertIcon,
  Center,
  Spinner,
  StackDivider,
  VStack,
} from "@chakra-ui/react";
import TodoItem from "./TodoItem";

import TodoFilter from "./TodoFilter";
import useFilter from "./hooks/useFilter";
import Loader from "../../component/Loader";
import Error from "../../component/Error";

const TodoList = () => {
  const { isLoading, error, modifiedListOfTodos, ...rest } = useFilter();
  if (isLoading) return <Loader />;
  if (error) return <Error />;

  const todosItems = modifiedListOfTodos?.map?.((todo) => (
    <TodoItem key={todo.id} todo={todo} hideCompleted={rest.hideCompleted} />
  ));

  return (
    <VStack alignItems={"stretch"} width={"full"}>
      <TodoFilter {...rest} />
      <VStack flex={1} spacing={0}>
        {todosItems}
      </VStack>
    </VStack>
  );
};

export default TodoList;
