/* eslint-disable react-hooks/exhaustive-deps */
import {
	Flex,
	Box,
	Button,
	Text,
	useDisclosure,
	Tbody,
	Table,
	TableContainer,
	Tr,
	Td,
	Th,
	Thead,
} from "@chakra-ui/react";
import { colorPallete } from "../../../../styles/color";
import { useEffect, useState } from "react";
import { Pagination } from "../../../paging/pagination/pagination";
import { ApiResponse } from "../../../../store/auth-store/types/response.type";
import { Layout } from "../../../../model/part-data.model";
import { useFetchLayoutsPage } from "../../../../hooks/part-data-hooks/get-all/layout.get-all-page.hook";
import { useDeleteLayout } from "../../../../hooks/part-data-hooks/delete/layout.delete.hook";
import { LayoutForm } from "../../../form/part-data-form/layout.form";

export const LayoutView = () => {
	const [currentPage, setCurrentPage] = useState<number>(0);
	const { getLayoutsPage, getLayoutsPageRes } = useFetchLayoutsPage();
	const { deleteLayout } = useDeleteLayout();
	const {
		isOpen: isOpenForm,
		onClose: onCloseForm,
		onOpen: onOpenForm,
	} = useDisclosure();
	useEffect(() => {
		getLayoutsPage(0).then(() => setCurrentPage(1));
	}, []);
	async function handleDeleteSize(name: String) {
		deleteLayout(name).then((response: ApiResponse<null>) => {
			if (response.status === "SUCCESS") {
				getLayoutsPage(0).then(() => setCurrentPage(1));
			}
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
					<Text fontSize={"2xl"}>Layout</Text>
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
				<Flex h={"408px"} fontSize={"md"}>
					<TableContainer flex={1}>
						<Table
							variant="striped"
							colorScheme={"purple"}
							fontSize={"small"}
						>
							<Thead>
								<Tr>
									<Th>Name</Th>
									<Th>Localization</Th>
								</Tr>
							</Thead>
							<Tbody>
								{getLayoutsPageRes.data.content &&
									getLayoutsPageRes.data.content.map(
										(item: Layout) => (
											<Tr key={item.name}>
												<Td w={"40%"}>{item.name}</Td>
												<Td w={"40%"}>
													{item.localization}
												</Td>
												<Td>
													<Flex gap={"4"}>
														<Button
															flexGrow={"1"}
															rounded={"4px"}
															overflow={"hidden"}
															bg={
																colorPallete.deleteButton
															}
															color={"white"}
															onClick={() =>
																handleDeleteSize(
																	item.name
																)
															}
															_hover={{
																bg: colorPallete.deleteButtonHover,
																transform:
																	"scale(1.05,1.05)",
																transition:
																	"0.2s",
															}}
														>
															Delete
														</Button>
													</Flex>
												</Td>
											</Tr>
										)
									)}
							</Tbody>
						</Table>
					</TableContainer>
				</Flex>
				<Pagination
					currentPage={currentPage}
					lastPage={getLayoutsPageRes.data.totalPages}
					maxLength={5}
					setCurrentPage={setCurrentPage}
					getPage={getLayoutsPage}
				/>
			</Flex>
			<Box h={"calc(100vh - 815px)"} />
			<LayoutForm
				isOpen={isOpenForm}
				onClose={onCloseForm}
				fetchLayouts={getLayoutsPage}
			/>
		</Box>
	);
};
