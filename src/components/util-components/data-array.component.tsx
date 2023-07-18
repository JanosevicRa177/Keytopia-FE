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
	Thead,
	Tr,
} from "@chakra-ui/react";

interface DataArrayModalProps {
	isOpen: boolean;
	onClose: () => void;
	data: string[];
	header: string;
}

export const DataArrayModal = ({
	isOpen,
	onClose,
	data,
	header,
}: DataArrayModalProps) => {
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
					{header}
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Flex position={"relative"} w={"100%"} h={"350px"}>
						<Flex
							flexDir={"column"}
							cursor={"pointer"}
							w={"100%"}
							h={"350px"}
							position={"absolute"}
						>
							<TableContainer
								flex={1}
								mx={"auto"}
								mb={"32px"}
								w={"calc(100% - 30px)"}
								h={"350px"}
								overflowY={"auto"}
							>
								<Table
									variant="striped"
									colorScheme={"purple"}
									fontSize={"small"}
								>
									<Thead>
										<Tr></Tr>
									</Thead>
									<Tbody>
										{data.map((item: string) => (
											<Tr key={item}>
												<Td w={"10%"}>{item}</Td>
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
