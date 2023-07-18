/* eslint-disable react-hooks/exhaustive-deps */
import {
	Text,
	Center,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
	Box,
} from "@chakra-ui/react";
import { colorPallete } from "../../styles/color";
import { useApplicationStore } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import {
	LOGIN_DEFAULT_VALUES,
	LOGIN_VALIDATION_SCHEMA,
} from "../../utils/constants/auth.constants";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export type LoginFormValues = {
	email: string;
	password: string;
};

export const LoginForm = () => {
	const showRegister = useApplicationStore((state) => state.showRegister);
	const login = useApplicationStore((state) => state.login);
	const token = useApplicationStore((state) => state.token);
	const navigate = useNavigate();
	function handleSwitchOnRegister() {
		showRegister();
	}
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormValues>({
		defaultValues: LOGIN_DEFAULT_VALUES,
		resolver: yupResolver(LOGIN_VALIDATION_SCHEMA),
	});
	async function handleLogin(values: LoginFormValues) {
		await login(values);
	}
	useEffect(() => {
		if (token != null) {
			navigate("/");
		}
	}, [token]);
	return (
		<Flex
			bg={"rgba(255,255,255,1)"}
			color={colorPallete.text}
			w={"100%"}
			mt="auto"
			backdropFilter="auto"
			backdropBlur="3px"
			flexDirection={"column"}
			h={"calc(0.8* (100vh - 17.5px))"}
		>
			<Flex
				h={"100%"}
				mx="32px"
				flexDirection={"column"}
				alignContent={"center"}
				justifyContent={"center"}
			>
				<Text
					fontWeight={"semibold"}
					textAlign={"center"}
					fontSize={"5xl"}
				>
					Login
				</Text>
				<FormControl isInvalid={errors.email != null}>
					<FormLabel fontWeight={"semibold"}>Email address</FormLabel>
					<Input
						type="text"
						rounded={"4px"}
						h={"45px"}
						borderColor={colorPallete.inputBorder}
						{...register("email")}
						_hover={{ borderColor: colorPallete.inputBorderHover }}
					/>
					{errors.email ? (
						<FormErrorMessage ml={"8px"}>
							{errors.email.message}
						</FormErrorMessage>
					) : (
						<Box h={"25px"} w="100%" ml={"8px"}></Box>
					)}
				</FormControl>
				<FormControl isInvalid={errors.password != null}>
					<FormLabel mt={"8px"} fontWeight={"semibold"}>
						Password
					</FormLabel>
					<Input
						type="password"
						rounded={"4px"}
						h={"45px"}
						{...register("password")}
						borderColor={colorPallete.inputBorder}
						_hover={{ borderColor: colorPallete.inputBorderHover }}
					/>
					{errors.password ? (
						<FormErrorMessage ml={"8px"}>
							{errors.password.message}
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
						onClick={handleSubmit(handleLogin)}
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
						Login
					</Button>
				</Center>
				<Flex
					h={"45px"}
					mt={"12px"}
					w={"auto"}
					justifyContent={"end"}
					alignContent={"center"}
				>
					<Text h={"45px"} fontSize={"xl"} mr={"8px"}>
						Dont have the account?
					</Text>
					<Text
						h={"50px"}
						onClick={() => handleSwitchOnRegister()}
						fontSize={"xl"}
						cursor={"pointer"}
						mr={"8px"}
						color={colorPallete.link}
					>
						Register
					</Text>
				</Flex>
			</Flex>
		</Flex>
	);
};
