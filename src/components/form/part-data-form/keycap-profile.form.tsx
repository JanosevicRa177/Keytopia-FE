import {
	Box,
	Flex,
	Center,
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateKeycapProfile } from "../../../hooks/part-data-hooks/create/keycap-profile.create.hook";
import { KeycapProfile } from "../../../model/part-data.model";
import { ApiResponse } from "../../../store/auth-store/types/response.type";
import { colorPallete } from "../../../styles/color";
import {
	KEYCAP_PROFILE_DEFAULT_VALUES,
	KEYCAP_PROFILE_VALIDATION_SCHEMA,
} from "../../../utils/constants/part-data.constatns";
import { useForm } from "react-hook-form";

interface KeycapProfileFormProps {
	isOpen: boolean;
	onClose: () => void;
	fetchKeycapProfiles: (pageNumber: number) => Promise<void>;
}

export const KeycapProfileForm = ({
	isOpen,
	onClose,
	fetchKeycapProfiles,
}: KeycapProfileFormProps) => {
	const { createKeycapProfile } = useCreateKeycapProfile();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<KeycapProfile>({
		defaultValues: KEYCAP_PROFILE_DEFAULT_VALUES,
		resolver: yupResolver(KEYCAP_PROFILE_VALIDATION_SCHEMA),
	});
	async function handleCreateKeycapProfile(values: KeycapProfile) {
		createKeycapProfile(values).then((response: ApiResponse<null>) => {
			if (response.status === "SUCCESS") {
				fetchKeycapProfiles(0);
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
					Add keycap profile
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
						<Center h={"45px"} mt={"16px"} w={"auto"}>
							<Button
								w={"calc(100% - 64px)"}
								h={"45px"}
								rounded={"4px"}
								onClick={handleSubmit(
									handleCreateKeycapProfile
								)}
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
								Add keycap profile
							</Button>
						</Center>
					</Flex>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
