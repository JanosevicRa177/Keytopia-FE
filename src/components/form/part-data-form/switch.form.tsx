import {
	Box,
	Flex,
	Center,
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Select,
	ModalBody,
	ModalContent,
	Modal,
	ModalHeader,
	ModalOverlay,
	ModalCloseButton,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateSwitch } from "../../../hooks/part-data-hooks/create/switch.create.hook";
import { ApiResponse } from "../../../store/auth-store/types/response.type";
import { colorPallete } from "../../../styles/color";
import {
	SWTICH_DEFAULT_VALUES,
	SWTICH_VALIDATION_SCHEMA,
} from "../../../utils/constants/part-data.constatns";
import { SwitchType, PinType, PriceWeight } from "../../../utils/enum";
import { useForm } from "react-hook-form";
import { Switch } from "../../../model/part-data.model";

interface SwitchFormProps {
	isOpen: boolean;
	onClose: () => void;
	fetchSwitch: (pageNumber: number) => Promise<void>;
}

export const SwitchForm = ({
	isOpen,
	onClose,
	fetchSwitch,
}: SwitchFormProps) => {
	const { createSwitch } = useCreateSwitch();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<Switch>({
		defaultValues: SWTICH_DEFAULT_VALUES,
		resolver: yupResolver(SWTICH_VALIDATION_SCHEMA),
	});
	async function handleCreateSwitch(values: Switch) {
		createSwitch(values).then((response: ApiResponse<null>) => {
			if (response.status === "SUCCESS") {
				fetchSwitch(0);
				reset();
				onClose();
			}
		});
	}
	return (
		<Modal
			isOpen={isOpen}
			onClose={() => {
				reset();
				onClose();
			}}
		>
			<ModalOverlay />
			<ModalContent margin={"auto"}>
				<ModalHeader textAlign={"center"} mt={4}>
					Add switch
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
						<Flex gap={"16px"}>
							<FormControl
								isInvalid={errors.actuationForce != null}
							>
								<FormLabel fontWeight={"semibold"}>
									Actuation force
								</FormLabel>
								<Input
									type="number"
									rounded={"4px"}
									h={"45px"}
									borderColor={colorPallete.inputBorder}
									{...register("actuationForce")}
									_hover={{
										borderColor:
											colorPallete.inputBorderHover,
									}}
								/>
								{errors.actuationForce ? (
									<FormErrorMessage ml={"8px"}>
										Actuation force is required
									</FormErrorMessage>
								) : (
									<Box h={"25px"} w="100%" ml={"8px"}></Box>
								)}
							</FormControl>
							<FormControl
								isInvalid={errors.actuationPoint != null}
							>
								<FormLabel fontWeight={"semibold"}>
									Actuation point
								</FormLabel>
								<Input
									type="number"
									rounded={"4px"}
									h={"45px"}
									borderColor={colorPallete.inputBorder}
									{...register("actuationPoint")}
									_hover={{
										borderColor:
											colorPallete.inputBorderHover,
									}}
								/>
								{errors.actuationPoint ? (
									<FormErrorMessage ml={"8px"}>
										Actuation point is required
									</FormErrorMessage>
								) : (
									<Box h={"25px"} w="100%" ml={"8px"}></Box>
								)}
							</FormControl>
						</Flex>
						<Flex gap={"16px"}>
							<FormControl isInvalid={errors.switchType != null}>
								<FormLabel fontWeight={"semibold"}>
									Switch type
								</FormLabel>
								<Select
									rounded={"4px"}
									h={"45px"}
									borderColor={colorPallete.inputBorder}
									{...register("switchType")}
									_hover={{
										borderColor:
											colorPallete.inputBorderHover,
									}}
								>
									<option value={SwitchType.TACTILE} selected>
										Tactile
									</option>
									<option value={SwitchType.LINEAR}>
										Linear
									</option>
									<option value={SwitchType.CLICKY}>
										Clicky
									</option>
								</Select>
								{errors.switchType ? (
									<FormErrorMessage ml={"8px"}>
										Switch type is required
									</FormErrorMessage>
								) : (
									<Box h={"25px"} w="100%" ml={"8px"}></Box>
								)}
							</FormControl>
							<FormControl isInvalid={errors.pinType != null}>
								<FormLabel fontWeight={"semibold"}>
									Pin type
								</FormLabel>
								<Select
									rounded={"4px"}
									h={"45px"}
									borderColor={colorPallete.inputBorder}
									{...register("pinType")}
									_hover={{
										borderColor:
											colorPallete.inputBorderHover,
									}}
								>
									<option value={PinType.PIN5} selected>
										5 pin
									</option>
									<option value={PinType.PIN3}>3 pin</option>
								</Select>
								{errors.pinType ? (
									<FormErrorMessage ml={"8px"}>
										Pin type is required
									</FormErrorMessage>
								) : (
									<Box h={"25px"} w="100%" ml={"8px"}></Box>
								)}
							</FormControl>
						</Flex>
						<FormControl isInvalid={errors.priceWeight != null}>
							<FormLabel fontWeight={"semibold"}>
								Price weight
							</FormLabel>
							<Select
								rounded={"4px"}
								h={"45px"}
								borderColor={colorPallete.inputBorder}
								{...register("priceWeight")}
								_hover={{
									borderColor: colorPallete.inputBorderHover,
								}}
							>
								<option value={PriceWeight.LIGHT} selected>
									Light
								</option>
								<option value={PriceWeight.MEDIUM}>
									Medium
								</option>
								<option value={PriceWeight.HEAVY}>Heavy</option>
							</Select>
							{errors.priceWeight ? (
								<FormErrorMessage ml={"8px"}>
									Price weight is required
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
								onClick={handleSubmit(handleCreateSwitch)}
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
								Add switch
							</Button>
						</Center>
					</Flex>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
