import { Flex, Text } from "@chakra-ui/react";
import { InnerLink } from "./inner-link";
import { RouteWithPartType } from "../../model/util.model";

interface ControlLinkContainerProps {
	chosen: RouteWithPartType;
	names: RouteWithPartType[];
	header: string;
	setChosen: React.Dispatch<React.SetStateAction<RouteWithPartType>>;
}

export const ControlLinkContainer = (props: ControlLinkContainerProps) => {
	return (
		<Flex
			bgColor={"rgba(255,255,255,0.9)"}
			boxShadow={"4px 4px 12px 0px rgba(0,0,0,0.3)"}
			rounded={"8px"}
			px={"18px"}
			flexDir={"column"}
			py={"7px"}
		>
			<Text
				mr={"12px"}
				w={"85px"}
				fontWeight={"bold"}
				fontSize={"large"}
				textShadow={"4px 4px 12px 6px rgb(0,0,0)"}
			>
				{props.header}
			</Text>
			<Flex flexDir={"column"} fontSize={"sm"}>
				{props.names.map((route) => {
					return (
						<InnerLink
							key={route.value}
							route={route}
							chosen={props.chosen}
							setChosen={props.setChosen}
						/>
					);
				})}
			</Flex>
		</Flex>
	);
};
