import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useApplicationStore } from "../store/store";
import { colors } from "../style/color";
import { useEffect, useState } from "react";

export const Header = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const user = useApplicationStore((state) => state.user);
  const logout = useApplicationStore((state) => state.logout);
  let location = useLocation();
  const handleLogout = () => {
    logout();
    navigate("/unauthorized");
  };
  useEffect(() => {
    setIsOpen(Boolean(!location.pathname.match("/authorization")));
  }, [location]);

  return (
    <>
      <Box
        w={"100%"}
        position={"relative"}
        top={isOpen ? "0px" : "-70px"}
        transition={"0.2s ease"}
        zIndex={"100"}
      >
        <Box
          width="100%"
          p={"15px 25px"}
          position="fixed"
          bgGradient={colors.component}
          backdropFilter="auto"
          backdropBlur="4px"
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
                  <Link to="/authorization" color={"white"}>
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
      </Box>
      <Box height={"70px"}></Box>
    </>
  );
};
