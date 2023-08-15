/* eslint-disable react-hooks/exhaustive-deps */
import { ControlContainer } from "../components/page-component/control-container";
import { MainContrainer } from "../components/page-component/main-container";
import { Flex } from "@chakra-ui/react";
import { PartType } from "../utils/enum";
import { RouteWithPartType } from "../model/util.model";
import { ControlLinkContainer } from "../components/page-component/control-link-container";
import { PartViewContainer } from "../components/page-component/part-view-contrainer";
import { ControlLinkKeyboardContainer } from "../components/page-component/control-link-keyboard.container";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const PartPage = () => {
	let location = useLocation();
	const [oldLocation, setOldLocation] = useState("");
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
	const [chosenView, setChosenView] = useState<RouteWithPartType>(
		location.pathname === "/parts/part" ? parts[0] : { value: "Keyboards", route: "keyboard" }
	);
	useEffect(() => {
		if (location.pathname === oldLocation) return;
		if (location.pathname === "/parts/part" || location.pathname === "/parts/keyboard") {
			setChosenView(
				location.pathname === "/parts/part"
					? parts[0]
					: { value: "Keyboards", route: "keyboard" }
			);
		}
		setOldLocation(location.pathname);
	}, [location]);
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
	const sales = [
		{ value: "Delivery services", route: "delivery-service" },
		{ value: "Orders", route: "order" },
	];
	return (
		<MainContrainer>
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
			<Flex backdropBlur="4px" zIndex={"2"}>
				<ControlContainer>
					<ControlLinkKeyboardContainer chosen={chosenView} setChosen={setChosenView} />
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
					<ControlLinkContainer
						header="Sales"
						chosen={chosenView}
						setChosen={setChosenView}
						names={sales}
					/>
				</ControlContainer>
				<PartViewContainer partType={chosenView.partType} />
			</Flex>
		</MainContrainer>
	);
};
