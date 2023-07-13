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
import { colorPallete } from "../../../styles/color";
import {
	SIZE_DEFAULT_VALUES,
	SIZE_VALIDATION_SCHEMA,
} from "../../../utils/part-data.constatns";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useCreateSize } from "../../../hooks/part-data-hooks/create/size.create.hook";
import { Size } from "../../../model/part-data.model";
import { ApiResponse } from "../../../store/auth-store/types/response.type";

interface SizeFormProps {
	isOpen: boolean;
	onClose: () => void;
	fetchSizes: (pageNumber: number) => Promise<void>;
}

export const SizeForm = ({ isOpen, onClose, fetchSizes }: SizeFormProps) => {
	const { createSize } = useCreateSize();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<Size>({
		defaultValues: SIZE_DEFAULT_VALUES,
		resolver: yupResolver(SIZE_VALIDATION_SCHEMA),
	});
	async function handleCreateSize(values: Size) {
		createSize(values).then((response: ApiResponse<null>) => {
			if (response.status === "SUCCESS") {
				fetchSizes(0);
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
					Create size
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
								rounded={"30px"}
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
						<FormControl
							isInvalid={errors.neededNumberOfKeys != null}
						>
							<FormLabel fontWeight={"semibold"}>
								Needed Number Of Keys
							</FormLabel>
							<Input
								type="number"
								rounded={"30px"}
								h={"45px"}
								borderColor={colorPallete.inputBorder}
								{...register("neededNumberOfKeys")}
								_hover={{
									borderColor: colorPallete.inputBorderHover,
								}}
							/>
							{errors.neededNumberOfKeys ? (
								<FormErrorMessage ml={"8px"}>
									Needed number of keys is required and should
									be a positive number
								</FormErrorMessage>
							) : (
								<Box h={"25px"} w="100%" ml={"8px"}></Box>
							)}
						</FormControl>
						<Center h={"45px"} mt={"16px"} w={"auto"}>
							<Button
								w={"calc(100% - 64px)"}
								h={"45px"}
								rounded={"32px"}
								onClick={handleSubmit(handleCreateSize)}
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
								Create size
							</Button>
						</Center>
					</Flex>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
