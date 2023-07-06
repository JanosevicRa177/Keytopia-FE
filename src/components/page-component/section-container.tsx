import { Flex } from "@chakra-ui/react";

export enum SectionStyle {
  left,
  right,
}

export const SectionContainer: React.FC<{
  children: React.ReactNode;
  style: SectionStyle;
}> = (props) => {
  return (
    <Flex
      color={"rgba(255,255,255,0.8)"}
      backdropFilter="auto"
      backdropBlur="4px"
      w={"calc(100% - 32px)"}
      h={"400px"}
      my={"32px"}
      mx={"16px"}
      rounded={"16px"}
      position={"relative"}
      flexDir={props.style === SectionStyle.right ? "row-reverse" : "row"}
    >
      {props.children}
    </Flex>
  );
};
