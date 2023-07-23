/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Box, Button, Text, useDisclosure } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useDeletePart } from "../../../hooks/part-hooks/delete/part.delete.hook";
import { useFetchPartPage } from "../../../hooks/part-hooks/get-all/part.get-all-page.hook";
import { useGetOneSwitchSet } from "../../../hooks/part-hooks/get-one/switch-set.get-one.hook";
import {
	PartWithData,
	SwitchSetShowMore,
	Part,
} from "../../../model/part.model";
import { ApiResponse } from "../../../store/auth-store/types/response.type";
import { colorPallete } from "../../../styles/color";
import { PartType, SortDirection } from "../../../utils/enum";
import {
	normalizeNames,
	normalizePinType,
	normalizeSwitchType,
} from "../../../utils/string.converter";
import { VariableWithValue } from "../../../utils/types";
import { SwitchSetForm } from "../../form/part-form/switch-set.form";
import { PartCard } from "../../part-card-component/part-card";
import { Pagination } from "../../paging/pagination/pagination";
import { PartModalView } from "../../single-view/part-modal.view";
import { Switch } from "../../../model/part-data.model";
import { PartFilterSort } from "../../filter-sort-components/part.filter-sort";

const partType = PartType.SWITCH_SET;

export const SwitchSetView = () => {
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [part, setPart] = useState<PartWithData>({
		name: "",
		imageUrl: "",
		variables: [],
	});
	const { getPartPage, getPartPageRes } = useFetchPartPage();
	const { getSwitchSet } = useGetOneSwitchSet();
	const { deletePart } = useDeletePart();
	const {
		isOpen: isOpenForm,
		onClose: onCloseForm,
		onOpen: onOpenForm,
	} = useDisclosure();
	const {
		isOpen: isOpenModal,
		onClose: onCloseModal,
		onOpen: onOpenModal,
	} = useDisclosure();
	const [searchName, setSearchName] = useState("");
	const [sortedDirection, setSortedDirection] = useState<SortDirection>(
		SortDirection.UNSORTED
	);
	async function fetchPage(page: number) {
		getPartPage(page, searchName, sortedDirection, partType).then(() =>
			setCurrentPage(page + 1)
		);
	}
	useEffect(() => {
		fetchPage(0);
	}, []);
	async function handleDeletePart(name: String) {
		deletePart(name, partType).then((response: ApiResponse<null>) => {
			fetchPage(0);
		});
	}
	async function handleShowMoreSwitchSet(name: String) {
		getSwitchSet(name).then(
			(switchSet: ApiResponse<SwitchSetShowMore | null>) => {
				if (switchSet.data === null) {
					return;
				}
				const switchSetData: SwitchSetShowMore = switchSet.data;
				const variableNames: string[] = Object.keys(
					switchSet.data as SwitchSetShowMore
				);
				let normalizedNames: string[] = normalizeNames(variableNames);
				const data: VariableWithValue[] = [];
				variableNames.forEach((name: string) => {
					if (
						name === "name" ||
						name === "imageUrl" ||
						switchSetData[
							name as keyof SwitchSetShowMore
						]?.toString() == null
					) {
						normalizedNames.shift();
						return;
					}
					if (name === "price") {
						data.push({
							variable: normalizedNames[0],
							value:
								(switchSetData[
									name as keyof SwitchSetShowMore
								]?.toString() as string) + " $",
						});
						normalizedNames.shift();
						return;
					}
					if (name === "aswitch") {
						const switchData: Switch = switchSetData[
							name as keyof SwitchSetShowMore
						] as Switch;
						const switchVariableNames: string[] = Object.keys(
							switchSetData[
								name as keyof SwitchSetShowMore
							] as Switch
						);
						let switchNormalizedNames: string[] =
							normalizeNames(switchVariableNames);
						switchVariableNames.forEach((name: string) => {
							if (
								name === "priceWeight" ||
								switchData[name as keyof Switch]?.toString() ==
									null
							) {
								switchNormalizedNames.shift();
								return;
							}
							if (name === "pinType") {
								normalizePinType(
									switchData[
										name as keyof Switch
									]?.toString() as string,
									data,
									switchNormalizedNames
								);
								return;
							}
							if (name === "switchType") {
								normalizeSwitchType(
									switchData[
										name as keyof Switch
									]?.toString() as string,
									data,
									switchNormalizedNames
								);
								return;
							}
							data.push({
								variable: switchNormalizedNames[0],
								value: switchData[
									name as keyof Switch
								]?.toString() as string,
							});
							switchNormalizedNames.shift();
						});
						normalizedNames.shift();
						return;
					}
					data.push({
						variable: normalizedNames[0],
						value: switchSetData[
							name as keyof SwitchSetShowMore
						]?.toString() as string,
					});
					normalizedNames.shift();
				});
				setPart({
					imageUrl: switchSetData.imageUrl ?? "",
					variables: data,
					name: switchSetData.name,
				});
				onOpenModal();
			}
		);
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
					<Text fontSize={"2xl"}>Switch set</Text>
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
				<Flex
					fontSize={"md"}
					flexWrap={"wrap"}
					gap={"27px"}
					my={"32px"}
				>
					{getPartPageRes.data.content.map((part: Part) => (
						<PartCard
							key={part.name}
							part={part}
							delete={handleDeletePart}
							showMore={handleShowMoreSwitchSet}
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
			<SwitchSetForm
				isOpen={isOpenForm}
				onClose={onCloseForm}
				fetchPage={fetchPage}
			/>
			<PartModalView
				isOpen={isOpenModal}
				onClose={onCloseModal}
				part={part}
			/>
		</Box>
	);
};
