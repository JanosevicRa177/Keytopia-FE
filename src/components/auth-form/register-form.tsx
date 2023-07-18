import {
	Flex,
	Text,
	Center,
	Button,
	FormControl,
	FormLabel,
	Input,
	Box,
	FormErrorMessage,
} from "@chakra-ui/react";
import { colorPallete } from "../../styles/color";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
	REGISTER_DEFAULT_VALUES,
	REGISTER_VALIDATION_SCHEMA,
} from "../../utils/constants/auth.constants";
import { useRegisterUser } from "../../hooks/auth-hooks/register.hook";
import { ApiResponse } from "../../store/auth-store/types/response.type";
import { useRef } from "react";
import { useApplicationStore } from "../../store/store";

export type RegisterFormValues = {
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
	password: string;
	confirmPassword: string;
};

export const RegisterForm = () => {
	const ref = useRef<null | HTMLDivElement>(null);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormValues>({
		defaultValues: REGISTER_DEFAULT_VALUES,
		resolver: yupResolver(REGISTER_VALIDATION_SCHEMA),
	});
	const { registerUser } = useRegisterUser();
	const showLogin = useApplicationStore((state) => state.showLogin);

	async function handleSwitchOnLogin() {
		showLogin();
		ref.current?.scrollIntoView();
	}

	async function handleRegister(values: RegisterFormValues) {
		await registerUser(values).then((res: ApiResponse<null>) => {
			if (res.status === "SUCCESS") {
				showLogin();
				ref.current?.scrollIntoView();
			}
		});
	}
	return (
		<Flex
			color={colorPallete.text}
			mt="auto"
			backdropFilter="auto"
			backdropBlur="3px"
			flexDirection={"column"}
			ref={ref}
			h={"100%"}
		>
			<Flex mx="32px" flexDirection={"column"} my="auto" py="70px">
				<Text
					fontWeight={"semibold"}
					textAlign={"center"}
					fontSize={"5xl"}
				>
					Register
				</Text>
				<FormControl isInvalid={errors.email != null}>
					<FormLabel fontWeight={"semibold"} fontSize={"small"}>
						Email address
					</FormLabel>
					<Input
						rounded={"4px"}
						h={"35px"}
						borderColor={colorPallete.inputBorder}
						{...register("email")}
						_hover={{ borderColor: colorPallete.inputBorderHover }}
					/>
					{errors.email ? (
						<FormErrorMessage>
							{errors.email.message}
						</FormErrorMessage>
					) : (
						<Box h={"25px"} w="100%"></Box>
					)}
				</FormControl>
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
									borderColor: colorPallete.inputBorderHover,
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
									borderColor: colorPallete.inputBorderHover,
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
						<FormControl isInvalid={errors.address?.street != null}>
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
						<FormControl
							isInvalid={errors.address?.streetNumber != null}
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
				<Flex gap={"16px"} mb={"16px"}>
					<Box flexGrow={"1"}>
						<FormControl isInvalid={errors.password != null}>
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
									borderColor: colorPallete.inputBorderHover,
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
					<Box flexGrow={"1"}>
						<FormControl isInvalid={errors.confirmPassword != null}>
							<FormLabel
								fontWeight={"semibold"}
								fontSize={"small"}
							>
								Confirm password
							</FormLabel>
							<Input
								type="password"
								rounded={"4px"}
								h={"35px"}
								borderColor={colorPallete.inputBorder}
								{...register("confirmPassword")}
								_hover={{
									borderColor: colorPallete.inputBorderHover,
								}}
							/>
							{errors.confirmPassword ? (
								<FormErrorMessage>
									{errors.confirmPassword?.message}
								</FormErrorMessage>
							) : (
								<Box h={"25px"} w="100%"></Box>
							)}
						</FormControl>
					</Box>
				</Flex>
				<Center h={"50px"} w={"auto"}>
					<Button
						w={"calc(100% - 64px)"}
						h={"45px"}
						rounded={"4px"}
						onClick={handleSubmit(handleRegister)}
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
						Register
					</Button>
				</Center>
				<Flex
					h={"45px"}
					mt={"32px"}
					w={"auto"}
					justifyContent={"end"}
					alignContent={"center"}
				>
					<Text h={"45px"} fontSize={"large"} mr={"8px"}>
						Already have an account?
					</Text>
					<Text
						h={"45px"}
						onClick={() => handleSwitchOnLogin()}
						fontSize={"large"}
						cursor={"pointer"}
						mr={"8px"}
						color={colorPallete.link}
					>
						Login
					</Text>
				</Flex>
			</Flex>
		</Flex>
	);
};
