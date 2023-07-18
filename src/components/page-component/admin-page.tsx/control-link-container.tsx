import { Flex, Text } from "@chakra-ui/react";
import { InnerLink } from "./inner-link";

interface ControlLinkContainerProps {
	chosen: string;
	names: string[];
	header: string;
	setChosen: React.Dispatch<React.SetStateAction<string>>;
}

export const ControlLinkContainer = (props: ControlLinkContainerProps) => {
	return (
		<Flex
			bgColor={"rgba(255,255,255,0.9)"}
			boxShadow={"4px 4px 12px 0px rgba(0,0,0,0.3)"}
			rounded={"8px"}
			px={"18px"}
		>
			<Text fontSize={"3xl"} mr={"12px"} mb={"8px"}>
				{props.header}:
			</Text>
			<Flex columnGap={"12px"} fontSize={"xl"}>
				{props.names.map((name) => {
					return (
						<InnerLink
							key={name}
							text={name}
							chosen={props.chosen}
							setChosen={props.setChosen}
						/>
					);
				})}
			</Flex>
		</Flex>
	);
};
