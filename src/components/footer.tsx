import { Flex, Text } from "@chakra-ui/react";
import { colors } from "../style/color";

export const Footer = () => {
  return (
    <Flex
      bgGradient={colors.background}
      color={"#fff"}
      h={"35px"}
      alignItems="center"
      justifyContent="center"
      mt="auto"
    >
      <Text>© 2023 Keytopia</Text>
    </Flex>
  );
};
