/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Box, Button, Text, useDisclosure } from "@chakra-ui/react";
import { colorPallete } from "../../../../styles/color";
import { useEffect, useState } from "react";
import { Pagination } from "../../../paging/pagination/pagination";
import { ApiResponse } from "../../../../store/auth-store/types/response.type";
import { PartCard } from "../../../page-component/part-card";
import { Case, Part, PartWithData } from "../../../../model/part.model";
import { PartType } from "../../../../utils/enum";
import { normalizeNames } from "../../../../utils/string.converter";
import { VariableWithValue } from "../../../../utils/types";
import { PartModalView } from "../../single-view/part-modal.view";
import { useFetchPartPage } from "../../../../hooks/part-hooks/get-all/part.get-all-page.hook";
import { useDeletePart } from "../../../../hooks/part-hooks/delete/part.delete.hook";
import { useGetOneCase } from "../../../../hooks/part-hooks/get-one/case.get-one.hook";
import { CaseForm } from "../../form/part/case.form";

const partType = PartType.CASE;

export const CaseView = () => {
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [part, setPart] = useState<PartWithData>({
		name: "",
		imageUrl: "",
		variables: [],
	});
	const { getPartPage, getPartPageRes } = useFetchPartPage();
	const { getCase } = useGetOneCase();
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
	useEffect(() => {
		getPartPage(0, partType).then(() => {
			setCurrentPage(1);
		});
	}, []);
	async function handleDeletePart(name: String) {
		deletePart(name, partType).then((response: ApiResponse<null>) => {
			if (response.status === "SUCCESS") {
				getPartPage(0, partType).then(() => setCurrentPage(1));
			}
		});
	}
	async function handleShowMoreCase(name: String) {
		getCase(name).then((aCase: ApiResponse<Case | null>) => {
			if (aCase.data === null) {
				return;
			}
			const caseData: Case = aCase.data;
			const variableNames: string[] = Object.keys(aCase.data as Case);
			let normalizedNames: string[] = normalizeNames(variableNames);
			const data: VariableWithValue[] = [];
			variableNames.forEach((name: string) => {
				if (
					name === "name" ||
					name === "imageUrl" ||
					name === "priceWeight" ||
					caseData[name as keyof Case]?.toString() == null
				) {
					normalizedNames.shift();
					return;
				}
				if (name === "price") {
					data.push({
						variable: normalizedNames[0],
						value:
							(caseData[
								name as keyof Case
							]?.toString() as string) + " $",
					});
					normalizedNames.shift();
					return;
				}
				data.push({
					variable: normalizedNames[0],
					value: caseData[name as keyof Case]?.toString() as string,
				});
				normalizedNames.shift();
			});
			setPart({
				imageUrl: caseData.imageUrl ?? "",
				variables: data,
				name: caseData.name,
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
					<Text fontSize={"2xl"}>Case</Text>
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
							showMore={handleShowMoreCase}
						/>
					))}
				</Flex>
				<Pagination
					currentPage={currentPage}
					lastPage={getPartPageRes.data.totalPages}
					maxLength={5}
					setCurrentPage={setCurrentPage}
					getPage={getPartPage}
					partType={partType}
				/>
			</Flex>
			<Box h={"calc(100vh - 815px)"} />
			<CaseForm
				isOpen={isOpenForm}
				onClose={onCloseForm}
				fetchCases={getPartPage}
			/>
			<PartModalView
				isOpen={isOpenModal}
				onClose={onCloseModal}
				part={part}
			/>
		</Box>
	);
};
