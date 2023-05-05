import {
  Button,
  Card,
  CardBody,
  Center,
  Icon,
  Link,
  Spinner,
} from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import useLogin from "./hooks/useLogin.js";
import { useEffect } from "react";

const GoogleIcon = (props) => (
  <Icon viewBox="0 0 500 500" {...props}>
    <path
      fill="currentColor"
      d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
    />
  </Icon>
);

const loginByGoogle = `https://todoapi-r7dr.onrender.com/api/auth/login/google`;

const Login = () => {
  const [searchParam] = useSearchParams();
  const { login, isLoading } = useLogin();

  useEffect(() => {
    if (searchParam.get("callback")) {
      login();
    }
  }, []);

  return (
    <Center width={"full"} height={"80vh"}>
      {isLoading && <Spinner />}
      {!isLoading && (
        <Card p={4}>
          <CardBody>
            <Link href={loginByGoogle}>
              <Button variant={"outline"} leftIcon={<GoogleIcon />}>
                Sign In With Google
              </Button>
            </Link>
          </CardBody>
        </Card>
      )}
    </Center>
  );
};

export default Login;
