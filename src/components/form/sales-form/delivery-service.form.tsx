/* eslint-disable react-hooks/exhaustive-deps */
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
import { yupResolver } from "@hookform/resolvers/yup";
import { ApiResponse } from "../../../store/auth-store/types/response.type";
import { colorPallete } from "../../../styles/color";
import { useForm } from "react-hook-form";
import {
	DELIVERY_SERVICE_DEFAULT_VALUES,
	DELIVERY_SERVICE_VALIDATION_SCHEMA,
} from "../../../utils/constants/sales.constants";
import { DeliveryService } from "../../../model/sales.model";
import { useCreateDeliveryService } from "../../../hooks/sales-hooks/create/delivery-service.create.hook";
import { useEffect, useState } from "react";
import { useUpdateDeliveryService } from "../../../hooks/sales-hooks/update/delivery-service.update.hook";

interface SizeFormProps {
	isOpen: boolean;
	onClose: () => void;
	fetchDeliveryServices: (pageNumber: number) => Promise<void>;
	chosenDeliveryService: DeliveryService | null;
	setChosenDeliveryService: React.Dispatch<React.SetStateAction<DeliveryService | null>>;
}

export const DeliveryServiceForm = ({
	isOpen,
	onClose,
	fetchDeliveryServices,
	chosenDeliveryService,
	setChosenDeliveryService,
}: SizeFormProps) => {
	const { createDeliveryService } = useCreateDeliveryService();
	const { updateDeliveryService } = useUpdateDeliveryService();
	const [oldName, setOldName] = useState("");
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<DeliveryService>({
		defaultValues: DELIVERY_SERVICE_DEFAULT_VALUES,
		resolver: yupResolver(DELIVERY_SERVICE_VALIDATION_SCHEMA),
	});
	async function handleSubmitDeliveryService(values: DeliveryService) {
		if (chosenDeliveryService != null)
			updateDeliveryService(values, oldName).then((response: ApiResponse<null>) => {
				if (response.status === "SUCCESS") {
					fetchDeliveryServices(0);
					setChosenDeliveryService(null);
					onClose();
				}
			});
		else
			createDeliveryService(values).then((response: ApiResponse<null>) => {
				if (response.status === "SUCCESS") {
					fetchDeliveryServices(0);
					setChosenDeliveryService(null);
					onClose();
				}
			});
	}
	useEffect(() => {
		if (chosenDeliveryService != null) {
			reset(chosenDeliveryService);
			setOldName(chosenDeliveryService.name);
			return;
		}
		reset(DELIVERY_SERVICE_DEFAULT_VALUES);
		setOldName("");
	}, [chosenDeliveryService]);
	return (
		<Modal
			isOpen={isOpen}
			onClose={() => {
				reset(DELIVERY_SERVICE_DEFAULT_VALUES);
				onClose();
			}}
		>
			<ModalOverlay />
			<ModalContent margin={"auto"}>
				<ModalHeader textAlign={"center"} mt={4}>
					{chosenDeliveryService == null ? "Add" : "Update"} delivery service
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
						<FormControl isInvalid={errors.name != null}>
							<FormLabel fontWeight={"semibold"}>Name</FormLabel>
							<Input
								type="text"
								rounded={"4px"}
								h={"45px"}
								borderColor={colorPallete.inputBorder}
								{...register("name")}
								_hover={{
									borderColor: colorPallete.inputBorderHover,
								}}
							/>
							{errors.name ? (
								<FormErrorMessage ml={"8px"}>
									{errors.name.message}
								</FormErrorMessage>
							) : (
								<Box h={"25px"} w="100%" ml={"8px"}></Box>
							)}
						</FormControl>
						<FormControl isInvalid={errors.phone != null}>
							<FormLabel fontWeight={"semibold"}>Phone</FormLabel>
							<Input
								type="text"
								rounded={"4px"}
								h={"45px"}
								borderColor={colorPallete.inputBorder}
								{...register("phone")}
								_hover={{
									borderColor: colorPallete.inputBorderHover,
								}}
							/>
							{errors.phone ? (
								<FormErrorMessage ml={"8px"}>
									{errors.phone.message}
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
								onClick={handleSubmit(handleSubmitDeliveryService)}
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
								{chosenDeliveryService == null ? "Add" : "Update"} delivery service
							</Button>
						</Center>
					</Flex>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
