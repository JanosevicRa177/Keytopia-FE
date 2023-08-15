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
import { useMakeKeyboard } from "../../../hooks/keyboard-hooks/keyboard.make.hook";
import { useState } from "react";
import { toast } from "react-toastify";

interface MakeKeyboardFormProps {
	isOpen: boolean;
	onClose: () => void;
	keyboardName: string;
	getKeyboard: () => void;
}

export const MakeKeyboardForm = ({
	isOpen,
	onClose,
	keyboardName,
	getKeyboard,
}: MakeKeyboardFormProps) => {
	const { makeKeyboard } = useMakeKeyboard();
	const [quantity, setQuantity] = useState<number>();
	const [isValid, setIsValid] = useState<boolean>();
	async function handleCreateSize() {
		if (quantity === undefined || quantity <= 0) {
			toast.error("choose valid number for quantity!");
			return;
		}
		makeKeyboard(keyboardName, quantity).then((response: ApiResponse<null>) => {
			if (response.status === "SUCCESS") {
				getKeyboard();
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
			<ModalContent margin={"auto"}>
				<ModalHeader textAlign={"center"} mt={4}>
					Make keyboard our of parts: {keyboardName}
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
							<FormLabel fontWeight={"semibold"}>Quantity</FormLabel>
							<Input
								type="number"
								rounded={"4px"}
								h={"45px"}
								borderColor={colorPallete.inputBorder}
								onChange={(e) => {
									setQuantity(parseInt(e.target.value));
									setIsValid(parseInt(e.target.value) > 0);
								}}
								_hover={{
									borderColor: colorPallete.inputBorderHover,
								}}
								min={1}
							/>
							{isValid !== undefined && isValid === false ? (
								<FormErrorMessage ml={"8px"}>
									Quantity is required and should be a positive number
								</FormErrorMessage>
							) : (
								<Box h={"26px"} w="100%" ml={"8px"}></Box>
							)}
						</FormControl>
						<Center h={"45px"} mt={"16px"} w={"auto"}>
							<Button
								w={"calc(100% - 64px)"}
								h={"45px"}
								rounded={"4px"}
								onClick={() => handleCreateSize()}
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
								isDisabled={!isValid}
							>
								Make keyboard
							</Button>
						</Center>
					</Flex>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
