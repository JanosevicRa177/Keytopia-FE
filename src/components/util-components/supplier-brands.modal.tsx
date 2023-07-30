/* eslint-disable react-hooks/exhaustive-deps */
import {
	Flex,
	Img,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Table,
	TableContainer,
	Tbody,
	Td,
	Tr,
	Text,
	Button,
} from "@chakra-ui/react";
import { useFetchBrands } from "../../hooks/warehouse-hooks/get-all/brand.get-all.hook";
import { useEffect, useState } from "react";
import { ApiResponse } from "../../store/auth-store/types/response.type";
import { Brand } from "../../model/warehouse.model";
import { toast } from "react-toastify";
import { colorPallete } from "../../styles/color";
import checkmark from "../../images/checkmark.png";
import { useUpdateSupplierBrands } from "../../hooks/warehouse-hooks/update/supplier-brands.update.hook";

interface SupplierBrandsModalProps {
	isOpen: boolean;
	onClose: () => void;
	data: string[];
	supplierName: string;
	setSupplierName: React.Dispatch<React.SetStateAction<string>>;
	fetchSuppliersAgain: () => void;
}

export const SupplierBrandsModal = ({
	isOpen,
	onClose,
	data,
	supplierName,
	setSupplierName,
	fetchSuppliersAgain,
}: SupplierBrandsModalProps) => {
	const [supplierBrands, setSupplierBrands] = useState<String[]>([]);
	const [allBrands, setAllBrands] = useState<String[]>([]);
	const { updateSupplierBrands } = useUpdateSupplierBrands();
	const { getBrands } = useFetchBrands();
	useEffect(() => {
		if (supplierName === "") return;
		setSupplierBrands(data);
		getBrands().then((res: ApiResponse<Brand[] | null>) => {
			if (res.status === "ERROR" || res.data == null) {
				toast.error(res.error);
				return;
			}
			const brandNames: String[] = res.data.map((brand) => brand.name);
			setAllBrands(brandNames);
		});
	}, [supplierName]);
	function brandIndex(brand: String): number {
		const index = supplierBrands.findIndex((supplierBrand) => supplierBrand === brand);
		return index;
	}
	function handle(brand: String) {
		const index = brandIndex(brand);
		if (index === -1) {
			const temp = Object.assign([], supplierBrands);
			temp.push(brand);
			setSupplierBrands(temp);
			return;
		}
		const temp = Object.assign([], supplierBrands);
		temp.splice(index, 1);
		setSupplierBrands(temp);
	}
	async function handleSupplierBrands() {
		updateSupplierBrands(supplierName, supplierBrands).then((res: ApiResponse<null>) => {
			if (res.status === "ERROR") {
				toast.error(res.error);
				return;
			}
			toast.success("Brands for " + supplierName + "successfully updated!");
			onClose();
			fetchSuppliersAgain();
			setSupplierName("");
		});
	}
	return (
		<Modal
			isOpen={isOpen}
			onClose={() => {
				onClose();
				setSupplierName("");
			}}
		>
			<ModalOverlay />
			<ModalContent margin={"auto"}>
				<ModalHeader textAlign={"center"} mt={4}>
					Brands for supplier {supplierName}
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Flex position={"relative"} w={"100%"} h={"450px"}>
						<Flex
							flexDir={"column"}
							cursor={"pointer"}
							w={"100%"}
							h={"450px"}
							position={"absolute"}
						>
							<Text fontWeight={"bold"} fontSize={"xl"} mb={"16px"}>
								Choose brands for supplier
							</Text>
							<TableContainer
								flex={1}
								rounded={"4px"}
								mx={"auto"}
								mb={"8px"}
								w={"calc(100% - 30px)"}
								h={"400px"}
								overflowY={"auto"}
							>
								<Table fontSize={"small"}>
									<Tbody>
										{allBrands.map((brand: String, index) => (
											<Tr
												key={index}
												transition={"0.1s ease"}
												bgColor={
													brandIndex(brand) !== -1
														? index % 2 === 0
															? colorPallete.inputBorderHover
															: colorPallete.oddTableColor
														: index % 2 === 0
														? "#949494"
														: "#D3D3D3"
												}
												onClick={() => handle(brand)}
												saturate={"0"}
											>
												<Td w={"10%"}>
													<Flex justifyContent={"space-between"}>
														<Text>{brand}</Text>
														{brandIndex(brand) !== -1 && (
															<Img
																src={checkmark}
																w={"20px"}
																h={"20px"}
															/>
														)}
													</Flex>
												</Td>
											</Tr>
										))}
									</Tbody>
								</Table>
							</TableContainer>
							<Flex
								justifyContent={"end"}
								pr={"15px"}
								pb={"32px"}
								position={"relative"}
							>
								<Button
									w={"130px"}
									rounded={"4px"}
									overflow={"hidden"}
									bg={colorPallete.button}
									onClick={() => {
										handleSupplierBrands();
									}}
									_hover={{
										bg: colorPallete.buttonHover,
										transform: "scale(1.05,1.05)",
										transition: "0.2s",
									}}
									fontSize={"md"}
								>
									Update brands
								</Button>
							</Flex>
						</Flex>
					</Flex>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
