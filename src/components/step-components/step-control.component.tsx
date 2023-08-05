import { Button, Flex } from "@chakra-ui/react";
import { colorPallete } from "../../styles/color";
import { useApplicationStore } from "../../store/store";

interface StepControlContainerProps {
	setActiveStep: (step: number) => void;
	activeStep: number;
}

export const StepControlContainer = ({ setActiveStep, activeStep }: StepControlContainerProps) => {
	const scrollToTop = () => {
		window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
	};
	const keyboard = useApplicationStore((state) => state.keyboard);
	function calculateDisabled() {
		if (activeStep === 1) return keyboard.case === undefined;
	}
	return (
		<Flex justifyContent={"end"} gap={"12px"}>
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
			{activeStep !== 9 ? (
				<Button
					w={"150px"}
					h={"45px"}
					rounded={"4px"}
					overflow={"hidden"}
					bg={calculateDisabled() ? colorPallete.disabledButton : colorPallete.button}
					_hover={{
						bg: !calculateDisabled() && colorPallete.buttonHover,
						transform: "scale(1.03,1.03)",
						transition: "0.2s",
					}}
					fontSize={"xl"}
					onClick={() => {
						setActiveStep(activeStep + 1);
						scrollToTop();
					}}
					color={calculateDisabled() ? "white" : "#343434"}
					isDisabled={calculateDisabled()}
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
				>
					Order
				</Button>
			)}
		</Flex>
	);
};
