import { Flex } from "@chakra-ui/react";

export const MainContrainer: React.FC<{ children: React.ReactNode }> = (props) => {
	return (
		<Flex
			alignItems="center"
			w={"1140px"}
			h={"100%"}
			mx={"auto"}
			flexDir={"column"}
			position={"relative"}
		>
			{props.children}
		</Flex>
	);
};
