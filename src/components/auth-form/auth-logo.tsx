import { Box, Center } from "@chakra-ui/react";

export const AuthLogo = () => {
  return (
    <Center
      w={"100vw"}
      h={"calc(100vh - 35px)"}
      position={"absolute"}
      overflow={"hidden"}
    >
      <Box w={"55%"} h={"80%"} position={"relative"} id="alooooo">
        <Box
          bg={"red"}
          zIndex={"50"}
          left={"calc(50% - 35px)"}
          top={"-35px"}
          transition={"0.5s ease"}
          position={"absolute"}
          w={"70px"}
          h={"70px"}
        />
      </Box>
    </Center>
  );
};
