import { KeycapProfileView } from "../../admin-components/view/part-data-view/keycap-profile.view";
import { LayoutView } from "../../admin-components/view/part-data-view/layout.view";
import { SizeView } from "../../admin-components/view/part-data-view/size.view";
import { SwitchView } from "../../admin-components/view/part-data-view/switch.view";
import { CableView } from "../../admin-components/view/part-view/cable.view";
import { CaseView } from "../../admin-components/view/part-view/case.view";
import { KeycapSetView } from "../../admin-components/view/part-view/keycap-set.view";
import { KeycapView } from "../../admin-components/view/part-view/keycap.view";
import { PCBView } from "../../admin-components/view/part-view/pcb-view";
import { PlateView } from "../../admin-components/view/part-view/plate.view";
import { StabilizersView } from "../../admin-components/view/part-view/stabilizers.view";
import { SwitchSetView } from "../../admin-components/view/part-view/switch-set.view";
import { BrandView } from "../../admin-components/view/warehouse-view/brand.view";
import { SupplierView } from "../../admin-components/view/warehouse-view/supplier.view";

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
