/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Box, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useFetchPartPage } from "../../../hooks/part-hooks/get-all/part.get-all-page.hook";
import { Part } from "../../../model/part.model";
import { SortDirection } from "../../../utils/enum";
import { Pagination } from "../../paging/pagination/pagination";
import { PartFilterSort } from "../../filter-sort-components/part.filter-sort";

export const PartAdminOrderView = () => {
	const [currentPage, setCurrentPage] = useState<number>(0);
	const { getPartPage, getPartPageRes } = useFetchPartPage();
	const [searchName, setSearchName] = useState("");
	const [sortedDirection, setSortedDirection] = useState<SortDirection>(SortDirection.UNSORTED);
	useEffect(() => {
		fetchPage(0);
	}, []);
	async function fetchPage(page: number) {
		getPartPage(page, searchName, sortedDirection).then(() => setCurrentPage(page + 1));
	}
	return (
		<Box w={"100%"}>
			<Flex
				color={"#343434"}
				bg={"rgba(255,255,255,0.9)"}
				mx={"auto"}
				mb={"32px"}
				px={"32px"}
				py={"32px"}
				boxShadow={"4px 4px 12px 0px rgba(0,0,0,0.3)"}
				rounded={"4px"}
				position={"relative"}
				fontWeight={"bold"}
				flexDirection={"column"}
				alignContent={"center"}
				justifyContent={"center"}
				w={"90%"}
			>
				<Flex justifyContent={"space-between"}>
					<Text fontSize={"2xl"}>Procurement of parts</Text>
				</Flex>
				<PartFilterSort
					fetchPart={fetchPage}
					setSearchName={setSearchName}
					setSortedDirection={setSortedDirection}
					sortedDirection={sortedDirection}
					searchName={searchName}
				/>
				<Flex fontSize={"md"} flexWrap={"wrap"} gap={"27px"} my={"32px"}>
					{getPartPageRes.data.content.map((part: Part) => (
						<></>
					))}
				</Flex>
				<Pagination
					currentPage={currentPage}
					lastPage={getPartPageRes.data.totalPages}
					maxLength={5}
					setCurrentPage={setCurrentPage}
					getPage={fetchPage}
				/>
			</Flex>
			<Box h={"calc(100vh - 815px)"} />
		</Box>
	);
};
