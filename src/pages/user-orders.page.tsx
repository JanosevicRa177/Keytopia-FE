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
import { useFetchOrdersBuyer } from "../hooks/order-hooks/order.buyer.get-all-page.hook";
import { OrderFilterSort } from "../components/filter-sort-components/order.filter-sort";
import { Pagination } from "../components/paging/pagination/pagination";
import { OrderProductsModal } from "../components/util-components/order-products.modal";
import { Order } from "../model/sales.model";
import { colorPallete } from "../styles/color";
import { SortDirection } from "../utils/enum";
import { normalizeDate } from "../utils/string.converter";
import { MainContrainer } from "../components/page-component/main-container";

export const UserOrdersPage = () => {
	const [currentPage, setCurrentPage] = useState<number>(0);
	const { getOrdersPageBuyer, getOrdersPageBuyerRes } = useFetchOrdersBuyer();
	const [chosenOrder, setChosenOrder] = useState<Order>();
	const [searchId, setSearchId] = useState("");
	const [sortedDirection, setSortedDirection] = useState<SortDirection>(SortDirection.UNSORTED);
	const { isOpen: isOpenModal, onClose: onCloseModal, onOpen: onOpenModal } = useDisclosure();
	useEffect(() => {
		handleGetOrdersPage(0);
	}, []);

	async function handleGetOrdersPage(pageNumber: number) {
		getOrdersPageBuyer(pageNumber, sortedDirection, searchId).then(() => setCurrentPage(1));
	}
	function handleShowProducts(order: Order) {
		setChosenOrder(order);
		onOpenModal();
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
				<Box minW={"927px"} zIndex={"2"} mx={"24px"}>
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
							<Text fontSize={"2xl"}>Orders</Text>
						</Flex>
						<OrderFilterSort
							fetchOrder={handleGetOrdersPage}
							searchId={searchId}
							setSearchId={setSearchId}
							setSortedDirection={setSortedDirection}
							sortedDirection={sortedDirection}
						/>
						<Flex
							h={"408px"}
							fontSize={"md"}
							rounded={"8px"}
							mt={"36px"}
							border={"2px"}
							borderColor={colorPallete.button}
						>
							<TableContainer flex={1}>
								<Table variant="striped" colorScheme={"purple"} fontSize={"small"}>
									<Thead>
										<Tr>
											<Th w={"50%"}>Id</Th>
											<Th w={"20%"}>Date</Th>
											<Th w={"20%"}>Deadline</Th>
											<Th w={"20%"}></Th>
										</Tr>
									</Thead>
									<Tbody>
										{getOrdersPageBuyerRes.data.content &&
											getOrdersPageBuyerRes.data.content.map(
												(item: Order) => (
													<Tr key={item.id}>
														<Td w={"50%"}>{item.id}</Td>
														<Td w={"20%"}>
															{normalizeDate(item.date.toString())}
														</Td>
														<Td w={"20%"}>
															{normalizeDate(
																item.deadline.toString()
															)}
														</Td>
														<Td w={"20%"}>
															<Flex gap={"4"}>
																<Button
																	w={"100%"}
																	rounded={"4px"}
																	overflow={"hidden"}
																	color={"#343434"}
																	bg={colorPallete.button}
																	onClick={() =>
																		handleShowProducts(item)
																	}
																	_hover={{
																		bg: colorPallete.buttonHover,
																		transform:
																			"scale(1.05,1.05)",
																		transition: "0.2s",
																	}}
																>
																	Show products
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
							lastPage={getOrdersPageBuyerRes.data.totalPages}
							maxLength={5}
							setCurrentPage={setCurrentPage}
							getPage={handleGetOrdersPage}
						/>
					</Flex>
					<OrderProductsModal
						order={chosenOrder}
						isOpen={isOpenModal}
						onClose={onCloseModal}
					/>
				</Box>
			</Flex>
		</MainContrainer>
	);
};
