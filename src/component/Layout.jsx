import { Outlet } from "react-router-dom";
import Appbar from "./Appbar";
import { Box } from "@chakra-ui/react";

const Layout = () => {
  return (
    <Box maxWidth={"8xl"} margin={"auto"}>
      <Appbar />
      <Outlet />
    </Box>
  );
};

export default Layout;
