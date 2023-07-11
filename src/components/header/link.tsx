import { Text } from "@chakra-ui/react";
import { colorPallete } from "../../styles/color";
import { Link, useLocation } from "react-router-dom";

interface CustomLinkProps {
  link: string;
  text: string;
}

export const CustomLink: React.FC<CustomLinkProps> = (props) => {
  let location = useLocation();
  return (
    <Link to={props.link}>
      <Text
        color={
          Boolean(location.pathname.match(props.link))
            ? colorPallete.inputBorderHover
            : "white"
        }
        borderBottom={
          Boolean(location.pathname.match(props.link)) ? "1px" : "0px"
        }
        borderColor={colorPallete.inputBorderHover}
        fontWeight="700"
        transition={"0.2s ease"}
      >
        {props.text}
      </Text>
    </Link>
  );
};
