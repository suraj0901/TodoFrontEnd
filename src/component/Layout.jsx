import { Navigate, Outlet } from "react-router-dom";
import Appbar from "./Appbar";
import { Box } from "@chakra-ui/react";
import { useToken } from "../app/store/token";

const Layout = () => {
  const [token] = useToken();
  if (!token) return <Navigate to={"/login"} />;
  return (
    <Box maxWidth={"5xl"} margin={"auto"}>
      <Appbar />
      <Outlet />
    </Box>
  );
};

export default Layout;
