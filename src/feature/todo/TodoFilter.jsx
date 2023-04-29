import { ChevronDownIcon, ChevronUpIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Badge,
  Button,
  Checkbox,
  Collapse,
  HStack,
  Hide,
  Stack,
  Text,
  useColorMode,
  useMediaQuery,
} from "@chakra-ui/react";
import DeleteAllTodoButton from "./DeleteAllTodoButton";

const TodoFilter = ({
  todos,
  total,
  completed,
  toggleFilters,
  showFilters,
  hideCompleted,
  compltedFirst,
  oldestFirst,
  toggleHideCompleted,
  toggleCompltedFirst,
  toggleOldestFirst,
}) => {
  const [isMobile] = useMediaQuery(`(min-width: 768px)`);
  const { colorMode } = useColorMode();
  const filterCount = hideCompleted + oldestFirst + compltedFirst;
  return (
    <Stack
      position={"sticky"}
      top={0}
      zIndex={10}
      backgroundColor={colorMode === "dark" ? "gray.800" : "white"}
      direction={{ md: "row", base: "column" }}
      alignItems={{ md: "center", base: "stretch" }}
      spacing={{ base: 0, sm: 2 }}
      mt={4}
      py={2}
      borderBottomWidth={1}
    >
      <HStack
        flex={1}
        justifyContent={{ base: "space-between", md: "flex-start" }}
        spacing={{ base: "", md: "2rem" }}
      >
        <Text>
          Total:{" "}
          <Badge py={1} px={2} rounded={"full"}>
            {total}
          </Badge>
        </Text>
        <Text>
          Completed:{" "}
          <Badge py={1} px={2} rounded={"full"}>
            {completed}
          </Badge>
        </Text>
        <Hide above="md">
          <Button
            onClick={toggleFilters}
            variant={"outline"}
            leftIcon={showFilters ? <ChevronUpIcon /> : <ChevronDownIcon />}
            fontWeight={700}
            justifySelf={"flex-start"}
          >
            <HStack alignItems={"center"}>
              <Text>Filter</Text>
              {Boolean(filterCount) && (
                <Badge py={1} px={2} rounded={"full"}>
                  {filterCount}
                </Badge>
              )}
            </HStack>
          </Button>
        </Hide>
      </HStack>
      <Collapse in={showFilters || isMobile} animateOpacity>
        <Stack
          flex={1}
          direction={{ md: "row", base: "column" }}
          spacing={{ base: "1rem", sm: "2rem" }}
          padding={{ base: 2, sm: 0 }}
        >
          <Checkbox isChecked={oldestFirst} onChange={toggleOldestFirst}>
            Oldest First
          </Checkbox>
          <Checkbox
            isDisabled={hideCompleted}
            isChecked={compltedFirst}
            onChange={toggleCompltedFirst}
          >
            Completed First
          </Checkbox>
          <Checkbox isChecked={hideCompleted} onChange={toggleHideCompleted}>
            Hide Completed
          </Checkbox>
          <DeleteAllTodoButton todos={todos} completed={completed} />
        </Stack>
      </Collapse>
    </Stack>
  );
};

export default TodoFilter;
