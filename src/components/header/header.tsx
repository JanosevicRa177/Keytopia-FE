import { Box, Flex, Text } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useApplicationStore } from "../../store/store";
import { colors } from "../../styles/color";
import { useEffect, useState } from "react";
import { CustomLink } from "./link";

export const Header = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const user = useApplicationStore((state) => state.user);
  const logout = useApplicationStore((state) => state.logout);
  const showLogin = useApplicationStore((state) => state.showLogin);
  const showRegister = useApplicationStore((state) => state.showRegister);
  let location = useLocation();
  function handleLogout() {
    logout();
    navigate("/");
  }
  async function handleLogin() {
    showLogin().then(() => {
      navigate("/authorization");
    });
  }
  async function handleRegister() {
    showRegister().then(() => {
      navigate("/authorization");
    });
  }
  useEffect(() => {
    setIsOpen(Boolean(!location.pathname.match("/authorization")));
  }, [location]);

  return (
    <>
      <Box
        position={"relative"}
        top={isOpen ? "0px" : "-70px"}
        transition={"0.2s ease"}
        w={"100%"}
        zIndex={"100"}
      >
        <Box
          p={"15px 25px"}
          position="fixed"
          w={"100%"}
          bgGradient={colors.component}
          backdropFilter="auto"
          backdropBlur="4px"
        >
          <Box w={"1140px"} mx={"auto"}>
            <Flex
              w={"100%"}
              h={"40px"}
              alignItems={"center"}
              justifyContent="space-between"
            >
              <Flex gap={"16px"}>
                <CustomLink link={"/"} text={"Security"} />
                <Box w={"24px"}></Box>
                {user?.role !== "ADMIN" ? (
                  <>
                    <CustomLink link={"/shop-parts"} text={"Shop parts"} />
                    <CustomLink
                      link={"/shop-keyboard"}
                      text={"Shop custom keyboard"}
                    />
                    <CustomLink
                      link={"/custom-keyboard"}
                      text={"Make your own keyboard"}
                    />
                  </>
                ) : (
                  <>
                    <CustomLink link={"/parts"} text={"Parts"} />
                    <CustomLink link={"/add-part"} text={"Add part"} />
                    <CustomLink link={"/procurements"} text={"Procurements"} />
                    <CustomLink link={"/orders"} text={"Orders"} />
                  </>
                )}
              </Flex>
              <Flex gap="15px">
                {user ? (
                  <Text
                    color={"white"}
                    cursor={"pointer"}
                    onClick={handleLogout}
                    fontWeight={"bold"}
                  >
                    Logout
                  </Text>
                ) : (
                  <Flex gap="15px" color={"white"}>
                    <Text onClick={() => handleLogin()} fontWeight={"bold"}>
                      Login
                    </Text>
                    <Text onClick={() => handleRegister()} fontWeight={"bold"}>
                      Register
                    </Text>
                  </Flex>
                )}
              </Flex>
            </Flex>
          </Box>
        </Box>
      </Box>
      <Box height={"70px"}></Box>
    </>
  );
};
