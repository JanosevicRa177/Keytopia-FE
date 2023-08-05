import { ControlContainer } from "../components/page-component/admin-page.tsx/control-container";
import { MainContrainer } from "../components/page-component/main-container";
import { useState } from "react";
import { ControlLinkContainer } from "../components/page-component/admin-page.tsx/control-link-container";
import { Flex } from "@chakra-ui/react";
import { PartViewContainer } from "../components/page-component/admin-page.tsx/part-view-contrainer";
import { PartType } from "../utils/enum";
import { RouteWithPartType } from "../model/util.model";

export const PartPage = () => {
	const parts = [
		{ value: "All parts", route: "part" },
		{ value: "Case", route: "part", partType: PartType.CASE },
		{ value: "Cable", route: "part", partType: PartType.CABLE },
		{ value: "Keycap", route: "part", partType: PartType.KEYCAP },
		{ value: "Keycap set", route: "part", partType: PartType.KEYCAP_SET },
		{ value: "Plate", route: "part", partType: PartType.PLATE },
		{ value: "PCB", route: "part", partType: PartType.PCB },
		{ value: "Stabilizers", route: "part", partType: PartType.STABILIZER },
		{ value: "Switch set", route: "part", partType: PartType.SWITCH_SET },
	];
	const [chosenView, setChosenView] = useState<RouteWithPartType>(parts[0]);
	const partDatas = [
		{ value: "Keycap profile", route: "keycap-profile" },
		{ value: "Switch", route: "switch" },
		{ value: "Size", route: "size" },
		{ value: "Layout", route: "layout" },
	];
	const warehouse = [
		{ value: "Brand", route: "brand" },
		{ value: "Supplier", route: "supplier" },
	];
	return (
		<MainContrainer>
			<Flex bg={"rgba(255,255,255,0.5)"} backdropFilter="auto" backdropBlur="4px">
				<ControlContainer>
					<ControlLinkContainer
						header="Parts"
						chosen={chosenView}
						setChosen={setChosenView}
						names={parts}
					/>
					<ControlLinkContainer
						header="Part data"
						chosen={chosenView}
						setChosen={setChosenView}
						names={partDatas}
					/>
					<ControlLinkContainer
						header="Warehouse"
						chosen={chosenView}
						setChosen={setChosenView}
						names={warehouse}
					/>
				</ControlContainer>
				<PartViewContainer partType={chosenView.partType} />
			</Flex>
		</MainContrainer>
	);
};
