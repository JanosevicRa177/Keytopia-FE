import {
	Box,
	Flex,
	Step,
	StepDescription,
	StepIcon,
	StepIndicator,
	StepNumber,
	StepSeparator,
	StepStatus,
	StepTitle,
	Stepper,
	useSteps,
} from "@chakra-ui/react";
import { MainContrainer } from "../components/page-component/main-container";
import { FirstStepAdmin } from "../components/step-components/admin/first.step";
import { StepControlContainer } from "../components/step-components/step-control.component";
import { KeyboardCards } from "../components/part-card-component/keyboard-cards";

const steps = [
	{ title: "Choose initial setup", description: "This will be important later!" },
	{ title: "Choose Case", description: "Its a shell of the whole system." },
	{ title: "Choose PCB", description: "He is the brain behind it all!" },
	{ title: "Choose Plate", description: "Additional reinforcement for keyboard." },
	{ title: "Choose Cable", description: "Juice delivery guy!" },
	{ title: "Choose Keycap set", description: "The main makeup of the keyboard!" },
	{ title: "Choose Stabilizers", description: "Even the big boy keys need help!" },
	{ title: "Choose Switch set", description: "How does it sound so good?" },
	{ title: "Final step", description: "" },
];

export const MakeKeyboardAdminPage = () => {
	const { activeStep, setActiveStep } = useSteps({
		index: 0,
		count: steps.length,
	});
	return (
		<MainContrainer>
			<Flex w={"100%"} flexDirection={"column"} my={"32px"} position={"relative"}>
				<Flex
					bg={"rgba(255,255,255,0.5)"}
					backdropFilter="auto"
					backdropBlur="4px"
					w={"1140px"}
					top={"-20px"}
					position={"fixed"}
					h={"calc(100vh + 20px)"}
					zIndex={1}
				/>
				<Flex px={"32px"} zIndex={2} gap={"20px"}>
					<Stepper
						index={activeStep}
						size="lg"
						orientation="vertical"
						colorScheme="purple"
						minW={"25%"}
						maxW={"25%"}
					>
						{steps.map((step, index) => (
							<Step key={index} onClick={() => setActiveStep(index)}>
								<Flex gap={"8px"} h={"100px"} cursor={"pointer"}>
									<StepIndicator transition={"0.2s ease"}>
										<StepStatus
											complete={<StepIcon />}
											incomplete={<StepNumber />}
											active={<StepNumber />}
										/>
									</StepIndicator>
									<Box>
										<StepTitle>{step.title}</StepTitle>
										<StepDescription>{step.description}</StepDescription>
									</Box>
									<StepSeparator />
								</Flex>
							</Step>
						))}
					</Stepper>
					<Flex flexGrow={"1"} flexDir={"column"} gap={"48px"}>
						<KeyboardCards />
						{activeStep === 0 && <FirstStepAdmin />}
						<StepControlContainer
							activeStep={activeStep}
							setActiveStep={setActiveStep}
						/>
					</Flex>
				</Flex>
			</Flex>
		</MainContrainer>
	);
};
