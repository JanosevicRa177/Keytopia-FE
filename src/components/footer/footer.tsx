import { Flex, Text } from "@chakra-ui/react";
import { colors } from "../../styles/color";

export const Footer = () => {
	return (
		<Flex
			bgGradient={colors.component}
			color={"#fff"}
			h={"35px"}
			alignItems="center"
			justifyContent="center"
			mt="auto"
			backdropFilter="auto"
			backdropBlur="4px"
		>
			<footer>
				<Text fontSize={"xl"}>© 2023 Keytopia</Text>
			</footer>
		</Flex>
	);
};
