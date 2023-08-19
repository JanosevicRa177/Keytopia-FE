import { Flex, Img, Text, Button } from "@chakra-ui/react";
import { colorPallete } from "../../styles/color";
import { useApplicationStore } from "../../store/store";
import { toast } from "react-toastify";
import { PartData } from "../../store/keyboard-store/types/keyboard.type";

interface PartCardProps {
	part: PartData;
	deletePart?: (part: PartData) => Promise<void>;
	showMore?: (part: PartData) => Promise<void>;
	choosePart?: (part: any) => Promise<void>;
	choosenPartName?: string;
}

export const PartCard = ({
	part,
	showMore,
	deletePart,
	choosePart,
	choosenPartName,
}: PartCardProps) => {
	const addToCart = useApplicationStore((state) => state.addToCart);
	const user = useApplicationStore((state) => state.user);
	function handleAddToCart() {
		addToCart({
			name: part.name,
			price: part.price,
			quantity: 1,
			image: part.imageUrl.toString() ?? "",
		});
		toast.success("1 instance of " + part.name + " added procurement");
	}
	return (
		<Flex
			bg={choosenPartName === part.name ? colorPallete.choosenCard : colorPallete.card}
			backdropFilter="auto"
			backdropBlur="4px"
			boxShadow={"4px 4px 12px 0px rgba(0,0,0,0.3)"}
			px={"12px"}
			py={"16px"}
			w={"calc(33% - 15px)"}
			rounded={"8px"}
			flexDir={"column"}
			gap={"24px"}
			transition={"0.3s ease"}
		>
			<Img
				src={part.imageUrl.toString()}
				rounded={"4px"}
				minH={"226px"}
				maxH={"196px"}
				w={"100%"}
				boxShadow={"4px 4px 12px 0px rgba(0,0,0,0.3)"}
			/>
			<Flex gap={"4px"} justifyContent={"space-between"} px={"8px"} flexDirection={"column"}>
				<Text h={"50px"} overflow={"hidden"}>
					{part.name}
				</Text>
				<Flex textAlign={"end"} mr={"12px"} justifyContent={"space-between"}>
					<Text>Price: </Text>
					<Text>{part.price} $ </Text>
				</Flex>
			</Flex>

			<Flex gap={"12px"} flexWrap={"wrap"}>
				{showMore !== undefined && (
					<Button
						w={"calc(50% - 6px)"}
						rounded={"4px"}
						overflow={"hidden"}
						color={"#343434"}
						bg={colorPallete.button}
						onClick={() => {
							if (showMore !== undefined) showMore(part);
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
				{choosePart !== undefined && (
					<Button
						w={"calc(50% - 6px)"}
						rounded={"4px"}
						overflow={"hidden"}
						color={"#343434"}
						bg={colorPallete.button}
						onClick={() => {
							if (showMore !== undefined) choosePart(part);
						}}
						_hover={{
							bg: colorPallete.buttonHover,
							transform: "scale(1.05,1.05)",
							transition: "0.2s",
						}}
					>
						Choose
					</Button>
				)}
				{deletePart !== undefined && user?.role === "ADMIN" && (
					<Button
						rounded={"4px"}
						overflow={"hidden"}
						w={"calc(50% - 6px)"}
						bg={colorPallete.deleteButton}
						color={"white"}
						onClick={() => {
							if (deletePart !== undefined) deletePart(part);
						}}
						_hover={{
							bg: colorPallete.deleteButtonHover,
							transform: "scale(1.05,1.05)",
							transition: "0.2s",
						}}
					>
						Delete
					</Button>
				)}
				{deletePart !== undefined && (
					<Button
						rounded={"4px"}
						overflow={"hidden"}
						w={user?.role === "ADMIN" ? "100%" : "calc(50% - 6px)"}
						bg={colorPallete.button}
						color={"#343434"}
						onClick={() => handleAddToCart()}
						_hover={{
							bg: colorPallete.buttonHover,
							transform: "scale(1.05,1.05)",
							transition: "0.2s",
						}}
					>
						{user?.role === "ADMIN" ? "Add to procurement" : "Add to cart"}
					</Button>
				)}
			</Flex>
		</Flex>
	);
};
