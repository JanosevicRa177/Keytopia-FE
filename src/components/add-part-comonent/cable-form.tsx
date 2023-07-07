import { Flex, Text } from "@chakra-ui/react";

export const CableForm = () => {
  return (
    <Flex
      color={"#343434"}
      bgColor={"rgba(255,255,255,0.6)"}
      w={"calc(100% - 32px)"}
      mx={"16px"}
      px={"24px"}
      py={"8px"}
      rounded={"16px"}
      position={"relative"}
      fontWeight={"bold"}
    >
      <Text fontSize={"xl"}>Cable</Text>
    </Flex>
  );
};
