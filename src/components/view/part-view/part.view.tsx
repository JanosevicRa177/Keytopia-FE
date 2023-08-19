/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Box, Button, Text, useDisclosure } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useDeletePart } from "../../../hooks/part-hooks/delete/part.delete.hook";
import { ApiResponse } from "../../../store/auth-store/types/response.type";
import { colorPallete } from "../../../styles/color";
import { PartType, SortDirection } from "../../../utils/enum";
import { PartCard } from "../../part-card-component/part-card";
import { Pagination } from "../../paging/pagination/pagination";
import { PartFilterSort } from "../../filter-sort-components/part.filter-sort";
import { PartData } from "../../../store/keyboard-store/types/keyboard.type";
import { useFetchPartPage } from "../../../hooks/part-hooks/get-all/part.get-all-page.hook";
import { PartFormContainer } from "../../form/part-form/part-forms.container";
import { PartModalControl } from "../../single-view/part-modal.control";
import { normalizeEnum } from "../../../utils/string.converter";
import { useApplicationStore } from "../../../store/store";

interface PartViewProps {
	partType?: PartType;
}

export const PartView = ({ partType }: PartViewProps) => {
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [part, setPart] = useState<PartData>();
	const { getPartPage, getPartPageRes } = useFetchPartPage();
	const [searchName, setSearchName] = useState("");
	const [sortedDirection, setSortedDirection] = useState<SortDirection>(SortDirection.UNSORTED);
	const { deletePart } = useDeletePart();
	const { isOpen: isOpenForm, onClose: onCloseForm, onOpen: onOpenForm } = useDisclosure();
	const user = useApplicationStore((state) => state.user);
	useEffect(() => {
		fetchPage(0);
	}, [partType]);
	useEffect(() => {
		fetchPage(0);
	}, []);

	async function handleDeletePart(part: PartData) {
		deletePart(part.name, part.partType).then((response: ApiResponse<null>) => {
			if (response.status === "SUCCESS") {
				fetchPage(0);
			}
		});
	}
	async function fetchPage(page: number) {
		getPartPage(page, searchName, sortedDirection, partType).then(() =>
			setCurrentPage(page + 1)
		);
	}
	async function handleShowMorePart(part: PartData) {
		setPart(part);
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
					<Text fontSize={"2xl"}>{normalizeEnum(partType?.toString() ?? "Parts")}</Text>
					{user?.role === "ADMIN" && (
						<Button
							w={"90px"}
							rounded={"4px"}
							overflow={"hidden"}
							bg={colorPallete.button}
							onClick={() => {
								onOpenForm();
							}}
							_hover={{
								bg: colorPallete.buttonHover,
								transform: "scale(1.05,1.05)",
								transition: "0.2s",
							}}
							fontSize={"md"}
						>
							New
						</Button>
					)}
				</Flex>
				<PartFilterSort
					fetchPart={fetchPage}
					setSearchName={setSearchName}
					setSortedDirection={setSortedDirection}
					sortedDirection={sortedDirection}
					searchName={searchName}
				/>
				<Flex fontSize={"md"} flexWrap={"wrap"} gap={"24px"} my={"32px"}>
					{getPartPageRes.data.content.map((part: PartData) => (
						<PartCard
							key={part.name}
							part={part}
							deletePart={handleDeletePart}
							showMore={handleShowMorePart}
						/>
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
			{user?.role === "ADMIN" && (
				<PartFormContainer
					isOpen={isOpenForm}
					onClose={onCloseForm}
					fetchPage={fetchPage}
				/>
			)}
			<PartModalControl partData={part} setPartData={setPart} />
		</Box>
	);
};
