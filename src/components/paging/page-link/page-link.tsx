import { Text } from "@chakra-ui/react";
import { colorPallete } from "../../../styles/color";

interface PageLinkProps {
	onClick: () => void;
	disabled: boolean;
	active?: boolean;
	children: React.ReactNode;
	notNumber: boolean;
}

export const PageLink: React.FC<PageLinkProps> = (props) => {
	return (
		<>
			{props.disabled ? (
				<Text
					cursor={"default"}
					color={"gray.400"}
					transition={"0.2s ease"}
					mx={props.notNumber ? "8px" : ""}
				>
					{props.children}
				</Text>
			) : (
				<Text
					onClick={props.onClick}
					color={props.active ? "white" : "black"}
					w={props.notNumber ? "" : "24px"}
					bg={props.active ? colorPallete.button : ""}
					cursor={"pointer"}
					textAlign={"center"}
					rounded={"32px"}
					transition={"0.2s ease"}
					mx={props.notNumber ? "8px" : ""}
				>
					{props.children}
				</Text>
			)}
		</>
	);
};
