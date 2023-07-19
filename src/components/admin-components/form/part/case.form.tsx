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
	Select,
} from "@chakra-ui/react";
import { colorPallete } from "../../../../styles/color";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ApiResponse } from "../../../../store/auth-store/types/response.type";
import { Case } from "../../../../model/part.model";
import {
	CASE_DEFAULT_VALUES,
	CASE_VALIDATION_SCHEMA,
} from "../../../../utils/constants/part.constants";
import { useEffect, useState } from "react";
import { useFetchBrands } from "../../../../hooks/warehouse-hooks/get-all/brand.get-all.hook";
import { Brand } from "../../../../model/warehouse.model";
import { toast } from "react-toastify";
import { PartType, PriceWeight } from "../../../../utils/enum";
import { useCreateCase } from "../../../../hooks/part-hooks/create/case.create.hook";
import { useFetchSizes } from "../../../../hooks/part-data-hooks/get-all/size.get-all.hook";
interface KeycapProfileFormProps {
	isOpen: boolean;
	onClose: () => void;
	fetchCases: (pageNumber: number, partType: PartType) => Promise<void>;
}

const partType = PartType.CASE;

export const CaseForm = ({
	isOpen,
	onClose,
	fetchCases,
}: KeycapProfileFormProps) => {
	const { getBrands } = useFetchBrands();
	const { getSizes } = useFetchSizes();
	const { createCase } = useCreateCase();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<Case>({
		defaultValues: CASE_DEFAULT_VALUES,
		resolver: yupResolver(CASE_VALIDATION_SCHEMA),
	});
	const [image, setImage] = useState<File | null>();
	const [brandNames, setBrandNames] = useState<string[]>([]);
	const [sizeNames, setSizeNames] = useState<string[]>([]);
	useEffect(() => {
		getBrands().then((res: ApiResponse<Brand[] | null>) => {
			if (res.data == null) {
				toast.error("Something wrong with fetching brands!");
				return;
			}
			const brandNames: string[] = res.data.map((brand) => brand.name);
			setBrandNames(brandNames);
		});
		getSizes().then((res: ApiResponse<string[] | null>) => {
			if (res.data == null) {
				toast.error("Something wrong with fetching sizes!");
				return;
			}
			setSizeNames(res.data);
		});
	}, []);
	async function handleCreateCase(values: Case) {
		if (image === undefined || image === null) {
			toast.error("You did not choose image for case!");
			return;
		}
		createCase(values, image).then((response: ApiResponse<null>) => {
			if (response.status === "SUCCESS") {
				fetchCases(0, partType);
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
					Add case
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
								<FormLabel fontWeight={"semibold"}>
									Name
								</FormLabel>
								<Input
									type="text"
									rounded={"4px"}
									h={"45px"}
									borderColor={colorPallete.inputBorder}
									{...register("name")}
									_hover={{
										borderColor:
											colorPallete.inputBorderHover,
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
								<FormLabel fontWeight={"semibold"}>
									Price
								</FormLabel>
								<Input
									type="number"
									rounded={"4px"}
									h={"45px"}
									borderColor={colorPallete.inputBorder}
									{...register("price")}
									_hover={{
										borderColor:
											colorPallete.inputBorderHover,
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
						</Flex>
						<Flex gap={"16px"}>
							<FormControl isInvalid={errors.priceWeight != null}>
								<FormLabel fontWeight={"semibold"}>
									Price weight
								</FormLabel>
								<Select
									rounded={"4px"}
									h={"45px"}
									borderColor={colorPallete.inputBorder}
									{...register("priceWeight")}
									_hover={{
										borderColor:
											colorPallete.inputBorderHover,
									}}
									defaultValue={PriceWeight.LIGHT}
								>
									<option value={PriceWeight.LIGHT}>
										Light
									</option>
									<option value={PriceWeight.MEDIUM}>
										Medium
									</option>
									<option value={PriceWeight.HEAVY}>
										Heavy
									</option>
								</Select>
								{errors.priceWeight ? (
									<FormErrorMessage ml={"8px"}>
										{errors.priceWeight.message}
									</FormErrorMessage>
								) : (
									<Box h={"25px"} w="100%" ml={"8px"}></Box>
								)}
							</FormControl>
							<FormControl isInvalid={errors.brand != null}>
								<FormLabel fontWeight={"semibold"}>
									Brand
								</FormLabel>
								<Select
									rounded={"4px"}
									h={"45px"}
									borderColor={colorPallete.inputBorder}
									{...register("brand")}
									_hover={{
										borderColor:
											colorPallete.inputBorderHover,
									}}
									defaultValue={brandNames[0]}
								>
									{brandNames.map((brand, index) => (
										<option value={brand} key={index}>
											{brand}
										</option>
									))}
								</Select>
								{errors.brand ? (
									<FormErrorMessage ml={"8px"}>
										Brand name is required field
									</FormErrorMessage>
								) : (
									<Box h={"25px"} w="100%" ml={"8px"}></Box>
								)}
							</FormControl>
						</Flex>
						<Flex gap={"16px"}>
							<FormControl isInvalid={errors.material != null}>
								<FormLabel fontWeight={"semibold"}>
									Material
								</FormLabel>
								<Input
									type="text"
									rounded={"4px"}
									h={"45px"}
									borderColor={colorPallete.inputBorder}
									{...register("material")}
									_hover={{
										borderColor:
											colorPallete.inputBorderHover,
									}}
								/>
								{errors.material ? (
									<FormErrorMessage ml={"8px"}>
										{errors.material.message}
									</FormErrorMessage>
								) : (
									<Box h={"25px"} w="100%" ml={"8px"}></Box>
								)}
							</FormControl>
							<FormControl isInvalid={errors.color != null}>
								<FormLabel fontWeight={"semibold"}>
									Color
								</FormLabel>
								<Input
									type="text"
									rounded={"4px"}
									h={"45px"}
									borderColor={colorPallete.inputBorder}
									{...register("color")}
									_hover={{
										borderColor:
											colorPallete.inputBorderHover,
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
						</Flex>
						<Center h={"45px"} mt={"16px"} w={"auto"}>
							<Button
								w={"calc(100% - 64px)"}
								h={"45px"}
								rounded={"4px"}
								onClick={handleSubmit(handleCreateCase)}
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
								Add case
							</Button>
						</Center>
					</Flex>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
