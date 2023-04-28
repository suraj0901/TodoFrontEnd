import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  useBoolean,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const [showPassword, setShowPassowrd] = useBoolean();
  const navigate = useNavigate();

  const handleClick = () => navigate("/");

  return (
    <Center>
      <Box p={8} boxShadow={"lg"} borderRadius={8} borderWidth={"thin"}>
        <Heading textAlign={"center"}>Login</Heading>
        <Box my={4} textAlign={"left"}>
          <form>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="Enter your email" />
            </FormControl>
            <FormControl my={"6"} isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your Password"
                />
                <InputRightElement width={"3rem"}>
                  <Button
                    h={"1.5rem"}
                    size={"sm"}
                    onClick={setShowPassowrd.toggle}
                  >
                    {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button onClick={handleClick} width={"full"} mt={4} type="submit">
              Sign In
            </Button>
          </form>
        </Box>
      </Box>
    </Center>
  );
};

export default Form;
