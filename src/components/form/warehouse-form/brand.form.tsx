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
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateBrand } from "../../../hooks/warehouse-hooks/create/brand.create.hook";
import { Brand } from "../../../model/warehouse.model";
import { ApiResponse } from "../../../store/auth-store/types/response.type";
import { colorPallete } from "../../../styles/color";
import {
	BRAND_DEFAULT_VALUES,
	BRAND_VALIDATION_SCHEMA,
} from "../../../utils/constants/warehouse.constants";
import { useForm } from "react-hook-form";

interface BrandFormProps {
	isOpen: boolean;
	onClose: () => void;
	fetchBrands: (pageNumber: number) => Promise<void>;
}

export const BrandForm = ({ isOpen, onClose, fetchBrands }: BrandFormProps) => {
	const { createBrand } = useCreateBrand();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<Brand>({
		defaultValues: BRAND_DEFAULT_VALUES,
		resolver: yupResolver(BRAND_VALIDATION_SCHEMA),
	});
	async function handleCreateBrand(values: Brand) {
		createBrand(values).then((response: ApiResponse<null>) => {
			if (response.status === "SUCCESS") {
				fetchBrands(0);
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
					Add brand
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
						<FormControl isInvalid={errors.slogan != null}>
							<FormLabel fontWeight={"semibold"}>Slogan</FormLabel>
							<Input
								type="text"
								rounded={"4px"}
								h={"45px"}
								borderColor={colorPallete.inputBorder}
								{...register("slogan")}
								_hover={{
									borderColor: colorPallete.inputBorderHover,
								}}
							/>
							{errors.slogan ? (
								<FormErrorMessage ml={"8px"}>
									{errors.slogan.message}
								</FormErrorMessage>
							) : (
								<Box h={"25px"} w="100%" ml={"8px"}></Box>
							)}
						</FormControl>
						<Center h={"45px"} mt={"16px"} w={"auto"}>
							<Button
								w={"calc(100% - 64px)"}
								h={"45px"}
								rounded={"4px"}
								onClick={handleSubmit(handleCreateBrand)}
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
								Add brand
							</Button>
						</Center>
					</Flex>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
