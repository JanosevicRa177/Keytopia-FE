import { Center, Flex, Text } from "@chakra-ui/react";
import { RouteWithPartType } from "../../model/util.model";
import { colorPallete } from "../../styles/color";
import { normalizeRoute } from "../../utils/string.converter";
import { Link } from "react-router-dom";

interface ControlLinkKeyboardContainerProps {
	chosen: RouteWithPartType;
	setChosen: React.Dispatch<React.SetStateAction<RouteWithPartType>>;
}

export const ControlLinkKeyboardContainer = (props: ControlLinkKeyboardContainerProps) => {
	const keyboard: RouteWithPartType = { value: "Keyboards", route: "keyboard" };
	const scrollToTop = () => {
		window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
	};
	return (
		<Flex
			bgColor={"rgba(255,255,255,0.9)"}
			boxShadow={"4px 4px 12px 0px rgba(0,0,0,0.3)"}
			rounded={"8px"}
			flexDir={"column"}
			py={"12px"}
			fontSize={"xl"}
		>
			<Center
				onClick={() => {
					scrollToTop();
					props.setChosen(keyboard);
				}}
			>
				<Link to={normalizeRoute(keyboard.route)}>
					<Text
						color={
							props.chosen.value === keyboard.value
								? colorPallete.inputBorderHover
								: "#343434"
						}
						borderBottom={props.chosen.value === keyboard.value ? "1px" : "0px"}
						borderColor={colorPallete.inputBorderHover}
						transition={"0.2s ease"}
						whiteSpace={"nowrap"}
					>
						{keyboard.value}
					</Text>
				</Link>
			</Center>
		</Flex>
	);
};
