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
import { FirstStep } from "../components/step-components/first.step";
import { StepControlContainer } from "../components/step-components/step-control.component";
import { KeyboardCards } from "../components/part-card-component/keyboard-cards";
import { ChooseCase } from "../components/step-components/choose-case.step";
import { ChoosePCB } from "../components/step-components/choose-pcb.step";
import { ChoosePlate } from "../components/step-components/choose-plate.step";
import { ChooseCable } from "../components/step-components/choose.cable.step";
import { ChooseKeycapSet } from "../components/step-components/choose-keycap-set.step";
import { ChooseStabilizers } from "../components/step-components/choose-stabilizers.step";
import { ChooseSwitchSet } from "../components/step-components/choose-switch-set.step";
import { FinalStep } from "../components/step-components/final.step";

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

export const MakeKeyboardPage = () => {
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
						minW={"20%"}
						maxW={"20%"}
						mt={"24px"}
					>
						{steps.map((step, index) => (
							<Step key={index}>
								<Flex gap={"8px"} minH={"100px"} maxH={"100px"}>
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
					<Flex
						flexGrow={"1"}
						flexDir={"column"}
						gap={"32px"}
						px={"24px"}
						bg={"rgba(255,255,255,0.9)"}
						py={"32px"}
						boxShadow={"4px 4px 12px 0px rgba(0,0,0,0.3)"}
						rounded={"6px"}
					>
						<KeyboardCards />
						<StepControlContainer
							activeStep={activeStep}
							setActiveStep={setActiveStep}
						/>
						{activeStep === 0 && <FirstStep />}
						{activeStep === 1 && <ChooseCase />}
						{activeStep === 2 && <ChoosePCB />}
						{activeStep === 3 && <ChoosePlate />}
						{activeStep === 4 && <ChooseCable />}
						{activeStep === 5 && <ChooseKeycapSet />}
						{activeStep === 6 && <ChooseStabilizers />}
						{activeStep === 7 && <ChooseSwitchSet />}
						{activeStep === 8 && <FinalStep />}
					</Flex>
				</Flex>
			</Flex>
		</MainContrainer>
	);
};
