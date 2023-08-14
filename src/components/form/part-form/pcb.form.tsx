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
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	Text,
	Checkbox,
	Select,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useFetchSizes } from "../../../hooks/part-data-hooks/get-all/size.get-all.hook";
import { useCreatePCB } from "../../../hooks/part-hooks/create/pcb.create.hook";
import { useFetchBrands } from "../../../hooks/warehouse-hooks/get-all/brand.get-all.hook";
import { useFetchSupplier } from "../../../hooks/warehouse-hooks/get-all/supplier.get-all.hook";
import { PCB } from "../../../model/part.model";
import { Brand, Supplier } from "../../../model/warehouse.model";
import { ApiResponse } from "../../../store/auth-store/types/response.type";
import { colorPallete } from "../../../styles/color";
import { PCB_DEFAULT_VALUES, PCB_VALIDATION_SCHEMA } from "../../../utils/constants/part.constants";
import { useForm } from "react-hook-form";
import { PriceWeight, PCBType, PinType, StabilizerType } from "../../../utils/enum";

interface PCBFormProps {
	isOpen: boolean;
	onClose: () => void;
	fetchPage: (pageNumber: number) => Promise<void>;
}

export const PCBForm = ({ isOpen, onClose, fetchPage }: PCBFormProps) => {
	const { getBrands } = useFetchBrands();
	const { getSizes } = useFetchSizes();
	const { getSuppliers } = useFetchSupplier();
	const { createPCB } = useCreatePCB();
	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors },
	} = useForm<PCB>({
		defaultValues: PCB_DEFAULT_VALUES,
		resolver: yupResolver(PCB_VALIDATION_SCHEMA),
	});
	const [image, setImage] = useState<File | null>();
	const [brandNames, setBrandNames] = useState<string[]>([]);
	const [supplierNames, setSupplierNames] = useState<string[]>([]);
	const [sizeNames, setSizeNames] = useState<string[]>([]);
	const [showBrand, setShowBrand] = useState<boolean>(true);
	const [init, setInit] = useState<boolean>(true);
	useEffect(() => {
		if (init) {
			getBrands().then((res: ApiResponse<Brand[] | null>) => {
				if (res.data == null) {
					toast.error("Something wrong with fetching brands!");
					return;
				}
				const brandNames: string[] = res.data.map((brand) => brand.name);
				setBrandNames(brandNames);
				setValue("brand", brandNames[0]);
			});
			getSuppliers().then((res: ApiResponse<Supplier[] | null>) => {
				if (res.data == null) {
					toast.error("Something wrong with fetching brands!");
					return;
				}
				const supplierNames: string[] = res.data.map((supplier) => supplier.name);
				setSupplierNames(supplierNames);
			});
			getSizes().then((res: ApiResponse<string[] | null>) => {
				if (res.data == null) {
					toast.error("Something wrong with fetching sizes!");
					return;
				}
				setSizeNames(res.data);
				setValue("size", res.data[0]);
			});
			setInit(false);
		}
	}, [init]);
	async function handleCreatePCB(values: PCB) {
		if (image === undefined || image === null) {
			toast.error("You did not choose image for PCB!");
			return;
		}
		createPCB(values, image).then((response: ApiResponse<null>) => {
			if (response.status === "SUCCESS") {
				fetchPage(0);
				reset();
				setImage(null);
				setShowBrand(true);
				setInit(true);
				onClose();
			}
		});
	}
	function handleHasBrandChange() {
		if (showBrand) {
			setValue("brand", "");
			setValue("supplier", supplierNames[0]);
		} else {
			setValue("brand", brandNames[0]);
			setValue("supplier", "");
		}
		setShowBrand(!showBrand);
	}
	return (
		<Modal
			isOpen={isOpen}
			onClose={() => {
				reset();
				setImage(null);
				setShowBrand(true);
				setInit(true);
				onClose();
			}}
		>
			<ModalOverlay />
			<ModalContent margin={"auto"} maxW="760px">
				<ModalHeader textAlign={"center"} mt={4}>
					Add PCB
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Flex
						color={"#343434"}
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
							<FormControl isInvalid={errors.price != null}>
								<FormLabel fontWeight={"semibold"}>Price</FormLabel>
								<Input
									type="number"
									rounded={"4px"}
									h={"45px"}
									borderColor={colorPallete.inputBorder}
									{...register("price")}
									_hover={{
										borderColor: colorPallete.inputBorderHover,
									}}
								/>
								{errors.price ? (
									<FormErrorMessage ml={"8px"}>
										Price should be a positive number
									</FormErrorMessage>
								) : (
									<Box h={"25px"} w="100%" ml={"8px"}></Box>
								)}
							</FormControl>
							<FormControl isInvalid={errors.priceWeight != null}>
								<FormLabel fontWeight={"semibold"}>Price weight</FormLabel>
								<Select
									rounded={"4px"}
									h={"45px"}
									borderColor={colorPallete.inputBorder}
									{...register("priceWeight")}
									_hover={{
										borderColor: colorPallete.inputBorderHover,
									}}
									defaultValue={PriceWeight.LIGHT}
								>
									<option value={PriceWeight.LIGHT}>Light</option>
									<option value={PriceWeight.MEDIUM}>Medium</option>
									<option value={PriceWeight.HEAVY}>Heavy</option>
								</Select>
								{errors.priceWeight ? (
									<FormErrorMessage ml={"8px"}>
										{errors.priceWeight.message}
									</FormErrorMessage>
								) : (
									<Box h={"25px"} w="100%" ml={"8px"}></Box>
								)}
							</FormControl>
						</Flex>
						<Flex gap={"16px"} mb={"25px"}>
							{showBrand ? (
								<Flex flexDirection={"column"} minW={"calc(33% - 8px)"}>
									<FormLabel fontWeight={"semibold"}>Brand</FormLabel>
									<Select
										rounded={"4px"}
										h={"45px"}
										borderColor={colorPallete.inputBorder}
										{...register("brand")}
										_hover={{
											borderColor: colorPallete.inputBorderHover,
										}}
										defaultValue={brandNames[0]}
									>
										{brandNames.map((brand, index) => (
											<option value={brand} key={index}>
												{brand}
											</option>
										))}
									</Select>
								</Flex>
							) : (
								<Flex flexDirection={"column"} minW={"calc(33% - 8px)"}>
									<FormLabel fontWeight={"semibold"}>Supplier</FormLabel>
									<Select
										rounded={"4px"}
										h={"45px"}
										borderColor={colorPallete.inputBorder}
										{...register("supplier")}
										_hover={{
											borderColor: colorPallete.inputBorderHover,
										}}
										defaultValue={brandNames[0]}
									>
										{supplierNames.map((supplier, index) => (
											<option value={supplier} key={index}>
												{supplier}
											</option>
										))}
									</Select>
								</Flex>
							)}
							<Flex
								justifyContent={"center"}
								minH={"100%"}
								mt={"25px"}
								minW={"calc(33% - 8px)"}
							>
								<FormLabel
									fontWeight={"semibold"}
									h={"25px"}
									textAlign={"center"}
									my={"auto"}
								>
									Has brand
								</FormLabel>
								<Checkbox
									rounded={"4px"}
									h={"45px"}
									colorScheme={"purple"}
									my={"auto"}
									borderColor={colorPallete.inputBorder}
									onChange={handleHasBrandChange}
									_hover={{
										borderColor: colorPallete.buttonHover,
									}}
									defaultChecked
								/>
							</Flex>
							<Flex minW={"calc(33% - 8px)"} flexDirection={"column"}>
								<Text mb={"8px"}>Image</Text>
								<Input
									id="image"
									minW={"100%"}
									rounded={"4px"}
									h={"45px"}
									borderColor={colorPallete.inputBorder}
									onChange={(e) => {
										if (e.target.files) {
											setImage(e.target.files[0]);
										}
									}}
									_hover={{
										borderColor: colorPallete.inputBorderHover,
									}}
									type="file"
									width={"80%"}
								/>
							</Flex>
						</Flex>

						<Flex gap={"16px"}>
							<FormControl isInvalid={errors.type != null}>
								<FormLabel fontWeight={"semibold"}>PCB type</FormLabel>
								<Select
									rounded={"4px"}
									h={"45px"}
									borderColor={colorPallete.inputBorder}
									{...register("type")}
									_hover={{
										borderColor: colorPallete.inputBorderHover,
									}}
									defaultValue={PCBType.HOT_SWAP}
								>
									<option value={PCBType.HOT_SWAP}>Hot-swap</option>
									<option value={PCBType.STANDARD}>Standard</option>
								</Select>
								{errors.type ? (
									<FormErrorMessage ml={"8px"}>
										{errors.type.message}
									</FormErrorMessage>
								) : (
									<Box h={"25px"} w="100%" ml={"8px"}></Box>
								)}
							</FormControl>
							<FormControl isInvalid={errors.color != null}>
								<FormLabel fontWeight={"semibold"}>Color</FormLabel>
								<Input
									type="text"
									rounded={"4px"}
									h={"45px"}
									borderColor={colorPallete.inputBorder}
									{...register("color")}
									_hover={{
										borderColor: colorPallete.inputBorderHover,
									}}
								/>
								{errors.color ? (
									<FormErrorMessage ml={"8px"}>
										{errors.color.message}
									</FormErrorMessage>
								) : (
									<Box h={"25px"} w="100%" ml={"8px"}></Box>
								)}
							</FormControl>
							<FormControl isInvalid={errors.size != null}>
								<FormLabel fontWeight={"semibold"}>Size</FormLabel>
								<Select
									rounded={"4px"}
									h={"45px"}
									borderColor={colorPallete.inputBorder}
									{...register("size")}
									_hover={{
										borderColor: colorPallete.inputBorderHover,
									}}
									defaultValue={sizeNames[0]}
								>
									{sizeNames.map((size, index) => (
										<option value={size} key={index}>
											{size}
										</option>
									))}
								</Select>
								{errors.size ? (
									<FormErrorMessage ml={"8px"}>
										{errors.size.message}
									</FormErrorMessage>
								) : (
									<Box h={"25px"} w="100%" ml={"8px"}></Box>
								)}
							</FormControl>
						</Flex>
						<Flex gap={"16px"}>
							<FormControl isInvalid={errors.pinType != null}>
								<FormLabel fontWeight={"semibold"}>Pin type</FormLabel>
								<Select
									rounded={"4px"}
									h={"45px"}
									borderColor={colorPallete.inputBorder}
									{...register("pinType")}
									_hover={{
										borderColor: colorPallete.inputBorderHover,
									}}
									defaultValue={PinType.PIN5}
								>
									<option value={PinType.PIN3}>3 pin</option>
									<option value={PinType.PIN5}>5 pin</option>
								</Select>
								{errors.pinType ? (
									<FormErrorMessage ml={"8px"}>
										{errors.pinType.message}
									</FormErrorMessage>
								) : (
									<Box h={"25px"} w="100%" ml={"8px"}></Box>
								)}
							</FormControl>
							<FormControl isInvalid={errors.btConnect != null}>
								<Flex justifyContent={"center"} h={"100%"}>
									<FormLabel
										fontWeight={"semibold"}
										h={"25px"}
										textAlign={"center"}
										my={"auto"}
									>
										Have bluetooth connection
									</FormLabel>
									<Checkbox
										rounded={"4px"}
										h={"45px"}
										colorScheme={"purple"}
										my={"auto"}
										borderColor={colorPallete.inputBorder}
										{...register("btConnect")}
										_hover={{
											borderColor: colorPallete.buttonHover,
										}}
									/>
								</Flex>
							</FormControl>
							<FormControl isInvalid={errors.stabilizerType != null}>
								<FormLabel fontWeight={"semibold"}>Stabilizer type</FormLabel>
								<Select
									rounded={"4px"}
									h={"45px"}
									borderColor={colorPallete.inputBorder}
									{...register("stabilizerType")}
									_hover={{
										borderColor: colorPallete.inputBorderHover,
									}}
									defaultValue={StabilizerType.CLAMPED}
								>
									<option value={StabilizerType.CLAMPED}>Clamped</option>
									<option value={StabilizerType.SCREW_IN}>Screw-in</option>
								</Select>
								{errors.stabilizerType ? (
									<FormErrorMessage ml={"8px"}>
										{errors.stabilizerType.message}
									</FormErrorMessage>
								) : (
									<Box h={"25px"} w="100%" ml={"8px"}></Box>
								)}
							</FormControl>
						</Flex>
						<Center h={"45px"} mt={"16px"} w={"auto"}>
							<Button
								w={"50%"}
								h={"45px"}
								rounded={"4px"}
								onClick={handleSubmit(handleCreatePCB)}
								overflow={"hidden"}
								bg={colorPallete.button}
								_hover={{
									bg: colorPallete.buttonHover,
									w: "calc(1.03 * 50%)",
									h: "46.5px",
									transition: "0.2s",
								}}
								fontSize={"xl"}
								position={"absolute"}
							>
								Add PCB
							</Button>
						</Center>
					</Flex>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
