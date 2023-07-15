import {
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
					<TableContainer
						flex={1}
						mx={"auto"}
						mb={"32px"}
						px={"32px"}
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
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
