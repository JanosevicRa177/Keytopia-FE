import { Flex, Text } from "@chakra-ui/react";
import { RouteWithPartType } from "../../model/util.model";
import { colorPallete } from "../../styles/color";
import { normalizeRoute } from "../../utils/string.converter";
import { Link } from "react-router-dom";

interface InnerLinkProps {
	chosen: RouteWithPartType;
	route: RouteWithPartType;
	setChosen: React.Dispatch<React.SetStateAction<RouteWithPartType>>;
}

export const InnerLink: React.FC<InnerLinkProps> = (props) => {
	const scrollToTop = () => {
		window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
	};
	return (
		<Flex
			ml={"14px"}
			onClick={() => {
				scrollToTop();
				props.setChosen(props.route);
			}}
		>
			<Link to={normalizeRoute(props.route.route)}>
				<Text
					color={
						props.chosen.value === props.route.value
							? colorPallete.inputBorderHover
							: "#343434"
					}
					borderBottom={props.chosen.value === props.route.value ? "1px" : "0px"}
					borderColor={colorPallete.inputBorderHover}
					transition={"0.2s ease"}
					whiteSpace={"nowrap"}
				>
					{props.route.value}
				</Text>
			</Link>
		</Flex>
	);
};
