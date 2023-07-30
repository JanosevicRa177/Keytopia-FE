import { Flex } from "@chakra-ui/react";
import { colorPallete } from "../../styles/color";
import { Children } from "react";

interface UserControlComponentProps {
	isOpen: boolean;
	children: React.ReactNode;
}

export const UserControlComponent = ({ isOpen, children }: UserControlComponentProps) => {
	return (
		<Flex
			h={isOpen ? Children.toArray(children).length * 24 + 12 + "px" : "0px"}
			w={"150px"}
			position={"absolute"}
			left={"-135px"}
			top={"8px"}
			transition={"0.1s ease"}
			overflow={"hidden"}
		>
			<Flex
				bg={"white"}
				rounded={"8px"}
				border={"2px"}
				zIndex={"20"}
				w={"100%"}
				borderColor={colorPallete.inputBorder}
				h={"100%"}
				flexDirection={"column"}
				px={"8px"}
				py={"4px"}
			>
				{children}
			</Flex>
		</Flex>
	);
};
