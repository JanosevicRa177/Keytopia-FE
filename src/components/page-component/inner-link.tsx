import { Box, Text } from "@chakra-ui/react";
import { colorPallete } from "../../style/color";

interface InnerLinkProps {
  chosen: string;
  text: string;
  setChosen: React.Dispatch<React.SetStateAction<string>>;
}

export const InnerLink: React.FC<InnerLinkProps> = (props) => {
  return (
    <Box onClick={() => props.setChosen(props.text)} cursor={"pointer"}>
      <Text
        color={
          props.chosen === props.text
            ? colorPallete.inputBorderHover
            : "#343434"
        }
        borderBottom={props.chosen === props.text ? "1px" : "0px"}
        borderColor={colorPallete.inputBorderHover}
        fontWeight="700"
        transition={"0.2s ease"}
      >
        {props.text}
      </Text>
    </Box>
  );
};
