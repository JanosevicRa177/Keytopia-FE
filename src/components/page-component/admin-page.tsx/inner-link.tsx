import { Center, Text } from "@chakra-ui/react";
import { colorPallete } from "../../../styles/color";
import { Link } from "react-router-dom";
import { normalizeRoute } from "../../../utils/string.converter";
import { RouteWithPartType } from "../../../model/util.model";

interface InnerLinkProps {
	chosen: RouteWithPartType;
	route: RouteWithPartType;
	setChosen: React.Dispatch<React.SetStateAction<RouteWithPartType>>;
}

export const InnerLink: React.FC<InnerLinkProps> = (props) => {
	return (
		<Center
			onClick={() => {
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
					fontWeight="700"
					transition={"0.2s ease"}
				>
					{props.route.value}
				</Text>
			</Link>
		</Center>
	);
};
