import { KeycapProfileView } from "../../admin-components/view/part-data/keycap-profile.view";
import { LayoutView } from "../../admin-components/view/part-data/layout.view";
import { SizeView } from "../../admin-components/view/part-data/size.view";
import { SwitchView } from "../../admin-components/view/part-data/switch.view";
import { CableView } from "../../admin-components/view/part/cable.view";
import { CaseView } from "../../admin-components/view/part/case.view";
import { KeycapSetView } from "../../admin-components/view/part/keycap-set.view";
import { KeycapView } from "../../admin-components/view/part/keycap.view";
import { PCBView } from "../../admin-components/view/part/pcb-view";
import { PlateView } from "../../admin-components/view/part/plate.view";
import { StabilizersView } from "../../admin-components/view/part/stabilizers.view";
import { SwitchSetView } from "../../admin-components/view/part/switch-set.view";
import { BrandView } from "../../admin-components/view/warehouse/brand.view";
import { SupplierView } from "../../admin-components/view/warehouse/supplier.view";

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
