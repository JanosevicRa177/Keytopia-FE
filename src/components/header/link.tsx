import { Flex, Text } from "@chakra-ui/react";
import { colorPallete } from "../../styles/color";
import { Link, useLocation } from "react-router-dom";

interface CustomLinkProps {
	link: string;
	text: string;
}

export const CustomLink: React.FC<CustomLinkProps> = (props) => {
	let location = useLocation();
	return (
		<Flex h={"25px"}>
			<Link to={props.link}>
				<Text
					fontWeight={location.pathname === props.link ? "700" : "500"}
					borderBottom={location.pathname === props.link ? "1px" : "0px"}
					borderColor={colorPallete.choosenLink}
					color="white"
					transition={"0.2s ease"}
					lineHeight={location.pathname === props.link ? "23px" : "24px"}
				>
					{props.text}
				</Text>
			</Link>
		</Flex>
	);
};
