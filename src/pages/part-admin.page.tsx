import { ControlContainer } from "../components/page-component/admin-page.tsx/control-container";
import { MainContrainer } from "../components/page-component/main-container";
import { useState } from "react";
import { ControlLinkContainer } from "../components/page-component/admin-page.tsx/control-link-container";
import { AdminViewContainer } from "../components/page-component/admin-page.tsx/admin-view-contrainer";

export const PartAdminPage = () => {
	const [chosenView, setChosenView] = useState("Cable");
	const parts = [
		"Cable",
		"Case",
		"Keycap",
		"Keycap set",
		"Plate",
		"PCB",
		"Stabilizers",
		"Switch set",
	];
	const partDatas = ["Keycap profile", "Switch", "Size", "Layout"];
	const warehouse = ["Brand", "Supplier"];
	return (
		<MainContrainer>
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
			<AdminViewContainer chosenView={chosenView} />
		</MainContrainer>
	);
};
