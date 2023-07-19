import { Flex } from "@chakra-ui/react";

export const ControlContainer: React.FC<{
	children: React.ReactNode;
}> = (props) => {
	return (
		<Flex
			color={"#343434"}
			w={"calc(100% - 16px)"}
			my={"8px"}
			mx={"16px"}
			px={"16px"}
			py={"16px"}
			fontWeight={"bold"}
			columnGap={"12px"}
			rowGap={"12px"}
			flexWrap={"wrap"}
		>
			{props.children}
		</Flex>
	);
};
