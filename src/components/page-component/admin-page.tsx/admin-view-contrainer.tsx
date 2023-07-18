import { KeycapProfileView } from "../../admin-components/view/part-data/keycap-profile.view";
import { LayoutView } from "../../admin-components/view/part-data/layout.view";
import { SizeView } from "../../admin-components/view/part-data/size.view";
import { SwitchView } from "../../admin-components/view/part-data/switch.view";
import { CableView } from "../../admin-components/view/part/cable.view";
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
		</>
	);
};
