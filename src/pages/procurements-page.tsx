/* eslint-disable react-hooks/exhaustive-deps */
import {
	Button,
	Flex,
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import { MainContrainer } from "../components/page-component/main-container";
import { useFetchProcurementsPage } from "../hooks/warehouse-hooks/get-all/procurement.get-all-page.hook";
import { useEffect, useState } from "react";
import { useDeleteProcurement } from "../hooks/warehouse-hooks/delete/procurement.delete.hook";
import { usePenalizeProcurement } from "../hooks/warehouse-hooks/update/procurement.penalize.hook";
import { useRealizeProcurement } from "../hooks/warehouse-hooks/update/procurement.realize.hook";
import { Pagination } from "../components/paging/pagination/pagination";
import { GetProcurementDto } from "../model/warehouse.model";
import { colorPallete } from "../styles/color";
import { normalizeDate, normalizeEnum } from "../utils/string.converter";
import { ApiResponse } from "../store/auth-store/types/response.type";
import { PartItemModal } from "../components/util-components/part-item.modal";
import { PartItem } from "../store/part-store/types/part.type";
import { ProcurementState } from "../utils/enum";

export const ProcurementPage = () => {
	const [currentPage, setCurrentPage] = useState<number>(0);
	const { getProcurementsPage, getProcurementsPageRes } = useFetchProcurementsPage();
	const { deleteProcurement } = useDeleteProcurement();
	const { penalizeProcurement } = usePenalizeProcurement();
	const { realizeProcurement } = useRealizeProcurement();
	const [partItems, setPartItems] = useState<PartItem[]>([]);
	useEffect(() => {
		getProcurementsPage(0).then(() => {
			setCurrentPage(1);
		});
	}, []);
	const { isOpen: isOpenModal, onClose: onCloseModal, onOpen: onOpenModal } = useDisclosure();
	function handleProcurementsPage(pageNumber: number) {
		getProcurementsPage(pageNumber - 1).then(() => {
			setCurrentPage(pageNumber);
		});
	}
	function isDateInThePast(badDate: Date): boolean {
		const today = new Date();
		let date = new Date(badDate);
		return today < date;
	}

	function handleRealize(item: GetProcurementDto) {
		realizeProcurement(item.id).then((res: ApiResponse<null>) => {
			if (res.status === "ERROR") return;
			handleProcurementsPage(currentPage);
		});
	}
	function handlePenalize(item: GetProcurementDto) {
		penalizeProcurement(item.id).then((res: ApiResponse<null>) => {
			if (res.status === "ERROR") return;
			handleProcurementsPage(currentPage);
		});
	}
	function handleDelete(item: GetProcurementDto) {
		deleteProcurement(item.id).then((res: ApiResponse<null>) => {
			if (res.status === "ERROR") return;
			handleProcurementsPage(1);
		});
	}
	function isProcurement(item: GetProcurementDto, state: ProcurementState): boolean | undefined {
		return item.state !== state;
	}
	return (
		<MainContrainer>
			<Flex w={"100%"} flexDirection={"column"} my={"32px"} position={"relative"}>
				<Flex
					bg={"rgba(255,255,255,0.5)"}
					backdropFilter="auto"
					backdropBlur="4px"
					w={"1140px"}
					top={"-20px"}
					position={"fixed"}
					h={"calc(100vh + 20px)"}
					zIndex={1}
				/>
				<Flex zIndex={5} px={"32px"} flexDirection={"column"}>
					<Flex justifyContent={"space-between"}>
						<Text fontSize={"2xl"}>Procurements</Text>
					</Flex>
					<Flex h={"635px"} fontSize={"md"}>
						<TableContainer flex={1}>
							<Table variant="striped" colorScheme={"purple"} fontSize={"small"}>
								<Thead>
									<Tr>
										<Th>Date</Th>
										<Th>Deadline</Th>
										<Th>Status</Th>
										<Th>Supplier</Th>
									</Tr>
								</Thead>
								<Tbody>
									{getProcurementsPageRes.data.content &&
										getProcurementsPageRes.data.content.map(
											(item: GetProcurementDto) => (
												<Tr key={item.id}>
													<Td w={"10%"}>
														{normalizeDate(item.date.toString())}
													</Td>
													<Td w={"10%"}>
														{normalizeDate(item.deadline.toString())}
													</Td>
													<Td w={"10%"}>{normalizeEnum(item.state)}</Td>
													<Td w={"15%"}>{item.supplierName}</Td>
													<Td>
														<Flex gap={"4"}>
															<Button
																w={"50%"}
																rounded={"4px"}
																overflow={"hidden"}
																bg={colorPallete.button}
																color={"#343434"}
																_hover={{
																	bg: colorPallete.buttonHover,
																	transform: "scale(1.05,1.05)",
																	transition: "0.2s",
																}}
																onClick={() => {
																	setPartItems(
																		item.procurementParts
																	);
																	onOpenModal();
																}}
															>
																Show parts
															</Button>
															{isDateInThePast(item.deadline) ? (
																<Button
																	w={"50%"}
																	rounded={"4px"}
																	overflow={"hidden"}
																	color={
																		!isProcurement(
																			item,
																			ProcurementState.PENDING
																		)
																			? "343434"
																			: "white"
																	}
																	bg={
																		!isProcurement(
																			item,
																			ProcurementState.PENDING
																		)
																			? colorPallete.button
																			: colorPallete.disabledButton
																	}
																	_hover={{
																		bg:
																			!isProcurement(
																				item,
																				ProcurementState.PENDING
																			) &&
																			colorPallete.buttonHover,
																		transform:
																			"scale(1.05,1.05)",
																		transition: "0.2s",
																	}}
																	onClick={() => {
																		handleRealize(item);
																	}}
																	isDisabled={isProcurement(
																		item,
																		ProcurementState.PENDING
																	)}
																>
																	Realize
																</Button>
															) : (
																<Button
																	w={"50%"}
																	rounded={"4px"}
																	overflow={"hidden"}
																	color={"white"}
																	bg={
																		!isProcurement(
																			item,
																			ProcurementState.PENDING
																		)
																			? colorPallete.deleteButton
																			: colorPallete.disabledButton
																	}
																	_hover={{
																		bg:
																			!isProcurement(
																				item,
																				ProcurementState.PENDING
																			) &&
																			colorPallete.deleteButtonHover,
																		transform:
																			"scale(1.05,1.05)",
																		transition: "0.2s",
																	}}
																	onClick={() =>
																		handlePenalize(item)
																	}
																	isDisabled={isProcurement(
																		item,
																		ProcurementState.PENDING
																	)}
																>
																	Penalize
																</Button>
															)}
															<Button
																w={"50%"}
																rounded={"4px"}
																overflow={"hidden"}
																color={"white"}
																bg={
																	isProcurement(
																		item,
																		ProcurementState.REALIZED
																	)
																		? colorPallete.deleteButton
																		: colorPallete.disabledButton
																}
																_hover={{
																	bg:
																		isProcurement(
																			item,
																			ProcurementState.REALIZED
																		) &&
																		colorPallete.deleteButtonHover,
																	transform: "scale(1.05,1.05)",
																	transition: "0.2s",
																}}
																onClick={() => handleDelete(item)}
																isDisabled={
																	!isProcurement(
																		item,
																		ProcurementState.REALIZED
																	)
																}
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
						lastPage={getProcurementsPageRes.data.totalPages}
						maxLength={5}
						setCurrentPage={setCurrentPage}
						getPage={getProcurementsPage}
					/>
					<PartItemModal
						isOpen={isOpenModal}
						onClose={onCloseModal}
						partsItems={partItems}
					/>
				</Flex>
			</Flex>
		</MainContrainer>
	);
};
