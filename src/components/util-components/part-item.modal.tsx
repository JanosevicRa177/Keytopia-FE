/* eslint-disable react-hooks/exhaustive-deps */
import {
	Flex,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Table,
	TableContainer,
	Tbody,
	Td,
	Tr,
	Text,
} from "@chakra-ui/react";
import { PartItem } from "../../store/part-store/types/part.type";

interface PartItemModalProps {
	isOpen: boolean;
	onClose: () => void;
	partsItems: PartItem[];
}

export const PartItemModal = ({ isOpen, onClose, partsItems }: PartItemModalProps) => {
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
					Parts
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Flex position={"relative"} w={"100%"} h={"450px"}>
						<Flex
							flexDir={"column"}
							cursor={"pointer"}
							w={"100%"}
							h={"450px"}
							position={"absolute"}
						>
							<TableContainer
								flex={1}
								rounded={"4px"}
								mx={"auto"}
								mb={"8px"}
								w={"calc(100% - 30px)"}
								h={"400px"}
								overflowY={"auto"}
							>
								<Table fontSize={"small"} variant="striped" colorScheme={"purple"}>
									<Tbody>
										{partsItems.map((part: PartItem, index) => (
											<Tr key={index} transition={"0.1s ease"} saturate={"0"}>
												<Td w={"10%"}>
													<Flex justifyContent={"space-between"}>
														<Text>{part.name}</Text>
														<Text>{part.quantity}</Text>
													</Flex>
												</Td>
											</Tr>
										))}
									</Tbody>
								</Table>
							</TableContainer>
						</Flex>
					</Flex>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
