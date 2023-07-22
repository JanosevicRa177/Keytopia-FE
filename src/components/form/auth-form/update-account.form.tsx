/* eslint-disable react-hooks/exhaustive-deps */
import {
	Center,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
	Box,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";
import { colorPallete } from "../../../styles/color";
import {
	UPDATE_ACCOUNT_DEFAULT_VALUES,
	UPDATE_ACCOUNT_VALIDATION_SCHEMA,
} from "../../../utils/constants/auth.constants";
import { ApiResponse } from "../../../store/auth-store/types/response.type";
import { useUpdateAccount } from "../../../hooks/auth-hooks/update-account.hook";
import { useApplicationStore } from "../../../store/store";
import { useEffect, useState } from "react";

export type UpdateAccountFormValues = {
	name: string;
	surname: string;
	phone: string;
	address: {
		street: string;
		streetNumber: string;
		city: string;
		zipCode: string;
		country: string;
	};
	password: string;
};

interface UpdateAccountFormProps {
	isOpen: boolean;
	onClose: () => void;
}

export const UpdateAccountForm = ({
	isOpen,
	onClose,
}: UpdateAccountFormProps) => {
	const {
		register,
		reset,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<UpdateAccountFormValues>({
		defaultValues: UPDATE_ACCOUNT_DEFAULT_VALUES,
		resolver: yupResolver(UPDATE_ACCOUNT_VALIDATION_SCHEMA),
	});
	const { updateAccount } = useUpdateAccount();
	const user = useApplicationStore((state) => state.user);
	const fetchUser = useApplicationStore((state) => state.fetchLoggedUser);
	const token = useApplicationStore((state) => state.token);
	const [init, setInit] = useState<boolean>(true);
	async function handleUpdateAccount(values: UpdateAccountFormValues) {
		updateAccount(values).then((resp: ApiResponse<null>) => {
			if (resp.status === "SUCCESS") {
				fetchUser(token as string).then(() => {
					reset();
					onClose();
					setInit(true);
				});
			}
		});
	}
	useEffect(() => {
		if (init && user != null) {
			setValue("name", user?.name);
			setValue("surname", user?.surname);
			setValue("phone", user?.phone);
			setValue("address.city", user?.address.city);
			setValue("address.street", user?.address.street);
			setValue("address.streetNumber", user?.address.streetNumber);
			setValue("address.zipCode", user?.address.zipCode);
			setValue("address.country", user?.address.country);
			setInit(false);
		}
	}, [init]);
	return (
		<Modal
			isOpen={isOpen}
			onClose={() => {
				onClose();
				reset();
				setInit(true);
			}}
		>
			<ModalOverlay />
			<ModalContent margin={"auto"} maxW="560px">
				<ModalHeader textAlign={"center"} mt={4}>
					Update account
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Flex
						h={"100%"}
						mx="32px"
						flexDirection={"column"}
						alignContent={"center"}
						justifyContent={"center"}
					>
						<Flex gap={"16px"}>
							<Box flexGrow={"1"}>
								<FormControl isInvalid={errors.name != null}>
									<FormLabel
										fontWeight={"semibold"}
										fontSize={"small"}
									>
										Name
									</FormLabel>
									<Input
										rounded={"4px"}
										h={"35px"}
										borderColor={colorPallete.inputBorder}
										{...register("name")}
										_hover={{
											borderColor:
												colorPallete.inputBorderHover,
										}}
									/>
									{errors.name ? (
										<FormErrorMessage>
											{errors.name.message}
										</FormErrorMessage>
									) : (
										<Box h={"25px"} w="100%"></Box>
									)}
								</FormControl>
							</Box>
							<Box flexGrow={"1"}>
								<FormControl isInvalid={errors.surname != null}>
									<FormLabel
										fontWeight={"semibold"}
										fontSize={"small"}
									>
										Surname
									</FormLabel>
									<Input
										rounded={"4px"}
										h={"35px"}
										borderColor={colorPallete.inputBorder}
										{...register("surname")}
										_hover={{
											borderColor:
												colorPallete.inputBorderHover,
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
									<FormLabel
										fontWeight={"semibold"}
										fontSize={"small"}
									>
										Phone
									</FormLabel>
									<Input
										rounded={"4px"}
										h={"35px"}
										borderColor={colorPallete.inputBorder}
										{...register("phone")}
										_hover={{
											borderColor:
												colorPallete.inputBorderHover,
										}}
									/>
									{errors.phone ? (
										<FormErrorMessage>
											{errors.phone?.message}
										</FormErrorMessage>
									) : (
										<Box h={"25px"} w="100%"></Box>
									)}
								</FormControl>
							</Box>
							<Box flexGrow={"1"}>
								<FormControl
									isInvalid={errors.address?.street != null}
								>
									<FormLabel
										fontWeight={"semibold"}
										fontSize={"small"}
									>
										Street
									</FormLabel>
									<Input
										rounded={"4px"}
										h={"35px"}
										borderColor={colorPallete.inputBorder}
										{...register("address.street")}
										_hover={{
											borderColor:
												colorPallete.inputBorderHover,
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
								<FormControl
									isInvalid={
										errors.address?.streetNumber != null
									}
								>
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
											borderColor:
												colorPallete.inputBorderHover,
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
								<FormControl
									isInvalid={errors.address?.city != null}
								>
									<FormLabel
										fontWeight={"semibold"}
										fontSize={"small"}
									>
										City
									</FormLabel>
									<Input
										rounded={"4px"}
										h={"35px"}
										borderColor={colorPallete.inputBorder}
										{...register("address.city")}
										_hover={{
											borderColor:
												colorPallete.inputBorderHover,
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
								<FormControl
									isInvalid={errors.address?.zipCode != null}
								>
									<FormLabel
										fontWeight={"semibold"}
										fontSize={"small"}
									>
										Zip code
									</FormLabel>
									<Input
										rounded={"4px"}
										h={"35px"}
										borderColor={colorPallete.inputBorder}
										{...register("address.zipCode")}
										_hover={{
											borderColor:
												colorPallete.inputBorderHover,
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
								<FormControl
									isInvalid={errors.address?.country != null}
								>
									<FormLabel
										fontWeight={"semibold"}
										fontSize={"small"}
									>
										Country
									</FormLabel>
									<Input
										type="country"
										rounded={"4px"}
										h={"35px"}
										borderColor={colorPallete.inputBorder}
										{...register("address.country")}
										_hover={{
											borderColor:
												colorPallete.inputBorderHover,
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
						<Flex gap={"16px"} mb={"16px"}>
							<Box flexGrow={"1"}>
								<FormControl
									isInvalid={errors.password != null}
								>
									<FormLabel
										fontWeight={"semibold"}
										fontSize={"small"}
									>
										Password
									</FormLabel>
									<Input
										type="password"
										rounded={"4px"}
										h={"35px"}
										borderColor={colorPallete.inputBorder}
										{...register("password")}
										_hover={{
											borderColor:
												colorPallete.inputBorderHover,
										}}
									/>
									{errors.password ? (
										<FormErrorMessage>
											{errors.password?.message}
										</FormErrorMessage>
									) : (
										<Box h={"25px"} w="100%"></Box>
									)}
								</FormControl>
							</Box>
						</Flex>
						<Center h={"45px"} mt={"16px"} w={"auto"}>
							<Button
								w={"348px"}
								h={"45px"}
								rounded={"4px"}
								onClick={handleSubmit(handleUpdateAccount)}
								overflow={"hidden"}
								bg={colorPallete.button}
								_hover={{
									bg: colorPallete.buttonHover,
									w: "calc(1.03 * 348px)",
									h: "46.5px",
									transition: "0.2s",
								}}
								fontSize={"xl"}
								position={"absolute"}
							>
								Update account
							</Button>
						</Center>
						<Flex
							h={"45px"}
							mt={"12px"}
							w={"auto"}
							justifyContent={"end"}
							alignContent={"center"}
						></Flex>
					</Flex>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
