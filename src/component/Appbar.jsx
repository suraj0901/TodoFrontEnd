import {
  Avatar,
  Button,
  Flex,
  HStack,
  Heading,
  Icon,
  IconButton,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
} from "@chakra-ui/react";
import ThemeToggler from "./ThemeToggler";
import useLogout from "../feature/auth/hooks/useLogout";
import { useUser } from "../app/store/user";

const LogoutIcon = (props) => (
  <Icon viewBox="0 0 500 500" {...props}>
    <path
      fill="currentColor"
      d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"
    />
  </Icon>
);

const Appbar = () => {
  const { logout, isLoading } = useLogout();
  const [user] = useUser();
  return (
    <Flex justifyContent={"space-between"} p={4}>
      <Heading>Make Your List</Heading>
      <HStack>
        <ThemeToggler />
        <Popover>
          <PopoverTrigger>
            <Avatar cursor={"pointer"} name={user} />
          </PopoverTrigger>
          <Portal>
            <PopoverContent w={"8.5rem"}>
              <PopoverArrow />
              <PopoverBody>
                <Button
                  variant={"ghost"}
                  isLoading={isLoading}
                  onClick={logout}
                  leftIcon={<LogoutIcon />}
                >
                  Logout
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>
      </HStack>
    </Flex>
  );
};

export default Appbar;
