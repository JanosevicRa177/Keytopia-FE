import { Flex, Box } from "@chakra-ui/react";

export const MainContrainer: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  return (
    <Flex
      bg={"rgba(255,255,255,0.5)"}
      alignItems="center"
      w={"1140px"}
      h={"100%"}
      mx={"auto"}
      backdropFilter="auto"
      backdropBlur="4px"
    >
      {props.children}
    </Flex>
  );
};
