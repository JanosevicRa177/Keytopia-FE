import { Button, Flex } from "@chakra-ui/react";
import { colorPallete } from "../../styles/color";

interface StepControlContainerProps {
	setActiveStep: (step: number) => void;
	activeStep: number;
}

export const StepControlContainer = ({ setActiveStep, activeStep }: StepControlContainerProps) => {
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
					}}
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
					bg={colorPallete.button}
					_hover={{
						bg: colorPallete.buttonHover,
						transform: "scale(1.03,1.03)",
						transition: "0.2s",
					}}
					fontSize={"xl"}
					onClick={() => {
						setActiveStep(activeStep + 1);
					}}
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
				>
					Order
				</Button>
			)}
		</Flex>
	);
};
