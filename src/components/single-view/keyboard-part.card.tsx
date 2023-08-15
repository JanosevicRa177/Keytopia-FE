import { Flex, Img, Text, Button } from "@chakra-ui/react";
import { colorPallete } from "../../styles/color";
import { PartType } from "../../utils/enum";
import xImg from "../../images/x1.png";
import { PartData } from "../../store/keyboard-store/types/keyboard.type";

interface KeyboardPartCardProps {
	part: PartData;
	showMore: (part: PartData, partType: PartType) => Promise<void>;
	partType: PartType;
}

export const KeyboardPartCard = ({ part, showMore, partType }: KeyboardPartCardProps) => {
	return (
		<Flex
			bg={colorPallete.card}
			backdropFilter="auto"
			backdropBlur="4px"
			boxShadow={"4px 4px 12px 0px rgba(0,0,0,0.3)"}
			px={"12px"}
			py={"16px"}
			w={"calc(24% - 12px)"}
			maxH={"250px"}
			minH={"250px"}
			rounded={"8px"}
			flexDir={"column"}
			transition={"0.3s ease"}
		>
			{part === undefined || part === null ? (
				<Img src={xImg} h={"100%"} w={"100%"} />
			) : (
				<Flex flexDirection={"column"} gap={"8px"}>
					<Img
						src={part.imageUrl.toString()}
						rounded={"4px"}
						minH={"120px"}
						maxH={"120px"}
						w={"100%"}
						boxShadow={"4px 4px 12px 0px rgba(0,0,0,0.3)"}
					/>
					<Flex
						gap={"4px"}
						justifyContent={"space-between"}
						px={"8px"}
						flexDirection={"column"}
					>
						<Text
							h={"40px"}
							textAlign={"center"}
							fontSize={"small"}
							overflow={"hidden"}
						>
							{part.name}
						</Text>
					</Flex>

					<Flex gap={"12px"} flexWrap={"wrap"}>
						{showMore !== undefined && (
							<Button
								w={"100%"}
								rounded={"4px"}
								overflow={"hidden"}
								color={"#343434"}
								bg={colorPallete.button}
								onClick={() => {
									if (showMore !== undefined) showMore(part, partType);
								}}
								_hover={{
									bg: colorPallete.buttonHover,
									transform: "scale(1.05,1.05)",
									transition: "0.2s",
								}}
							>
								Show more
							</Button>
						)}
					</Flex>
				</Flex>
			)}
		</Flex>
	);
};
