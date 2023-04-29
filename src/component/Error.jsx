import { Alert, AlertIcon } from "@chakra-ui/react";

const Error = (error) => {
  console.log(error.stack);
  return (
    <Alert status="error">
      <AlertIcon />
      {error.message}
    </Alert>
  );
};

export default Error;
