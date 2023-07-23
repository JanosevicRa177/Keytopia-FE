import { KeycapProfileView } from "../../view/part-data-view/keycap-profile.view";
import { LayoutView } from "../../view/part-data-view/layout.view";
import { SizeView } from "../../view/part-data-view/size.view";
import { SwitchView } from "../../view/part-data-view/switch.view";
import { CableView } from "../../view/part-view/cable.view";
import { CaseView } from "../../view/part-view/case.view";
import { KeycapSetView } from "../../view/part-view/keycap-set.view";
import { KeycapView } from "../../view/part-view/keycap.view";
import { PCBView } from "../../view/part-view/pcb-view";
import { PlateView } from "../../view/part-view/plate.view";
import { StabilizersView } from "../../view/part-view/stabilizers.view";
import { SwitchSetView } from "../../view/part-view/switch-set.view";
import { BrandView } from "../../view/warehouse-view/brand.view";
import { SupplierView } from "../../view/warehouse-view/supplier.view";

interface AdminViewContainerProps {
	chosenView: string;
}

export const AdminViewContainer = (props: AdminViewContainerProps) => {
	return (
		<>
			{props.chosenView === "Size" && <SizeView />}
			{props.chosenView === "Layout" && <LayoutView />}
			{props.chosenView === "Switch" && <SwitchView />}
			{props.chosenView === "Keycap profile" && <KeycapProfileView />}
			{props.chosenView === "Brand" && <BrandView />}
			{props.chosenView === "Supplier" && <SupplierView />}
			{props.chosenView === "Cable" && <CableView />}
			{props.chosenView === "Case" && <CaseView />}
			{props.chosenView === "Keycap" && <KeycapView />}
			{props.chosenView === "Keycap set" && <KeycapSetView />}
			{props.chosenView === "Plate" && <PlateView />}
			{props.chosenView === "PCB" && <PCBView />}
			{props.chosenView === "Stabilizers" && <StabilizersView />}
			{props.chosenView === "Switch set" && <SwitchSetView />}
		</>
	);
};
