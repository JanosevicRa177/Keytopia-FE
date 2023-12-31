import { Flex, Img, Text } from "@chakra-ui/react";
import { colorPallete } from "../../styles/color";
import { PartData } from "../../store/keyboard-store/types/keyboard.type";
import xImg from "../../images/x1.png";

interface SmallPartCardProps {
	part: PartData;
}

export const SmallPartCard = ({ part }: SmallPartCardProps) => {
	return (
		<Flex
			bg={colorPallete.card}
			backdropFilter="auto"
			backdropBlur="4px"
			boxShadow={"4px 4px 12px 0px rgba(0,0,0,0.3)"}
			px={"8px"}
			py={"8px"}
			w={"calc(33% - 15px)"}
			rounded={"8px"}
			flexDir={"column"}
			minH={"185px"}
		>
			{part.name === "" ? (
				<Img src={xImg} h={"100%"} w={"100%"} />
			) : (
				<Flex flexDir={"column"} gap={"8px"}>
					<Img
						src={part.imageUrl.toString()}
						rounded={"4px"}
						minH={"80px"}
						maxH={"80px"}
						w={"100%"}
						boxShadow={"4px 4px 12px 0px rgba(0,0,0,0.3)"}
					/>
					<Flex
						gap={"2px"}
						justifyContent={"space-between"}
						px={"8px"}
						flexDirection={"column"}
						fontSize={"2xs"}
						fontWeight={"semibold"}
					>
						<Text overflow={"hidden"} maxH={"45x"} minH={"45px"}>
							{part.name}
						</Text>
						<Flex textAlign={"end"} mr={"12px"} justifyContent={"space-between"}>
							<Text>Price: </Text>
							<Text>{part.price.toFixed(2)} $</Text>
						</Flex>
					</Flex>
				</Flex>
			)}
		</Flex>
	);
};
