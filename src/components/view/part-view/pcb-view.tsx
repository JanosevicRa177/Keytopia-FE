/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Box, Button, Text, useDisclosure } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useDeletePart } from "../../../hooks/part-hooks/delete/part.delete.hook";
import { useFetchPartPage } from "../../../hooks/part-hooks/get-all/part.get-all-page.hook";
import { useGetOnePCB } from "../../../hooks/part-hooks/get-one/pcb.get-one.hook";
import { PartWithData, PCB, Part } from "../../../model/part.model";
import { ApiResponse } from "../../../store/auth-store/types/response.type";
import { colorPallete } from "../../../styles/color";
import { PartType, SortDirection } from "../../../utils/enum";
import {
	normalizeNames,
	normalizePCBType,
	normalizePinType,
	normalizeStabilizerType,
} from "../../../utils/string.converter";
import { VariableWithValue } from "../../../utils/types";
import { PCBForm } from "../../form/part-form/pcb.form";
import { PartCard } from "../../part-card-component/part-card";
import { Pagination } from "../../paging/pagination/pagination";
import { PartModalView } from "../../single-view/part-modal.view";
import { PartFilterSort } from "../../filter-sort-components/part.filter-sort";

const partType = PartType.PCB;

export const PCBView = () => {
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [part, setPart] = useState<PartWithData>({
		name: "",
		imageUrl: "",
		variables: [],
	});
	const { getPartPage, getPartPageRes } = useFetchPartPage();
	const { getPCB } = useGetOnePCB();
	const { deletePart } = useDeletePart();
	const { isOpen: isOpenForm, onClose: onCloseForm, onOpen: onOpenForm } = useDisclosure();
	const { isOpen: isOpenModal, onClose: onCloseModal, onOpen: onOpenModal } = useDisclosure();
	const [searchName, setSearchName] = useState("");
	const [sortedDirection, setSortedDirection] = useState<SortDirection>(SortDirection.UNSORTED);
	useEffect(() => {
		fetchPage(0);
	}, []);
	async function handleDeletePart(name: String) {
		deletePart(name, partType).then((response: ApiResponse<null>) => {
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
	async function handleShowMorePCB(name: String) {
		await getPCB(name).then((pcb: ApiResponse<PCB | null>) => {
			if (pcb.data === null) {
				return;
			}
			const pcbData: PCB = pcb.data;
			const variableNames: string[] = Object.keys(pcb.data as PCB);
			let normalizedNames: string[] = normalizeNames(variableNames);
			const data: VariableWithValue[] = [];
			variableNames.forEach((name: string) => {
				if (
					name === "name" ||
					name === "imageUrl" ||
					name === "priceWeight" ||
					pcbData[name as keyof PCB]?.toString() == null
				) {
					normalizedNames.shift();
					return;
				}
				if (name === "type") {
					normalizePCBType(
						pcbData[name as keyof PCB]?.toString() as string,
						data,
						normalizedNames
					);
					return;
				}
				if (name === "pinType") {
					normalizePinType(
						pcbData[name as keyof PCB]?.toString() as string,
						data,
						normalizedNames
					);
					return;
				}
				if (name === "stabilizerType") {
					normalizeStabilizerType(
						pcbData[name as keyof PCB]?.toString() as string,
						data,
						normalizedNames
					);
					return;
				}
				if (name === "price") {
					data.push({
						variable: normalizedNames[0],
						value: (pcbData[name as keyof PCB]?.toString() as string) + " $",
					});
					normalizedNames.shift();
					return;
				}
				data.push({
					variable: normalizedNames[0],
					value: pcbData[name as keyof PCB]?.toString() as string,
				});
				normalizedNames.shift();
			});
			setPart({
				imageUrl: pcbData.imageUrl ?? "",
				variables: data,
				name: pcbData.name,
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
					<Text fontSize={"2xl"}>PCB</Text>
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
					{getPartPageRes.data.content.map((part: Part) => (
						<PartCard
							key={part.name}
							part={part}
							deletePart={handleDeletePart}
							showMore={handleShowMorePCB}
						/>
					))}
				</Flex>
				<Pagination
					currentPage={currentPage}
					lastPage={getPartPageRes.data.totalPages}
					maxLength={5}
					setCurrentPage={setCurrentPage}
					getPage={fetchPage}
					partType={partType}
				/>
			</Flex>
			<Box h={"calc(100vh - 815px)"} />
			<PCBForm isOpen={isOpenForm} onClose={onCloseForm} fetchPart={fetchPage} />
			<PartModalView isOpen={isOpenModal} onClose={onCloseModal} part={part} />
		</Box>
	);
};
