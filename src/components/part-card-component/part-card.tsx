import { Flex, Img, Text, Button } from "@chakra-ui/react";
import { colorPallete } from "../../styles/color";
import { Part } from "../../model/part.model";

interface PartCardProps {
	part: Part;
	delete: Function;
	showMore: Function;
}

export const PartCard = (props: PartCardProps) => {
	return (
		<Flex
			bg={colorPallete.card}
			backdropFilter="auto"
			backdropBlur="4px"
			boxShadow={"4px 4px 12px 0px rgba(0,0,0,0.3)"}
			px={"12px"}
			py={"16px"}
			w={"220px"}
			h={"400px"}
			rounded={"8px"}
			flexDir={"column"}
			gap={"24px"}
		>
			<Img
				src={props.part.imageUrl}
				rounded={"4px"}
				minH={"196px"}
				maxH={"196px"}
				w={"100%"}
			/>
			<Flex
				gap={"4px"}
				justifyContent={"space-between"}
				px={"8px"}
				flexDirection={"column"}
			>
				<Text h={"50px"} overflow={"hidden"}>
					{props.part.name}
				</Text>
				<Flex
					textAlign={"end"}
					mr={"12px"}
					justifyContent={"space-between"}
				>
					<Text>Price: </Text>
					<Text>{props.part.price} $ </Text>
				</Flex>
			</Flex>

			<Flex gap={"3"}>
				<Button
					w={"50%"}
					rounded={"4px"}
					overflow={"hidden"}
					color={"#343434"}
					bg={colorPallete.button}
					onClick={() => props.showMore(props.part.name)}
					_hover={{
						bg: colorPallete.buttonHover,
						transform: "scale(1.05,1.05)",
						transition: "0.2s",
					}}
				>
					Show more
				</Button>
				<Button
					w={"50%"}
					rounded={"4px"}
					overflow={"hidden"}
					bg={colorPallete.deleteButton}
					color={"white"}
					onClick={() => props.delete(props.part.name)}
					_hover={{
						bg: colorPallete.deleteButtonHover,
						transform: "scale(1.05,1.05)",
						transition: "0.2s",
					}}
				>
					Delete
				</Button>
			</Flex>
		</Flex>
	);
};
