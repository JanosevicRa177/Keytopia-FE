import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useApplicationStore } from "../store/store";
import { colors } from "../style/color";

export const Header = () => {
  const navigate = useNavigate();
  const user = useApplicationStore((state) => state.user);
  const logout = useApplicationStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <Box
        width="100%"
        bgGradient={colors.background}
        p={"15px 25px"}
        position="fixed"
      >
        <Flex
          w={"100%"}
          h={"40px"}
          alignItems={"center"}
          justifyContent="space-between"
        >
          <Link to="/">
            <Text color={"white"} fontWeight="700">
              Security
            </Text>
          </Link>
          {user != null && (
            <Link to={"/profile"}>
              <Text color={"white"}>
                {user.name} {user.surname}
              </Text>
            </Link>
          )}
          <Flex gap="15px">
            {user ? (
              <Text color={"white"} cursor={"pointer"} onClick={handleLogout}>
                Logout
              </Text>
            ) : (
              <Flex gap="15px">
                <Link to="/login" color={"white"}>
                  Login
                </Link>
                <Link to="/register" color={"white"}>
                  Register
                </Link>
              </Flex>
            )}
          </Flex>
        </Flex>
        {user?.role === "ADMIN" && (
          <Flex gap="15px">
            <Button onClick={() => navigate("/project-manager/projects")}>
              Projects
            </Button>
          </Flex>
        )}
        {user?.role === "BUYER" && (
          <Flex gap="15px">
            <Button onClick={() => navigate("engineers")}>Engineers</Button>
          </Flex>
        )}
      </Box>
      <Box height={"70px"}></Box>
    </>
  );
};
