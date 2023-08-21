/* eslint-disable react-hooks/exhaustive-deps */
import {
	Flex,
	Img,
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
import { colorPallete } from "../../styles/color";
import { Order, Product } from "../../model/sales.model";
import keyboardImg from "../../images/keyboard.png";

interface OrderProductsModalProps {
	isOpen: boolean;
	onClose: () => void;
	order: Order | undefined;
}

export const OrderProductsModal = ({ isOpen, onClose, order }: OrderProductsModalProps) => {
	return (
		<Modal
			isOpen={isOpen}
			onClose={() => {
				onClose();
			}}
		>
			<ModalOverlay />
			<ModalContent margin={"auto"} maxW="960px">
				<ModalHeader textAlign={"center"} mt={4}>
					Products for order : <br />
					{order?.id}
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Flex position={"relative"} w={"100%"} h={"650px"}>
						<Flex flexDir={"column"} w={"100%"} h={"650px"} position={"absolute"}>
							<TableContainer
								flex={1}
								rounded={"4px"}
								mx={"auto"}
								mb={"8px"}
								w={"calc(100% - 30px)"}
								h={"650px"}
								overflowY={"auto"}
							>
								<Table fontSize={"small"}>
									<Tbody>
										{order?.products.map((product: Product, index) => (
											<Tr
												key={index}
												transition={"0.1s ease"}
												bgColor={
													index % 2 === 0
														? colorPallete.inputBorderHover
														: colorPallete.oddTableColor
												}
												saturate={"0"}
											>
												<Td w={"10%"}>
													<Flex justifyContent={"space-between"} h={"119.5px"}>
														<Flex fontSize={"large"} alignItems={"center"}>
															<Flex flexDir={"column"} gap={"8px"}>
																<Flex gap={"4px"}>
																	<Text fontWeight={"700"}>Name :</Text>
																	<Text>{product.part.name}</Text>
																</Flex>
																<Flex gap={"4px"}>
																	<Text fontWeight={"700"}>Id :</Text>
																	<Text>{product.id}</Text>
																</Flex>
																<Flex gap={"4px"}>
																	<Text fontWeight={"700"}>Price :</Text>
																	<Text>{product.part.price} $</Text>
																</Flex>
															</Flex>
														</Flex>
														<Img
															src={
																product.part.imageUrl === ""
																	? keyboardImg
																	: product.part.imageUrl.toString()
															}
															w={"160px"}
															h={"119.5px"}
														/>
													</Flex>
												</Td>
											</Tr>
										))}
									</Tbody>
								</Table>
							</TableContainer>
							<Flex justifyContent={"end"} pr={"15px"} pb={"32px"} position={"relative"}></Flex>
						</Flex>
					</Flex>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
