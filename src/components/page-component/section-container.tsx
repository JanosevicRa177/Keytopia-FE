import { Flex } from "@chakra-ui/react";

export enum SectionStyle {
	left,
	right,
}

export const SectionContainer: React.FC<{
	children: React.ReactNode;
	style: SectionStyle;
}> = (props) => {
	return (
		<Flex
			bg={"rgba(255,255,255,0.8)"}
			backdropFilter="auto"
			backdropBlur="4px"
			w={"calc(100% - 32px)"}
			boxShadow={"4px 4px 16px 0px rgba(0,0,0,0.2)"}
			h={"400px"}
			my={"32px"}
			mx={"16px"}
			rounded={"16px"}
			position={"relative"}
			flexDir={props.style === SectionStyle.right ? "row-reverse" : "row"}
		>
			{props.children}
		</Flex>
	);
};
