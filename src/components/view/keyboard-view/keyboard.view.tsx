/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Box, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { ApiResponse } from "../../../store/auth-store/types/response.type";
import { SortDirection } from "../../../utils/enum";
import { Pagination } from "../../paging/pagination/pagination";
import { PartFilterSort } from "../../filter-sort-components/part.filter-sort";
import { PartData } from "../../../store/keyboard-store/types/keyboard.type";
import { useFetchKeyboardPage } from "../../../hooks/keyboard-hooks/keyboard.get-all-page.hook";
import { useDeleteKeyboard } from "../../../hooks/keyboard-hooks/keyboard.delete.hook";
import { KeyboardCard } from "../../part-card-component/keyboard-card";
import { useNavigate } from "react-router-dom";

export const KeyboardView = () => {
	const [currentPage, setCurrentPage] = useState<number>(0);
	const navigate = useNavigate();
	const { getKeyboardPage, getKeyboardPageRes } = useFetchKeyboardPage();
	const [searchName, setSearchName] = useState("");
	const [sortedDirection, setSortedDirection] = useState<SortDirection>(SortDirection.UNSORTED);
	const { deleteKeyboard } = useDeleteKeyboard();

	useEffect(() => {
		fetchPage(0);
	}, []);

	async function handleDeleteKeyboard(part: PartData) {
		deleteKeyboard(part.name).then((response: ApiResponse<null>) => {
			if (response.status === "SUCCESS") {
				fetchPage(0);
			}
		});
	}
	async function fetchPage(page: number) {
		getKeyboardPage(page, searchName, sortedDirection).then(() => setCurrentPage(page + 1));
	}
	async function handleShowMoreKeyboard(keyboard: PartData) {
		navigate(`/keyboard/${keyboard.name}`);
	}
	return (
		<Box minW={"927px"}>
			<Flex
				color={"#343434"}
				bg={"rgba(255,255,255,0.9)"}
				mb={"32px"}
				px={"32px"}
				py={"32px"}
				boxShadow={"4px 4px 12px 0px rgba(0,0,0,0.3)"}
				rounded={"8px"}
				position={"relative"}
				fontWeight={"bold"}
				flexDirection={"column"}
				alignContent={"center"}
				justifyContent={"center"}
			>
				<Flex justifyContent={"space-between"}>
					<Text fontSize={"2xl"}>Keyboards</Text>
				</Flex>
				<PartFilterSort
					fetchPart={fetchPage}
					setSearchName={setSearchName}
					setSortedDirection={setSortedDirection}
					sortedDirection={sortedDirection}
					searchName={searchName}
				/>
				<Flex fontSize={"md"} flexWrap={"wrap"} gap={"24px"} my={"32px"}>
					{getKeyboardPageRes.data.content.map((keyboard: PartData) => (
						<KeyboardCard
							key={keyboard.name}
							keyboard={keyboard}
							deleteKeyboard={handleDeleteKeyboard}
							showMore={handleShowMoreKeyboard}
						/>
					))}
				</Flex>
				<Pagination
					currentPage={currentPage}
					lastPage={getKeyboardPageRes.data.totalPages}
					maxLength={5}
					setCurrentPage={setCurrentPage}
					getPage={fetchPage}
				/>
			</Flex>
			<Box h={"calc(100vh - 815px)"} />
		</Box>
	);
};
