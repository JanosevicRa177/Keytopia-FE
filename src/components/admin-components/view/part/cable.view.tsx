/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Box, Button, Text, useDisclosure } from "@chakra-ui/react";
import { colorPallete } from "../../../../styles/color";
import { useEffect, useState } from "react";
import { Pagination } from "../../../paging/pagination/pagination";
import { ApiResponse } from "../../../../store/auth-store/types/response.type";
import { useFetchCablePage } from "../../../../hooks/part-hooks/get-all/cable.get-all-page.hook";
import { useDeleteCable } from "../../../../hooks/part-hooks/delete/cable.delete.hook";
import { CableForm } from "../../form/part/cable.form";
import { PartCard } from "../../../page-component/part-card";
import { Cable, Part, PartWithData } from "../../../../model/part.model";
import { useGetOnePart } from "../../../../hooks/part-hooks/get-one/cable.get-one.hook";
import { PartType } from "../../../../utils/enum";
import { normalizeNames } from "../../../../utils/string.converter";
import { VariableWithValue } from "../../../../utils/types";
import { PartModalView } from "../../single-view/part-modal.view";

export const CableView = () => {
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [part, setPart] = useState<PartWithData>({
		name: "",
		imageUrl: "",
		variables: [],
	});
	const { getCablePage, getCablePageRes } = useFetchCablePage();
	const { getPart } = useGetOnePart();
	const { deleteCable } = useDeleteCable();
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
		getCablePage(0).then(() => {
			setCurrentPage(1);
		});
	}, []);
	async function handleDeleteCable(name: String) {
		deleteCable(name).then((response: ApiResponse<null>) => {
			if (response.status === "SUCCESS") {
				getCablePage(0).then(() => setCurrentPage(1));
			}
		});
	}
	async function handleShowMoreCable(name: String) {
		getPart(name, PartType.CABLE).then(
			(cable: ApiResponse<Cable | null>) => {
				if (cable.data === null) {
					return;
				}
				const cableData: Cable = cable.data;
				const variableNames: string[] = Object.keys(
					cable.data as Cable
				);
				let normalizedNames: string[] = normalizeNames(variableNames);
				const data: VariableWithValue[] = [];
				variableNames.forEach((name: string) => {
					if (
						name === "name" ||
						name === "imageUrl" ||
						name === "image" ||
						name === "priceWeight"
					) {
						normalizedNames.shift();
						return;
					}
					data.push({
						variable: normalizedNames[0],
						value: cableData[
							name as keyof Cable
						]?.toString() as string,
					});
					normalizedNames.shift();
				});
				setPart({
					imageUrl: cableData.imageUrl ?? "",
					variables: data,
					name: cableData.name,
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
				<Flex
					fontSize={"md"}
					flexWrap={"wrap"}
					gap={"27px"}
					my={"32px"}
				>
					{getCablePageRes.data.content.map((part: Part) => (
						<PartCard
							key={part.name}
							part={part}
							delete={handleDeleteCable}
							showMore={handleShowMoreCable}
						/>
					))}
				</Flex>
				<Pagination
					currentPage={currentPage}
					lastPage={getCablePageRes.data.totalPages}
					maxLength={5}
					setCurrentPage={setCurrentPage}
					getPage={getCablePage}
				/>
			</Flex>
			<Box h={"calc(100vh - 815px)"} />
			<CableForm
				isOpen={isOpenForm}
				onClose={onCloseForm}
				fetchCables={getCablePage}
			/>
			<PartModalView
				isOpen={isOpenModal}
				onClose={onCloseModal}
				part={part}
			/>
		</Box>
	);
};
