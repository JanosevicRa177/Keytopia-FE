/* eslint-disable react-hooks/exhaustive-deps */
import {
	Box,
	Flex,
	Center,
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	ModalBody,
	ModalContent,
	Modal,
	ModalHeader,
	ModalOverlay,
	ModalCloseButton,
} from "@chakra-ui/react";
import { useCreateSupplier } from "../../../hooks/warehouse-hooks/create/supplier.create.hook";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useFetchBrands } from "../../../hooks/warehouse-hooks/get-all/brand.get-all.hook";
import { Supplier, Brand } from "../../../model/warehouse.model";
import { ApiResponse } from "../../../store/auth-store/types/response.type";
import { colorPallete } from "../../../styles/color";
import {
	SUPPLIER_DEFAULT_VALUES,
	SUPPLIER_VALIDATION_SCHEMA,
} from "../../../utils/constants/warehouse.constants";
import { MultiselectOption } from "../../../utils/types";
import { Multiselect } from "../../util-components/multiselect.component";
import { useForm } from "react-hook-form";

interface SupplierFormProps {
	isOpen: boolean;
	onClose: () => void;
	fetchSuppliers: (pageNumber: number) => Promise<void>;
}

export const SupplierForm = ({ isOpen, onClose, fetchSuppliers }: SupplierFormProps) => {
	const { createSupplier } = useCreateSupplier();
	const { getBrands } = useFetchBrands();
	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors },
	} = useForm<Supplier>({
		defaultValues: SUPPLIER_DEFAULT_VALUES,
		resolver: yupResolver(SUPPLIER_VALIDATION_SCHEMA),
	});
	const [brandNames, setBrandNames] = useState<MultiselectOption[]>([]);
	useEffect(() => {
		getBrands().then((res: ApiResponse<Brand[] | null>) => {
			if (res.data == null) {
				toast.error("Something wrong with fetching brands!");
				return;
			}
			const brandNames: MultiselectOption[] = res.data.map((brand) => ({
				text: brand.name,
				value: brand.name,
			}));
			setBrandNames(brandNames);
		});
	}, []);
	async function handleCreateSupplier(values: Supplier) {
		createSupplier(values).then((response: ApiResponse<null>) => {
			if (response.status === "SUCCESS") {
				fetchSuppliers(0);
				reset();
				onClose();
			}
		});
	}
	return (
		<Modal
			isOpen={isOpen}
			onClose={() => {
				reset();
				onClose();
			}}
		>
			<ModalOverlay />
			<ModalContent margin={"auto"}>
				<ModalHeader textAlign={"center"} mt={4}>
					Add supplier
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Flex
						color={"#343434"}
						bgColor={"rgba(255,255,255,0.6)"}
						mx={"auto"}
						mb={"32px"}
						px={"32px"}
						rounded={"16px"}
						position={"relative"}
						fontWeight={"bold"}
						flexDirection={"column"}
						alignContent={"center"}
						justifyContent={"center"}
					>
						<Flex gap={"16px"}>
							<FormControl isInvalid={errors.name != null}>
								<FormLabel fontWeight={"semibold"}>Name</FormLabel>
								<Input
									type="text"
									rounded={"4px"}
									h={"45px"}
									borderColor={colorPallete.inputBorder}
									{...register("name")}
									_hover={{
										borderColor: colorPallete.inputBorderHover,
									}}
								/>
								{errors.name ? (
									<FormErrorMessage ml={"8px"}>
										{errors.name.message}
									</FormErrorMessage>
								) : (
									<Box h={"25px"} w="100%" ml={"8px"}></Box>
								)}
							</FormControl>
							<FormControl isInvalid={errors.phone != null}>
								<FormLabel fontWeight={"semibold"}>Phone</FormLabel>
								<Input
									type="text"
									rounded={"4px"}
									h={"45px"}
									borderColor={colorPallete.inputBorder}
									{...register("phone")}
									_hover={{
										borderColor: colorPallete.inputBorderHover,
									}}
								/>
								{errors.phone ? (
									<FormErrorMessage ml={"8px"}>
										{errors.phone.message}
									</FormErrorMessage>
								) : (
									<Box h={"25px"} w="100%" ml={"8px"}></Box>
								)}
							</FormControl>
						</Flex>
						<Flex gap="16px">
							<Box flexGrow={"1"}>
								<FormControl isInvalid={errors.address?.street != null}>
									<FormLabel fontWeight={"semibold"}>Street</FormLabel>
									<Input
										rounded={"4px"}
										h={"45px"}
										borderColor={colorPallete.inputBorder}
										{...register("address.street")}
										_hover={{
											borderColor: colorPallete.inputBorderHover,
										}}
									/>
									{errors.address?.street ? (
										<FormErrorMessage>
											Street is a required field
										</FormErrorMessage>
									) : (
										<Box h={"25px"} w="100%"></Box>
									)}
								</FormControl>
							</Box>
							<Box w="90px">
								<FormControl isInvalid={errors.address?.streetNumber != null}>
									<FormLabel fontWeight={"semibold"} whiteSpace={"nowrap"}>
										Street Number
									</FormLabel>
									<Input
										rounded={"4px"}
										h={"45px"}
										borderColor={colorPallete.inputBorder}
										{...register("address.streetNumber")}
										_hover={{
											borderColor: colorPallete.inputBorderHover,
										}}
									/>
									{errors.address?.streetNumber ? (
										<FormErrorMessage>
											Street number is a required field
										</FormErrorMessage>
									) : (
										<Box h={"25px"} w="100%"></Box>
									)}
								</FormControl>
							</Box>
						</Flex>
						<Flex gap={"16px"}>
							<Box minW={"130px"}>
								<FormControl isInvalid={errors.address?.city != null}>
									<FormLabel fontWeight={"semibold"}>City</FormLabel>
									<Input
										rounded={"4px"}
										h={"45px"}
										borderColor={colorPallete.inputBorder}
										{...register("address.city")}
										_hover={{
											borderColor: colorPallete.inputBorderHover,
										}}
									/>
									{errors.address?.city ? (
										<FormErrorMessage>
											City is a required field
										</FormErrorMessage>
									) : (
										<Box h={"25px"} w="100%"></Box>
									)}
								</FormControl>
							</Box>
							<FormControl isInvalid={errors.address?.zipCode != null}>
								<FormLabel fontWeight={"semibold"}>Zip code</FormLabel>
								<Input
									rounded={"4px"}
									h={"45px"}
									borderColor={colorPallete.inputBorder}
									{...register("address.zipCode")}
									_hover={{
										borderColor: colorPallete.inputBorderHover,
									}}
								/>
								{errors.address?.zipCode ? (
									<FormErrorMessage>
										Zip code is a required field
									</FormErrorMessage>
								) : (
									<Box h={"25px"} w="100%"></Box>
								)}
							</FormControl>

							<FormControl isInvalid={errors.address?.country != null}>
								<FormLabel fontWeight={"semibold"}>Country</FormLabel>
								<Input
									type="country"
									rounded={"4px"}
									h={"45px"}
									borderColor={colorPallete.inputBorder}
									{...register("address.country")}
									_hover={{
										borderColor: colorPallete.inputBorderHover,
									}}
								/>
								{errors.address?.country ? (
									<FormErrorMessage>
										{errors.address?.country?.message}
									</FormErrorMessage>
								) : (
									<Box h={"25px"} w="100%"></Box>
								)}
							</FormControl>
						</Flex>
						<FormControl isInvalid={errors.brands != null}>
							<FormLabel fontWeight={"semibold"} fontSize={"small"}>
								Brands
							</FormLabel>
							<Multiselect
								values={brandNames}
								multiselectName="brands"
								onChange={setValue}
								w={"290px"}
								isError={errors.brands ? true : false}
							/>
							{errors.brands ? (
								<FormErrorMessage>
									You should choose at least one brand
								</FormErrorMessage>
							) : (
								<Box h={"25px"} w="100%"></Box>
							)}
						</FormControl>
						<Center h={"45px"} mt={"16px"} w={"auto"}>
							<Button
								w={"calc(100% - 64px)"}
								h={"45px"}
								rounded={"4px"}
								onClick={handleSubmit(handleCreateSupplier)}
								overflow={"hidden"}
								bg={colorPallete.button}
								_hover={{
									bg: colorPallete.buttonHover,
									w: "calc(1.03 * (100% - 64px))",
									h: "46.5px",
									transition: "0.2s",
								}}
								fontSize={"xl"}
								position={"absolute"}
							>
								Add supplier
							</Button>
						</Center>
					</Flex>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
