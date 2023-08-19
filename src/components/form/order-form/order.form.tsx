/* eslint-disable react-hooks/exhaustive-deps */
import {
	Flex,
	Center,
	Button,
	ModalBody,
	ModalContent,
	Modal,
	ModalHeader,
	ModalOverlay,
	Text,
	ModalCloseButton,
	Box,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Select,
} from "@chakra-ui/react";
import { colorPallete } from "../../../styles/color";
import { useApplicationStore } from "../../../store/store";
import { useEffect, useState } from "react";
import { useFetchDeliveryServices } from "../../../hooks/sales-hooks/get-all/delivery-service.get-all.hook";
import { ApiResponse } from "../../../store/auth-store/types/response.type";
import { toast } from "react-toastify";

interface MakeKeyboardFormProps {
	isOpen: boolean;
	onClose: () => void;
}

export const OrderForm = ({ isOpen, onClose }: MakeKeyboardFormProps) => {
	const makeOrder = useApplicationStore((state) => state.makeOrder);
	const user = useApplicationStore((state) => state.user);
	const completePrice = useApplicationStore((state) => state.completePrice);
	const { getDeliveryServices } = useFetchDeliveryServices();
	const [deliveryServices, setDeliveryServices] = useState<string[]>([]);
	const [choosenDeliveryService, setChoosenDeliveryService] = useState<string | null>(null);
	async function handleMakeOrder() {
		if (choosenDeliveryService == null) {
			toast.error("You must choose delivery service!");
			return;
		}
		makeOrder(choosenDeliveryService).then((isOk: boolean) => {
			if (isOk) {
				onClose();
			}
		});
	}
	useEffect(() => {
		getDeliveryServices().then((res: ApiResponse<string[] | null>) => {
			if (res.data == null) {
				toast.error("Something wrong with fetching sizes!");
				return;
			}
			setDeliveryServices(res.data);
			setChoosenDeliveryService(res.data[0]);
		});
	}, []);
	return (
		<Modal
			isOpen={isOpen}
			onClose={() => {
				onClose();
			}}
		>
			<ModalOverlay />
			<ModalContent margin={"auto"} maxW="560px">
				<ModalHeader textAlign={"center"} mt={4}>
					Final step
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
						<Flex fontWeight={"700"} gap={"4px"}>
							<Text w={"150px"} textAlign={"end"}>
								Name and surname :
							</Text>
							<Text fontWeight={"300"}>
								{user?.name} {user?.surname}
							</Text>
						</Flex>
						<Flex fontWeight={"700"} gap={"4px"}>
							<Text w={"150px"} textAlign={"end"}>
								Phone :
							</Text>
							<Text fontWeight={"300"}>{user?.phone}</Text>
						</Flex>
						<Flex fontWeight={"700"} gap={"4px"}>
							<Text w={"150px"} textAlign={"end"}>
								Address :
							</Text>
							<Text fontWeight={"300"}>
								{user?.address.street} {user?.address.streetNumber},{" "}
								{user?.address.zipCode} {user?.address.city},{" "}
								{user?.address.country}
							</Text>
						</Flex>
						<Flex fontWeight={"700"} gap={"4px"}>
							<Text w={"150px"} textAlign={"end"}>
								Price :
							</Text>
							<Text fontWeight={"300"}>{completePrice} $</Text>
						</Flex>
						<FormControl isInvalid={choosenDeliveryService == null} mt={"4px"}>
							<FormLabel fontWeight={"semibold"}>Delivery service</FormLabel>
							<Select
								rounded={"4px"}
								h={"45px"}
								borderColor={colorPallete.inputBorder}
								_hover={{
									borderColor: colorPallete.inputBorderHover,
								}}
								defaultValue={deliveryServices[0]}
								onChange={(e) => {
									setChoosenDeliveryService(e.target.value);
									console.log(e.target.value);
								}}
							>
								{deliveryServices.map((deliveryService, index) => (
									<option value={deliveryService} key={index}>
										{deliveryService}
									</option>
								))}
							</Select>
							{choosenDeliveryService == null ? (
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
								onClick={() => handleMakeOrder()}
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
								Order!
							</Button>
						</Center>
					</Flex>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
