import { Box, Text } from "@chakra-ui/react";
import { MainContrainer } from "../components/page-component/mainContainer";

export const MainPage = () => {
  return (
    <MainContrainer>
      <Box h={"1500px"}>
        <Text>Main!</Text>
      </Box>
    </MainContrainer>
  );
};
