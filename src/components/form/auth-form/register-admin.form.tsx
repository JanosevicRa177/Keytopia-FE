/* eslint-disable react-hooks/exhaustive-deps */
import {
	Flex,
	Center,
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	FormControl,
	FormLabel,
	Input,
	Box,
	FormErrorMessage,
} from "@chakra-ui/react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useRegisterUserAdmin } from "../../../hooks/auth-hooks/register-admin.hook";
import { colorPallete } from "../../../styles/color";
import {
	REGISTER_ADMIN_DEFAULT_VALUES,
	REGISTER_ADMIN_VALIDATION_SCHEMA,
} from "../../../utils/constants/auth.constants";

interface RegisterAdminFormProps {
	isOpen: boolean;
	onClose: () => void;
}

export type RegisterAdminFormValues = {
	name: string;
	surname: string;
	email: string;
	phone: string;
	address: {
		street: string;
		streetNumber: string;
		city: string;
		zipCode: string;
		country: string;
	};
};

export const RegisterAdminForm = ({ isOpen, onClose }: RegisterAdminFormProps) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterAdminFormValues>({
		defaultValues: REGISTER_ADMIN_DEFAULT_VALUES,
		resolver: yupResolver(REGISTER_ADMIN_VALIDATION_SCHEMA),
	});
	const { registerUserAdmin } = useRegisterUserAdmin();
	async function handleRegister(values: RegisterAdminFormValues) {
		await registerUserAdmin(values).then(() => {
			reset();
			onClose();
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
			<ModalContent margin={"auto"} maxW="560px">
				<ModalHeader textAlign={"center"} mt={4}>
					Register admin
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
						<FormControl isInvalid={errors.email != null}>
							<FormLabel fontWeight={"semibold"} fontSize={"small"}>
								Email address
							</FormLabel>
							<Input
								rounded={"4px"}
								h={"35px"}
								borderColor={colorPallete.inputBorder}
								{...register("email")}
								_hover={{
									borderColor: colorPallete.inputBorderHover,
								}}
							/>
							{errors.email ? (
								<FormErrorMessage>{errors.email.message}</FormErrorMessage>
							) : (
								<Box h={"25px"} w="100%"></Box>
							)}
						</FormControl>
						<Flex gap={"16px"}>
							<Box flexGrow={"1"}>
								<FormControl isInvalid={errors.name != null}>
									<FormLabel fontWeight={"semibold"} fontSize={"small"}>
										Name
									</FormLabel>
									<Input
										rounded={"4px"}
										h={"35px"}
										borderColor={colorPallete.inputBorder}
										{...register("name")}
										_hover={{
											borderColor: colorPallete.inputBorderHover,
										}}
									/>
									{errors.name ? (
										<FormErrorMessage>{errors.name.message}</FormErrorMessage>
									) : (
										<Box h={"25px"} w="100%"></Box>
									)}
								</FormControl>
							</Box>
							<Box flexGrow={"1"}>
								<FormControl isInvalid={errors.surname != null}>
									<FormLabel fontWeight={"semibold"} fontSize={"small"}>
										Surname
									</FormLabel>
									<Input
										rounded={"4px"}
										h={"35px"}
										borderColor={colorPallete.inputBorder}
										{...register("surname")}
										_hover={{
											borderColor: colorPallete.inputBorderHover,
										}}
									/>
									{errors.surname ? (
										<FormErrorMessage>
											{errors.surname.message}
										</FormErrorMessage>
									) : (
										<Box h={"25px"} w="100%"></Box>
									)}
								</FormControl>
							</Box>
						</Flex>
						<Flex gap={"16px"}>
							<Box w="160px">
								<FormControl isInvalid={errors.phone != null}>
									<FormLabel fontWeight={"semibold"} fontSize={"small"}>
										Phone
									</FormLabel>
									<Input
										rounded={"4px"}
										h={"35px"}
										borderColor={colorPallete.inputBorder}
										{...register("phone")}
										_hover={{
											borderColor: colorPallete.inputBorderHover,
										}}
									/>
									{errors.phone ? (
										<FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
									) : (
										<Box h={"25px"} w="100%"></Box>
									)}
								</FormControl>
							</Box>
							<Box flexGrow={"1"}>
								<FormControl isInvalid={errors.address?.street != null}>
									<FormLabel fontWeight={"semibold"} fontSize={"small"}>
										Street
									</FormLabel>
									<Input
										rounded={"4px"}
										h={"35px"}
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
							<Box w="70px">
								<FormControl isInvalid={errors.address?.streetNumber != null}>
									<FormLabel
										fontWeight={"semibold"}
										fontSize={"small"}
										whiteSpace={"nowrap"}
									>
										Street Number
									</FormLabel>
									<Input
										rounded={"4px"}
										h={"35px"}
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
							<Box flexGrow={"1"}>
								<FormControl isInvalid={errors.address?.city != null}>
									<FormLabel fontWeight={"semibold"} fontSize={"small"}>
										City
									</FormLabel>
									<Input
										rounded={"4px"}
										h={"35px"}
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
							<Box flexGrow={"1"}>
								<FormControl isInvalid={errors.address?.zipCode != null}>
									<FormLabel fontWeight={"semibold"} fontSize={"small"}>
										Zip code
									</FormLabel>
									<Input
										rounded={"4px"}
										h={"35px"}
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
							</Box>
							<Box flexGrow={"1"}>
								<FormControl isInvalid={errors.address?.country != null}>
									<FormLabel fontWeight={"semibold"} fontSize={"small"}>
										Country
									</FormLabel>
									<Input
										type="country"
										rounded={"4px"}
										h={"35px"}
										borderColor={colorPallete.inputBorder}
										{...register("address.country")}
										_hover={{
											borderColor: colorPallete.inputBorderHover,
										}}
									/>
									{errors.address?.country ? (
										<FormErrorMessage>
											Country is a required field
										</FormErrorMessage>
									) : (
										<Box h={"25px"} w="100%"></Box>
									)}
								</FormControl>
							</Box>
						</Flex>
						<Center h={"45px"} mt={"16px"} w={"auto"}>
							<Button
								w={"50%"}
								h={"45px"}
								rounded={"4px"}
								overflow={"hidden"}
								bg={colorPallete.button}
								_hover={{
									bg: colorPallete.buttonHover,
									w: "calc(1.03 * 50%)",
									h: "46.5px",
									transition: "0.2s",
								}}
								onClick={handleSubmit(handleRegister)}
								fontSize={"xl"}
								position={"absolute"}
							>
								Register admin
							</Button>
						</Center>
					</Flex>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
