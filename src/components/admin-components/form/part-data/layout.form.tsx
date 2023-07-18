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
import { colorPallete } from "../../../../styles/color";
import {
	LAYOUT_DEFAULT_VALUES,
	LAYOUT_VALIDATION_SCHEMA,
} from "../../../../utils/constants/part-data.constatns";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useCreateLayout } from "../../../../hooks/part-data-hooks/create/layout.create.hook";
import { Layout } from "../../../../model/part-data.model";
import { ApiResponse } from "../../../../store/auth-store/types/response.type";

interface LayoutFormProps {
	isOpen: boolean;
	onClose: () => void;
	fetchLayouts: (pageNumber: number) => Promise<void>;
}

export const LayoutForm = ({
	isOpen,
	onClose,
	fetchLayouts,
}: LayoutFormProps) => {
	const { createLayout } = useCreateLayout();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<Layout>({
		defaultValues: LAYOUT_DEFAULT_VALUES,
		resolver: yupResolver(LAYOUT_VALIDATION_SCHEMA),
	});
	async function handleCreateLayout(values: Layout) {
		createLayout(values).then((response: ApiResponse<null>) => {
			if (response.status === "SUCCESS") {
				fetchLayouts(0);
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
					Add layout
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
						<Flex gap={"16px"}>
							<FormControl isInvalid={errors.name != null}>
								<FormLabel fontWeight={"semibold"}>
									Name
								</FormLabel>
								<Input
									type="text"
									rounded={"4px"}
									h={"45px"}
									borderColor={colorPallete.inputBorder}
									{...register("name")}
									_hover={{
										borderColor:
											colorPallete.inputBorderHover,
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
							<FormControl
								isInvalid={errors.localization != null}
							>
								<FormLabel fontWeight={"semibold"}>
									Localization
								</FormLabel>
								<Input
									type="text"
									rounded={"4px"}
									h={"45px"}
									borderColor={colorPallete.inputBorder}
									{...register("localization")}
									_hover={{
										borderColor:
											colorPallete.inputBorderHover,
									}}
								/>
								{errors.localization ? (
									<FormErrorMessage ml={"8px"}>
										{errors.localization.message}
									</FormErrorMessage>
								) : (
									<Box h={"25px"} w="100%" ml={"8px"}></Box>
								)}
							</FormControl>
						</Flex>
						<Center h={"45px"} mt={"16px"} w={"auto"}>
							<Button
								w={"calc(100% - 64px)"}
								h={"45px"}
								rounded={"4px"}
								onClick={handleSubmit(handleCreateLayout)}
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
								Add layout
							</Button>
						</Center>
					</Flex>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
