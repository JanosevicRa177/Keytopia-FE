/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Img, Select, Text } from "@chakra-ui/react";
import { colorPallete } from "../../styles/color";
import { ProcurementState, SortDirection } from "../../utils/enum";
import { useEffect } from "react";
import { normalizeEnum } from "../../utils/string.converter";

import unsortedImage from "../../images/unsort.png";
import ascImage from "../../images/asc.png";
import descImage from "../../images/desc.png";

interface ProcurementFilterSortProps {
	setSearchState: React.Dispatch<React.SetStateAction<ProcurementState>>;
	setSortedDirection: React.Dispatch<React.SetStateAction<SortDirection>>;
	sortedDirection: SortDirection;
	searchState: ProcurementState;
	fetchProcurement: (pageNumber: number) => void;
}

export const ProcurementFilterSort = ({
	setSearchState,
	setSortedDirection,
	sortedDirection,
	fetchProcurement,
	searchState,
}: ProcurementFilterSortProps) => {
	async function handleSortDirection() {
		if (sortedDirection === SortDirection.UNSORTED) setSortedDirection(SortDirection.ASC);
		else if (sortedDirection === SortDirection.ASC) setSortedDirection(SortDirection.DESC);
		else {
			setSortedDirection(SortDirection.UNSORTED);
		}
	}
	useEffect(() => {
		fetchProcurement(0);
	}, [searchState, sortedDirection]);
	function handleState(state: string) {
		var tempState: ProcurementState = ProcurementState[state as keyof typeof ProcurementState];
		setSearchState(tempState);
	}
	return (
		<Flex
			alignItems="center"
			justifyContent="center"
			mt="16px"
			backdropFilter="auto"
			backdropBlur="4px"
			gap={"16px"}
			mb={"16px"}
		>
			<Flex flexDirection={"column"} gap={"8px"} w={"33%"}>
				<Text>State</Text>
				<Select
					rounded={"4px"}
					h={"45px"}
					borderColor={colorPallete.inputBorder}
					_hover={{
						borderColor: colorPallete.inputBorderHover,
					}}
					onChange={(e) => handleState(e.target.value)}
					defaultValue={ProcurementState.PENDING}
				>
					<option value={ProcurementState.PENDING}>Pending</option>
					<option value={ProcurementState.CANCELED}>Canceled</option>
					<option value={ProcurementState.REALIZED}>Realized</option>
					<option value={ProcurementState.NONE}>None</option>
				</Select>
			</Flex>
			<Flex flexDirection={"column"} gap={"8px"} w={"33%"} h={"77px"}>
				<Text textAlign={"center"}>
					Sort by quantity ( {normalizeEnum(sortedDirection)} )
				</Text>
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
		</Flex>
	);
};
