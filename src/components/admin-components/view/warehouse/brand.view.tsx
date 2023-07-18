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
import { useFetchBrandsPage } from "../../../../hooks/warehouse-hooks/get-all/brand.get-all-page.hook";
import { Brand } from "../../../../model/warehouse.model";
import { BrandForm } from "../../form/warehouse/brand.form";

export const BrandView = () => {
	const [currentPage, setCurrentPage] = useState<number>(0);
	const { getBrandsPage, getBrandsPageRes } = useFetchBrandsPage();
	const { deleteBrand } = useDeleteBrand();
	const {
		isOpen: isOpenForm,
		onClose: onCloseForm,
		onOpen: onOpenForm,
	} = useDisclosure();
	useEffect(() => {
		getBrandsPage(0).then(() => setCurrentPage(1));
	}, []);
	async function handleDeleteBrand(name: String) {
		deleteBrand(name).then((response: ApiResponse<null>) => {
			if (response.status === "SUCCESS") {
				getBrandsPage(0).then(() => setCurrentPage(1));
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
					<Text fontSize={"2xl"}>Brand</Text>
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
									<Th>Slogan</Th>
								</Tr>
							</Thead>
							<Tbody>
								{getBrandsPageRes.data.content &&
									getBrandsPageRes.data.content.map(
										(item: Brand) => (
											<Tr key={item.name}>
												<Td w={"40%"}>{item.name}</Td>
												<Td w={"40%"}>{item.slogan}</Td>
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
																handleDeleteBrand(
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
					lastPage={getBrandsPageRes.data.totalPages}
					maxLength={5}
					setCurrentPage={setCurrentPage}
					getPage={getBrandsPage}
				/>
			</Flex>
			<Box h={"calc(100vh - 815px)"} />
			<BrandForm
				isOpen={isOpenForm}
				onClose={onCloseForm}
				fetchBrands={getBrandsPage}
			/>
		</Box>
	);
};
