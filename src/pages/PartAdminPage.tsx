import { Text, Flex, Box } from "@chakra-ui/react";
import { ControlContainer } from "../components/page-component/control-container";
import { MainContrainer } from "../components/page-component/main-container";
import { InnerLink } from "../components/page-component/inner-link";
import { useState } from "react";
import { KeycapProfileView } from "../components/add-part-component/view/keycap-profile.view";
import { SizeView } from "../components/add-part-component/view/size.view";
import { LayoutView } from "../components/add-part-component/view/layout.view";
import { SwitchView } from "../components/add-part-component/view/switch.view";

export const PartAdminPage = () => {
	const [part, setPart] = useState("Cable");
	return (
		<MainContrainer>
			<ControlContainer>
				<Text fontSize={"xl"} mr={"12px"}>
					Parts:
				</Text>
				<Flex position={"relative"}>
					<Flex position={"absolute"} columnGap={"12px"} top={"5px"}>
						<InnerLink
							text="Cable"
							chosen={part}
							setChosen={setPart}
						/>
						<InnerLink
							text="Case"
							chosen={part}
							setChosen={setPart}
						/>
						<InnerLink
							text="Keycap"
							chosen={part}
							setChosen={setPart}
						/>
						<InnerLink
							text="Keycap set"
							chosen={part}
							setChosen={setPart}
						/>
						<InnerLink
							text="PCB"
							chosen={part}
							setChosen={setPart}
						/>
						<InnerLink
							text="Plate"
							chosen={part}
							setChosen={setPart}
						/>
						<InnerLink
							text="Stabilizer"
							chosen={part}
							setChosen={setPart}
						/>
						<InnerLink
							text="Switch set"
							chosen={part}
							setChosen={setPart}
						/>
					</Flex>
					<Box w="430px" />
				</Flex>
				<Box mx={"16px"} w={"2px"} bgColor={"#444444"} />
				<Text fontSize={"xl"} mr={"12px"}>
					Part Data:
				</Text>
				<Flex position={"relative"}>
					<Flex position={"absolute"} columnGap={"12px"} top={"5px"}>
						<InnerLink
							text="Keycap profile"
							chosen={part}
							setChosen={setPart}
						/>
						<InnerLink
							text="Switch"
							chosen={part}
							setChosen={setPart}
						/>
						<InnerLink
							text="Layout"
							chosen={part}
							setChosen={setPart}
						/>
						<InnerLink
							text="Size"
							chosen={part}
							setChosen={setPart}
						/>
					</Flex>
					<Box w="230px" />
				</Flex>
			</ControlContainer>
			{part === "Size" && <SizeView />}
			{part === "Layout" && <LayoutView />}
			{part === "Switch" && <SwitchView />}
			{part === "Keycap profile" && <KeycapProfileView />}
		</MainContrainer>
	);
};
