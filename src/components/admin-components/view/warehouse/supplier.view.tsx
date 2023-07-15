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
import { useDeleteBrand } from "../../../../hooks/warehouse-hooks/delete/brand.delete.hook";
import { useFetchSuppliersPage } from "../../../../hooks/warehouse-hooks/get-all/supplier.get-all-page.hook";
import { Supplier } from "../../../../model/warehouse.model";
import { SupplierForm } from "../../form/warehouse/supplier.form";

export const SupplierView = () => {
	const [currentPage, setCurrentPage] = useState<number>(0);
	const { getSuppliersPage, getSuppliersPageRes } = useFetchSuppliersPage();
	const { deleteBrand } = useDeleteBrand();
	const {
		isOpen: isOpenForm,
		onClose: onCloseForm,
		onOpen: onOpenForm,
	} = useDisclosure();
	useEffect(() => {
		getSuppliersPage(0).then(() => setCurrentPage(1));
	}, []);
	async function handleDeleteSupplier(name: String) {
		deleteBrand(name).then((response: ApiResponse<null>) => {
			if (response.status === "SUCCESS") {
				getSuppliersPage(0).then(() => setCurrentPage(1));
			}
		});
	}

	return (
		<Box w={"100%"}>
			<Flex
				color={"#343434"}
				bgColor={"rgba(255,255,255,0.6)"}
				mx={"auto"}
				mb={"32px"}
				px={"32px"}
				py={"32px"}
				rounded={"16px"}
				position={"relative"}
				fontWeight={"bold"}
				flexDirection={"column"}
				alignContent={"center"}
				justifyContent={"center"}
				w={"90%"}
			>
				<Flex justifyContent={"space-between"}>
					<Text fontSize={"2xl"}>Supplier</Text>
					<Button
						w={"90px"}
						rounded={"32px"}
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
									<Th>Slogan</Th>
								</Tr>
							</Thead>
							<Tbody>
								{getSuppliersPageRes.data.content &&
									getSuppliersPageRes.data.content.map(
										(item: Supplier) => (
											<Tr key={item.name}>
												<Td w={"40%"}>{item.name}</Td>
												<Td w={"40%"}>{item.phone}</Td>
												<Td>
													<Flex gap={"4"}>
														<Button
															flexGrow={"1"}
															rounded={"32px"}
															overflow={"hidden"}
															bg={
																colorPallete.deleteButton
															}
															color={"white"}
															onClick={() =>
																handleDeleteSupplier(
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
					lastPage={getSuppliersPageRes.data.totalPages}
					maxLength={5}
					setCurrentPage={setCurrentPage}
					getPage={getSuppliersPage}
				/>
			</Flex>
			<Box h={"calc(100vh - 815px)"} />
			<SupplierForm
				isOpen={isOpenForm}
				onClose={onCloseForm}
				fetchSuppliers={getSuppliersPage}
			/>
		</Box>
	);
};
