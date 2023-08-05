import {
	Button,
	Flex,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
} from "@chakra-ui/react";
import { PartType } from "../../../utils/enum";
import { colorPallete } from "../../../styles/color";

interface ChoosePartModalProps {
	isOpen: boolean;
	onClose: () => void;
	setPartType: React.Dispatch<React.SetStateAction<PartType | undefined>>;
}

export const ChoosePartModal = ({ isOpen, onClose, setPartType }: ChoosePartModalProps) => {
	return (
		<Modal
			isOpen={isOpen}
			onClose={() => {
				onClose();
			}}
		>
			<ModalOverlay />
			<ModalContent margin={"auto"} maxW="450px">
				<ModalHeader textAlign={"center"} mt={4}>
					Choose what you want to add
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Flex gap={"12px"} flexDir={"column"} pb={"32px"} alignItems={"center"}>
						<Flex gap={"12px"}>
							<Button
								w={"100px"}
								rounded={"4px"}
								overflow={"hidden"}
								bg={colorPallete.button}
								onClick={() => {
									setPartType(PartType.CABLE);
								}}
								_hover={{
									bg: colorPallete.buttonHover,
									transform: "scale(1.05,1.05)",
									transition: "0.2s",
								}}
								fontSize={"md"}
							>
								Cable
							</Button>
							<Button
								w={"100px"}
								rounded={"4px"}
								overflow={"hidden"}
								bg={colorPallete.button}
								onClick={() => {
									setPartType(PartType.CASE);
								}}
								_hover={{
									bg: colorPallete.buttonHover,
									transform: "scale(1.05,1.05)",
									transition: "0.2s",
								}}
								fontSize={"md"}
							>
								Case
							</Button>
							<Button
								w={"100px"}
								rounded={"4px"}
								overflow={"hidden"}
								bg={colorPallete.button}
								onClick={() => {
									setPartType(PartType.KEYCAP);
								}}
								_hover={{
									bg: colorPallete.buttonHover,
									transform: "scale(1.05,1.05)",
									transition: "0.2s",
								}}
								fontSize={"md"}
							>
								Keycap
							</Button>
						</Flex>
						<Flex gap={"12px"}>
							<Button
								w={"100px"}
								rounded={"4px"}
								overflow={"hidden"}
								bg={colorPallete.button}
								onClick={() => {
									setPartType(PartType.KEYCAP_SET);
								}}
								_hover={{
									bg: colorPallete.buttonHover,
									transform: "scale(1.05,1.05)",
									transition: "0.2s",
								}}
								fontSize={"md"}
							>
								Keycap set
							</Button>
							<Button
								w={"100px"}
								rounded={"4px"}
								overflow={"hidden"}
								bg={colorPallete.button}
								onClick={() => {
									setPartType(PartType.SWITCH_SET);
								}}
								_hover={{
									bg: colorPallete.buttonHover,
									transform: "scale(1.05,1.05)",
									transition: "0.2s",
								}}
								fontSize={"md"}
							>
								Switch set
							</Button>
							<Button
								w={"100px"}
								rounded={"4px"}
								overflow={"hidden"}
								bg={colorPallete.button}
								onClick={() => {
									setPartType(PartType.PLATE);
								}}
								_hover={{
									bg: colorPallete.buttonHover,
									transform: "scale(1.05,1.05)",
									transition: "0.2s",
								}}
								fontSize={"md"}
							>
								Plate
							</Button>
						</Flex>
						<Flex gap={"12px"}>
							<Button
								w={"100px"}
								rounded={"4px"}
								overflow={"hidden"}
								bg={colorPallete.button}
								onClick={() => {
									setPartType(PartType.PCB);
								}}
								_hover={{
									bg: colorPallete.buttonHover,
									transform: "scale(1.05,1.05)",
									transition: "0.2s",
								}}
								fontSize={"md"}
							>
								PCB
							</Button>
							<Button
								w={"100px"}
								rounded={"4px"}
								overflow={"hidden"}
								bg={colorPallete.button}
								onClick={() => {
									setPartType(PartType.STABILIZER);
								}}
								_hover={{
									bg: colorPallete.buttonHover,
									transform: "scale(1.05,1.05)",
									transition: "0.2s",
								}}
								fontSize={"md"}
							>
								Stabilizers
							</Button>
						</Flex>
					</Flex>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
