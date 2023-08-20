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
import { colorPallete } from "../../../styles/color";
import { Pagination } from "../../paging/pagination/pagination";
import { useFetchOrdersAdmin } from "../../../hooks/order-hooks/order.admin.get-all-page.hook";
import { normalizeDate } from "../../../utils/string.converter";
import { Order } from "../../../model/sales.model";
import { OrderProductsModal } from "../../util-components/order-products.modal";
import { OrderFilterSort } from "../../filter-sort-components/order.filter-sort";
import { SortDirection } from "../../../utils/enum";

export const OrderView = () => {
	const [currentPage, setCurrentPage] = useState<number>(0);
	const { getOrdersPageAdmin, getOrdersPageAdminRes } = useFetchOrdersAdmin();
	const [chosenOrder, setChosenOrder] = useState<Order>();
	const [searchId, setSearchId] = useState("");
	const [sortedDirection, setSortedDirection] = useState<SortDirection>(SortDirection.UNSORTED);
	const { isOpen: isOpenModal, onClose: onCloseModal, onOpen: onOpenModal } = useDisclosure();
	useEffect(() => {
		handleGetOrdersPage(0);
	}, []);

	async function handleGetOrdersPage(pageNumber: number) {
		getOrdersPageAdmin(pageNumber, sortedDirection, searchId).then(() => setCurrentPage(1));
	}
	function handleShowProducts(order: Order) {
		setChosenOrder(order);
		onOpenModal();
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
									<Th w={"10%"}>Id</Th>
									<Th w={"20%"}>Buyer email</Th>
									<Th w={"10%"}>Date</Th>
									<Th w={"10%"}>Deadline</Th>
									<Th></Th>
								</Tr>
							</Thead>
							<Tbody>
								{getOrdersPageAdminRes.data.content &&
									getOrdersPageAdminRes.data.content.map((item: Order) => (
										<Tr key={item.id}>
											<Td w={"10%"}>{item.id}</Td>
											<Td w={"20%"}>{item.buyerEmail}</Td>
											<Td w={"10%"}>{normalizeDate(item.date.toString())}</Td>
											<Td w={"10%"}>
												{normalizeDate(item.deadline.toString())}
											</Td>
											<Td>
												<Flex gap={"4"}>
													<Button
														w={"100%"}
														rounded={"4px"}
														overflow={"hidden"}
														color={"#343434"}
														bg={colorPallete.button}
														onClick={() => handleShowProducts(item)}
														_hover={{
															bg: colorPallete.buttonHover,
															transform: "scale(1.05,1.05)",
															transition: "0.2s",
														}}
													>
														Show products
													</Button>
												</Flex>
											</Td>
										</Tr>
									))}
							</Tbody>
						</Table>
					</TableContainer>
				</Flex>
				<Pagination
					currentPage={currentPage}
					lastPage={getOrdersPageAdminRes.data.totalPages}
					maxLength={5}
					setCurrentPage={setCurrentPage}
					getPage={handleGetOrdersPage}
				/>
			</Flex>
			<OrderProductsModal order={chosenOrder} isOpen={isOpenModal} onClose={onCloseModal} />
		</Box>
	);
};
