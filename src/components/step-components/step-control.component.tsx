import { Button, Flex } from "@chakra-ui/react";
import { colorPallete } from "../../styles/color";
import { useApplicationStore } from "../../store/store";
import { calculateDisabled } from "../../utils/functions";
import { useCreateKeyboardAdmin } from "../../hooks/keyboard-hooks/keyboard.create.admin.hook";
import { toast } from "react-toastify";
import { ApiResponse } from "../../store/auth-store/types/response.type";
import { useNavigate } from "react-router-dom";
import { useCreateKeyboardBuyer } from "../../hooks/keyboard-hooks/keyboard.create.buyer.hook";
import { PartData } from "../../store/keyboard-store/types/keyboard.type";

interface StepControlContainerProps {
	setActiveStep: (step: number) => void;
	activeStep: number;
}

export const StepControlContainer = ({ setActiveStep, activeStep }: StepControlContainerProps) => {
	const navigate = useNavigate();
	const scrollToTop = () => {
		window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
	};
	function handleSubmit() {
		if (user?.role === "ADMIN") {
			if (keyboard.image == null) {
				toast.error("You must choose image first!");
				return;
			}
			createKeyboardAdmin(keyboard).then((resp: ApiResponse<null>) => {
				if (resp.status === "SUCCESS") {
					navigate("/");
					setImage(undefined);
				}
			});
		} else {
			createKeyboardBuyer(keyboard).then((resp: ApiResponse<PartData | null>) => {
				if (resp.status === "SUCCESS") {
					if (resp.data != null)
						addToCart({
							name: resp.data.name,
							price: resp.data.price,
							quantity: 1,
							image:
								resp.data.imageUrl != null ? resp.data.imageUrl.toString() : null,
							generatedByBuyer: true,
						});
					navigate("/cart");
				}
			});
		}
	}
	const user = useApplicationStore((state) => state.user);
	const keyboard = useApplicationStore((state) => state.keyboard);
	const setImage = useApplicationStore((state) => state.setImage);
	const addToCart = useApplicationStore((state) => state.addToCart);

	const { createKeyboardAdmin } = useCreateKeyboardAdmin();
	const { createKeyboardBuyer } = useCreateKeyboardBuyer();
	return (
		<Flex justifyContent={"end"} gap={"12px"} mt={"32px"}>
			{activeStep !== 0 && (
				<Button
					w={"150px"}
					h={"45px"}
					rounded={"4px"}
					overflow={"hidden"}
					bg={colorPallete.button}
					_hover={{
						bg: colorPallete.buttonHover,
						transform: "scale(1.03,1.03)",
						transition: "0.2s",
					}}
					fontSize={"xl"}
					onClick={() => {
						setActiveStep(activeStep - 1);
						scrollToTop();
					}}
					color={"#343434"}
				>
					Back
				</Button>
			)}
			{activeStep !== 8 ? (
				<Button
					w={"150px"}
					h={"45px"}
					rounded={"4px"}
					overflow={"hidden"}
					bg={
						calculateDisabled(activeStep, keyboard)
							? colorPallete.disabledButton
							: colorPallete.button
					}
					_hover={{
						bg: !calculateDisabled(activeStep, keyboard) && colorPallete.buttonHover,
						transform: "scale(1.03,1.03)",
						transition: "0.2s",
					}}
					fontSize={"xl"}
					onClick={() => {
						setActiveStep(activeStep + 1);
						scrollToTop();
					}}
					color={calculateDisabled(activeStep, keyboard) ? "white" : "#343434"}
					isDisabled={calculateDisabled(activeStep, keyboard)}
				>
					Next
				</Button>
			) : (
				<Button
					w={"150px"}
					h={"45px"}
					rounded={"4px"}
					overflow={"hidden"}
					bg={colorPallete.button}
					_hover={{
						bg: colorPallete.buttonHover,
						transform: "scale(1.03,1.03)",
						transition: "0.2s",
					}}
					fontSize={"xl"}
					color={"#343434"}
					onClick={() => handleSubmit()}
				>
					{user?.role === "Order" ? "" : "Make keyboard"}
				</Button>
			)}
		</Flex>
	);
};
