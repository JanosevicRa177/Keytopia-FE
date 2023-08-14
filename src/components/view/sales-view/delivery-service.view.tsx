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
import { useState, useEffect } from "react";
import { ApiResponse } from "../../../store/auth-store/types/response.type";
import { colorPallete } from "../../../styles/color";
import { Pagination } from "../../paging/pagination/pagination";
import { useFetchDeliveryServicesPage } from "../../../hooks/sales-hooks/get-all/delivery-service.get-all-page.hook";
import { useDeleteDeliveryService } from "../../../hooks/sales-hooks/delete/delivery-service.delete.hook";
import { DeliveryService } from "../../../model/sales.model";
import { DeliveryServiceForm } from "../../form/sales-form/delivery-service.form";

export const DeliveryServiceView = () => {
	const [currentPage, setCurrentPage] = useState<number>(0);
	const { getDeliveryServicesPage, getDeliveryServicesPageRes } = useFetchDeliveryServicesPage();
	const { deleteDeliveryService } = useDeleteDeliveryService();
	const { isOpen: isOpenForm, onClose: onCloseForm, onOpen: onOpenForm } = useDisclosure();
	const [chosenDeliveryService, setChosenDeliveryService] = useState<DeliveryService | null>(
		null
	);
	useEffect(() => {
		getDeliveryServicesPage(0).then(() => setCurrentPage(1));
	}, []);
	async function handleDeleteDeliveryService(name: string) {
		deleteDeliveryService(name).then((response: ApiResponse<null>) => {
			if (response.status === "SUCCESS") {
				getDeliveryServicesPage(0).then(() => setCurrentPage(1));
			}
		});
	}
	function handleCreate() {
		setChosenDeliveryService(null);
		onOpenForm();
	}
	function handleUpdate(deliveryService: DeliveryService) {
		setChosenDeliveryService(deliveryService);
		onOpenForm();
	}
	return (
		<Box minW={"927px"}>
			<Flex
				color={"#343434"}
				bg={"rgba(255,255,255,0.9)"}
				mx={"auto"}
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
				w={"100%"}
			>
				<Flex justifyContent={"space-between"}>
					<Text fontSize={"2xl"}>Delivery service</Text>
					<Button
						w={"90px"}
						rounded={"4px"}
						overflow={"hidden"}
						bg={colorPallete.button}
						onClick={() => {
							handleCreate();
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
					h={"408px"}
					fontSize={"md"}
					rounded={"8px"}
					mt={"12px"}
					border={"2px"}
					borderColor={colorPallete.button}
				>
					<TableContainer flex={1}>
						<Table variant="striped" colorScheme={"purple"} fontSize={"small"}>
							<Thead>
								<Tr>
									<Th>Name</Th>
									<Th>Phone</Th>
									<Th></Th>
								</Tr>
							</Thead>
							<Tbody>
								{getDeliveryServicesPageRes.data.content &&
									getDeliveryServicesPageRes.data.content.map(
										(item: DeliveryService) => (
											<Tr key={item.name}>
												<Td w={"40%"}>{item.name}</Td>
												<Td w={"40%"}>{item.phone}</Td>
												<Td>
													<Flex gap={"4"}>
														<Button
															flexGrow={"1"}
															w={"90px"}
															rounded={"4px"}
															overflow={"hidden"}
															bg={colorPallete.deleteButton}
															color={"white"}
															onClick={() =>
																handleDeleteDeliveryService(
																	item.name
																)
															}
															_hover={{
																bg: colorPallete.deleteButtonHover,
																transform: "scale(1.05,1.05)",
																transition: "0.2s",
															}}
														>
															Delete
														</Button>
														<Button
															w={"90px"}
															rounded={"4px"}
															overflow={"hidden"}
															bg={colorPallete.button}
															onClick={() => {
																handleUpdate(item);
															}}
															_hover={{
																bg: colorPallete.buttonHover,
																transform: "scale(1.05,1.05)",
																transition: "0.2s",
															}}
															fontSize={"md"}
														>
															update
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
					lastPage={getDeliveryServicesPageRes.data.totalPages}
					maxLength={5}
					setCurrentPage={setCurrentPage}
					getPage={getDeliveryServicesPage}
				/>
			</Flex>
			<DeliveryServiceForm
				isOpen={isOpenForm}
				onClose={onCloseForm}
				fetchDeliveryServices={getDeliveryServicesPage}
				chosenDeliveryService={chosenDeliveryService}
				setChosenDeliveryService={setChosenDeliveryService}
			/>
		</Box>
	);
};
