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
import { ApiResponse } from "../../../store/auth-store/types/response.type";
import { colorPallete } from "../../../styles/color";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useCommercializeKeyboard } from "../../../hooks/keyboard-hooks/keybopard.commercialize.hook";
import { useNavigate } from "react-router-dom";

interface CommercializeKeyboardFormProps {
	isOpen: boolean;
	onClose: () => void;
	keyboardName: string;
	getKeyboard: () => void;
}

export const CommercializeKeyboardForm = ({
	isOpen,
	onClose,
	keyboardName,
	getKeyboard,
}: CommercializeKeyboardFormProps) => {
	const { commercializeKeyboard } = useCommercializeKeyboard();
	const navigate = useNavigate();
	const [newName, setNewName] = useState<string>();
	const [isValid, setIsValid] = useState<boolean>();
	const [image, setImage] = useState<File>();
	async function handleCommercializeKeyboard() {
		if (image === undefined) {
			toast.error("Choose image for keyboard!");
			return;
		}
		if (newName === undefined || newName === "") {
			toast.error("You must enter new name!");
			return;
		}
		commercializeKeyboard(keyboardName, newName, image).then((response: ApiResponse<null>) => {
			if (response.status === "SUCCESS") {
				onClose();
				navigate(`/keyboard/${newName}`);
			}
		});
	}
	useEffect(() => {
		setIsValid(newName !== undefined && newName !== "" && image !== undefined);
	}, [image, newName]);
	return (
		<Modal
			isOpen={isOpen}
			onClose={() => {
				onClose();
			}}
		>
			<ModalOverlay />
			<ModalContent margin={"auto"}>
				<ModalHeader textAlign={"center"} mt={4}>
					Commercialize keyboard:
					<br /> {keyboardName}
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
						<FormControl isInvalid={isValid !== undefined && isValid === false}>
							<FormLabel fontWeight={"semibold"}>New name</FormLabel>
							<Input
								rounded={"4px"}
								h={"45px"}
								borderColor={colorPallete.inputBorder}
								onChange={(e) => {
									setNewName(e.target.value);
								}}
								_hover={{
									borderColor: colorPallete.inputBorderHover,
								}}
								min={1}
							/>
							{isValid !== undefined && isValid === false ? (
								<FormErrorMessage ml={"8px"}>You must enter name!</FormErrorMessage>
							) : (
								<Box h={"26px"} w="100%" ml={"8px"}></Box>
							)}
						</FormControl>
						<Flex flexDirection={"column"}>
							<FormLabel fontWeight={"semibold"}>Image</FormLabel>
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
						<Center h={"45px"} mt={"16px"} w={"auto"}>
							<Button
								w={"calc(100% - 64px)"}
								h={"45px"}
								rounded={"4px"}
								onClick={() => handleCommercializeKeyboard()}
								overflow={"hidden"}
								bg={!isValid ? colorPallete.disabledButton : colorPallete.button}
								color={!isValid ? "white" : "#343434"}
								_hover={{
									bg: !isValid
										? colorPallete.disabledButton
										: colorPallete.buttonHover,
									transform: "scale(1.05,1.05)",
									transition: "0.2s",
								}}
								fontSize={"xl"}
								position={"absolute"}
								isDisabled={!isValid}
							>
								Commercialize
							</Button>
						</Center>
					</Flex>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
