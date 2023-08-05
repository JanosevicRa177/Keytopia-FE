/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Box, Button, Text, useDisclosure } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useDeletePart } from "../../../hooks/part-hooks/delete/part.delete.hook";
import { useGetOneCable } from "../../../hooks/part-hooks/get-one/cable.get-one.hook";
import { PartWithData, Cable } from "../../../model/part.model";
import { ApiResponse } from "../../../store/auth-store/types/response.type";
import { colorPallete } from "../../../styles/color";
import { PartType, SortDirection } from "../../../utils/enum";
import { normalizeNames, normalizeConnectionType } from "../../../utils/string.converter";
import { VariableWithValue } from "../../../utils/types";
import { PartCard } from "../../part-card-component/part-card";
import { Pagination } from "../../paging/pagination/pagination";
import { PartModalView } from "../../single-view/part-modal.view";
import { PartFilterSort } from "../../filter-sort-components/part.filter-sort";
import { PartData } from "../../../store/keyboard-store/types/keyboard.type";
import { useFetchPartPage } from "../../../hooks/part-hooks/get-all/part.get-all-page.hook";
import { PartFormContainer } from "../../form/part-form/part-forms.container";

interface PartViewProps {
	partType?: PartType;
}

export const PartView = ({ partType }: PartViewProps) => {
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [part, setPart] = useState<PartWithData>({
		name: "",
		imageUrl: "",
		variables: [],
	});
	const { getPartPage, getPartPageRes } = useFetchPartPage();
	const { getCable } = useGetOneCable();
	const [searchName, setSearchName] = useState("");
	const [sortedDirection, setSortedDirection] = useState<SortDirection>(SortDirection.UNSORTED);
	const { deletePart } = useDeletePart();
	const { isOpen: isOpenForm, onClose: onCloseForm, onOpen: onOpenForm } = useDisclosure();
	const { isOpen: isOpenModal, onClose: onCloseModal, onOpen: onOpenModal } = useDisclosure();
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
	async function handleShowMoreCable(part: PartData) {
		await getCable(part.name).then((cable: ApiResponse<Cable | null>) => {
			if (cable.data === null) {
				return;
			}
			const cableData: Cable = cable.data;
			const variableNames: string[] = Object.keys(cable.data as Cable);
			let normalizedNames: string[] = normalizeNames(variableNames);
			const data: VariableWithValue[] = [];
			variableNames.forEach((name: string) => {
				if (
					name === "name" ||
					name === "imageUrl" ||
					name === "priceWeight" ||
					cableData[name as keyof Cable]?.toString() == null
				) {
					normalizedNames.shift();
					return;
				}
				if (name === "keyboardConnector" || name === "computerConnector") {
					normalizeConnectionType(
						cableData[name as keyof Cable]?.toString() as string,
						data,
						normalizedNames
					);
					return;
				}
				if (name === "price") {
					data.push({
						variable: normalizedNames[0],
						value: (cableData[name as keyof Cable]?.toString() as string) + " $",
					});
					normalizedNames.shift();
					return;
				}
				data.push({
					variable: normalizedNames[0],
					value: cableData[name as keyof Cable]?.toString() as string,
				});
				normalizedNames.shift();
			});
			setPart({
				imageUrl: cableData.imageUrl ?? "",
				variables: data,
				name: cableData.name,
			});
			onOpenModal();
		});
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
					<Text fontSize={"2xl"}>Cable</Text>
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
				</Flex>
				<PartFilterSort
					fetchPart={fetchPage}
					setSearchName={setSearchName}
					setSortedDirection={setSortedDirection}
					sortedDirection={sortedDirection}
					searchName={searchName}
				/>
				<Flex fontSize={"md"} flexWrap={"wrap"} gap={"27px"} my={"32px"}>
					{getPartPageRes.data.content.map((part: PartData) => (
						<PartCard
							key={part.name}
							part={part}
							deletePart={handleDeletePart}
							showMore={handleShowMoreCable}
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
			<PartFormContainer isOpen={isOpenForm} onClose={onCloseForm} fetchPage={fetchPage} />
			<PartModalView isOpen={isOpenModal} onClose={onCloseModal} part={part} />
		</Box>
	);
};