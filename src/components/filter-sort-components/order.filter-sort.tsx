/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Flex, Img, Input, Text } from "@chakra-ui/react";
import { colorPallete } from "../../styles/color";
import { SortDirection } from "../../utils/enum";
import { useEffect, useState } from "react";
import { normalizeEnum } from "../../utils/string.converter";

import unsortedImage from "../../images/unsort.png";
import ascImage from "../../images/asc.png";
import descImage from "../../images/desc.png";

interface OrderFilterSortProps {
	setSearchId: React.Dispatch<React.SetStateAction<string>>;
	setSortedDirection: React.Dispatch<React.SetStateAction<SortDirection>>;
	sortedDirection: SortDirection;
	searchId: string;
	fetchOrder: (pageNumber: number) => Promise<void>;
}

export const OrderFilterSort = ({
	setSearchId,
	setSortedDirection,
	sortedDirection,
	fetchOrder,
	searchId,
}: OrderFilterSortProps) => {
	const [id, setId] = useState("");
	async function handleSortDirection() {
		if (sortedDirection === SortDirection.UNSORTED) setSortedDirection(SortDirection.ASC);
		else if (sortedDirection === SortDirection.ASC) setSortedDirection(SortDirection.DESC);
		else {
			setSortedDirection(SortDirection.UNSORTED);
		}
	}
	useEffect(() => {
		fetchOrder(0);
	}, [searchId, sortedDirection]);
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
					onChange={(e) => setId(e.target.value)}
					_hover={{
						borderColor: colorPallete.inputBorderHover,
					}}
				/>
			</Flex>
			<Flex flexDirection={"column"} gap={"8px"} w={"33%"} h={"77px"}>
				<Text textAlign={"center"}>Sort by date ( {normalizeEnum(sortedDirection)} )</Text>
				<Flex
					verticalAlign={"center"}
					justifyContent={"center"}
					onClick={() => handleSortDirection()}
					cursor={"pointer"}
					position={"relative"}
				>
					{sortedDirection === SortDirection.UNSORTED && (
						<Img
							src={unsortedImage}
							w={"65px"}
							h={"65px"}
							position={"relative"}
							top={"-12px"}
						/>
					)}
					{sortedDirection === SortDirection.ASC && (
						<Img src={ascImage} w={"25px"} h={"25px"} position={"relative"} />
					)}
					{sortedDirection === SortDirection.DESC && (
						<Img src={descImage} w={"25px"} h={"25px"} position={"relative"} />
					)}
				</Flex>
			</Flex>
			<Flex w={"33%"} h={"45px"}>
				<Flex
					flexDirection={"column"}
					pt={"16px"}
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
							transform: "scale(1.03,1.03)",
							transition: "0.2s",
						}}
						fontSize={"xl"}
						position={"absolute"}
						onClick={() => {
							setSearchId(id);
						}}
					>
						Search
					</Button>
				</Flex>
			</Flex>
		</Flex>
	);
};
