/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Flex, Img, Input, Text } from "@chakra-ui/react";
import { colorPallete } from "../../styles/color";
import { SortDirection } from "../../utils/enum";

import unsortedImage from "../../images/downArrow.png";
import { useEffect, useState } from "react";
import { normalizeEnum } from "../../utils/string.converter";

interface PartFilterSortProps {
	setSearchName: React.Dispatch<React.SetStateAction<string>>;
	setSortedDirection: React.Dispatch<React.SetStateAction<SortDirection>>;
	sortedDirection: SortDirection;
	searchName: string;
	fetchPart: (pageNumber: number) => Promise<void>;
}

export const PartFilterSort = ({
	setSearchName,
	setSortedDirection,
	sortedDirection,
	fetchPart,
	searchName,
}: PartFilterSortProps) => {
	const [name, setName] = useState("");
	async function handleSortDirection() {
		if (sortedDirection === SortDirection.UNSORTED)
			setSortedDirection(SortDirection.ASC);
		else if (sortedDirection === SortDirection.ASC)
			setSortedDirection(SortDirection.DESC);
		else {
			setSortedDirection(SortDirection.UNSORTED);
		}
	}
	useEffect(() => {
		fetchPart(0);
	}, [searchName, sortedDirection]);
	return (
		<Flex
			alignItems="center"
			justifyContent="center"
			mt="16px"
			backdropFilter="auto"
			backdropBlur="4px"
			gap={"16px"}
		>
			<Flex flexDirection={"column"} gap={"8px"} w={"33%"}>
				<Text>Name</Text>
				<Input
					type="text"
					rounded={"4px"}
					h={"45px"}
					borderColor={colorPallete.inputBorder}
					onChange={(e) => setName(e.target.value)}
					_hover={{
						borderColor: colorPallete.inputBorderHover,
					}}
				/>
			</Flex>
			<Flex flexDirection={"column"} gap={"8px"} w={"33%"} h={"77px"}>
				<Text textAlign={"center"}>
					Sort by quantity (sorted direction:{" "}
					{normalizeEnum(sortedDirection)})
				</Text>
				<Flex verticalAlign={"center"} justifyContent={"center"}>
					{" "}
					<Img
						src={unsortedImage}
						w={"25px"}
						h={"25px"}
						onClick={() => handleSortDirection()}
					/>
				</Flex>
			</Flex>
			<Flex w={"33%"} h={"45px"}>
				<Flex
					flexDirection={"column"}
					position={"relative"}
					w={"100%"}
					h={"45px"}
				>
					<Button
						w={"100%"}
						h={"45px"}
						rounded={"4px"}
						overflow={"hidden"}
						bg={colorPallete.button}
						_hover={{
							bg: colorPallete.buttonHover,
							transform: "scale(1.05,1.05)",
							transition: "0.2s",
						}}
						fontSize={"xl"}
						position={"absolute"}
						onClick={() => {
							setSearchName(name);
						}}
					>
						Search
					</Button>
				</Flex>
			</Flex>
		</Flex>
	);
};
