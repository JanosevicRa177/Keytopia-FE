import { Center, Text } from "@chakra-ui/react";
import { colorPallete } from "../../../styles/color";
import { Link } from "react-router-dom";
import { normalizeRoute } from "../../../utils/string.converter";

interface InnerLinkProps {
	chosen: string;
	text: string;
	setChosen: React.Dispatch<React.SetStateAction<string>>;
}

export const InnerLink: React.FC<InnerLinkProps> = (props) => {
	return (
		<Center
			onClick={() => {
				props.setChosen(props.text);
			}}
		>
			<Link to={normalizeRoute(props.text)}>
				<Text
					color={props.chosen === props.text ? colorPallete.inputBorderHover : "#343434"}
					borderBottom={props.chosen === props.text ? "1px" : "0px"}
					borderColor={colorPallete.inputBorderHover}
					fontWeight="700"
					transition={"0.2s ease"}
				>
					{props.text}
				</Text>
			</Link>
		</Center>
	);
};
