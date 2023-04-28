import { Box, Flex, Heading } from "@chakra-ui/react";
import ThemeToggler from "./ThemeToggler";

const Appbar = () => {
  return (
    <Flex justifyContent={"space-between"} p={4}>
      <Heading>Make Your List</Heading>
      <ThemeToggler />
    </Flex>
  );
};

export default Appbar;
