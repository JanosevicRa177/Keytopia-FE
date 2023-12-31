import {
	Flex,
	ModalBody,
	ModalContent,
	Modal,
	ModalOverlay,
	ModalCloseButton,
	Text,
	Img,
	Center,
} from "@chakra-ui/react";
import checkmark from "../../images/checkmark.png";
import { PartWithData } from "../../model/part.model";

interface PartSingleViewProps {
	isOpen: boolean;
	onClose: () => void;
	part: PartWithData;
}

export const PartModalView = ({ isOpen, onClose, part }: PartSingleViewProps) => {
	return (
		<Modal
			isOpen={isOpen}
			onClose={() => {
				onClose();
			}}
		>
			<ModalOverlay />
			<ModalContent margin={"auto"} maxH="740px" maxW="960px">
				<ModalCloseButton />
				<ModalBody>
					<Flex gap={"32px"} my={"32px"}>
						<Flex
							flexDirection={"column"}
							gap={"16px"}
							boxShadow={"4px 4px 12px 0px rgba(0,0,0,0.3)"}
							rounded={"8px"}
							py={"16px"}
						>
							<Flex rounded={"8px"} overflow={"hidden"} mx={"16px"}>
								<Img src={part.imageUrl} h={"400px"} w={"400px"} />
							</Flex>
							<Text
								textAlign={"center"}
								fontWeight={"bold"}
								fontSize={"2xl"}
								w={"400px"}
								overflowWrap={"break-word"}
								px={"16px"}
							>
								{part.name}
							</Text>
						</Flex>
						<Flex
							flexDirection={"column"}
							flexGrow={"1"}
							gap={"8px"}
							fontSize={"xl"}
							boxShadow={"4px 4px 12px 0px rgba(0,0,0,0.3)"}
							rounded={"8px"}
							justify={"center"}
						>
							{part.variables.map((variable, index) => (
								<Flex w={"100%"} gap={"4px"} px={"16px"} key={index}>
									<Text fontWeight={"bold"} w={"40%"} textAlign={"end"}>
										{variable.variable}:
									</Text>
									{variable.value === "true" || variable.value === "false" ? (
										variable.value === "true" ? (
											<Center>
												<Img src={checkmark} w={"20px"} h={"20px"} />
											</Center>
										) : (
											<></>
										)
									) : (
										<Text w={"60%"}>{variable.value}</Text>
									)}
								</Flex>
							))}
						</Flex>
					</Flex>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
