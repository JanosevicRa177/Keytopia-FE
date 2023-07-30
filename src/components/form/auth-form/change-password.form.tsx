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
	CHANGE_PASSWORD_DEFAULT_VALUES,
	CHANGE_PASSWORD_VALIDATION_SCHEMA,
} from "../../../utils/constants/auth.constants";
import { useChangePassword } from "../../../hooks/auth-hooks/change-password.hook";
import { ApiResponse } from "../../../store/auth-store/types/response.type";

export type ChangePasswordFormValues = {
	oldPassword: string;
	newPassword: string;
	confirmPassword: string;
};

interface ChangePasswordFormProps {
	isOpen: boolean;
	onClose: () => void;
}

export const ChangePasswordForm = ({ isOpen, onClose }: ChangePasswordFormProps) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<ChangePasswordFormValues>({
		defaultValues: CHANGE_PASSWORD_DEFAULT_VALUES,
		resolver: yupResolver(CHANGE_PASSWORD_VALIDATION_SCHEMA),
	});
	const { changePassword } = useChangePassword();
	async function handleChangePassword(values: ChangePasswordFormValues) {
		changePassword(values).then((resp: ApiResponse<null>) => {
			if (resp.status === "SUCCESS") {
				reset();
				onClose();
			}
		});
	}
	return (
		<Modal
			isOpen={isOpen}
			onClose={() => {
				onClose();
			}}
		>
			<ModalOverlay />
			<ModalContent margin={"auto"} maxW="460px">
				<ModalHeader textAlign={"center"} mt={4}>
					Change password
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
						<FormControl isInvalid={errors.oldPassword != null}>
							<FormLabel mt={"8px"} fontWeight={"semibold"}>
								Old password
							</FormLabel>
							<Input
								type="password"
								rounded={"4px"}
								h={"45px"}
								{...register("oldPassword")}
								borderColor={colorPallete.inputBorder}
								_hover={{
									borderColor: colorPallete.inputBorderHover,
								}}
							/>
							{errors.oldPassword ? (
								<FormErrorMessage ml={"8px"}>
									{errors.oldPassword.message}
								</FormErrorMessage>
							) : (
								<Box h={"25px"} w="100%" ml={"8px"}></Box>
							)}
						</FormControl>
						<FormControl isInvalid={errors.newPassword != null}>
							<FormLabel mt={"8px"} fontWeight={"semibold"}>
								New password
							</FormLabel>
							<Input
								type="password"
								rounded={"4px"}
								h={"45px"}
								{...register("newPassword")}
								borderColor={colorPallete.inputBorder}
								_hover={{
									borderColor: colorPallete.inputBorderHover,
								}}
							/>
							{errors.newPassword ? (
								<FormErrorMessage ml={"8px"}>
									{errors.newPassword.message}
								</FormErrorMessage>
							) : (
								<Box h={"25px"} w="100%" ml={"8px"}></Box>
							)}
						</FormControl>
						<FormControl isInvalid={errors.confirmPassword != null}>
							<FormLabel mt={"8px"} fontWeight={"semibold"}>
								Confirm password
							</FormLabel>
							<Input
								type="password"
								rounded={"4px"}
								h={"45px"}
								{...register("confirmPassword")}
								borderColor={colorPallete.inputBorder}
								_hover={{
									borderColor: colorPallete.inputBorderHover,
								}}
							/>
							{errors.confirmPassword ? (
								<FormErrorMessage ml={"8px"}>
									{errors.confirmPassword.message}
								</FormErrorMessage>
							) : (
								<Box h={"25px"} w="100%" ml={"8px"}></Box>
							)}
						</FormControl>
						<Center h={"45px"} mt={"16px"} w={"auto"}>
							<Button
								w={"348px"}
								h={"45px"}
								rounded={"4px"}
								onClick={handleSubmit(handleChangePassword)}
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
								Change password
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
