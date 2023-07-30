import { Route, Routes } from "react-router-dom";
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
			<Routes>
				<Route path="/cable" element={<CaseView />} />
				<Route path="/case" element={<CableView />} />
				<Route path="/size" element={<SizeView />} />
				<Route path="/layout" element={<LayoutView />} />
				<Route path="/switch" element={<SwitchView />} />
				<Route path="/brand" element={<BrandView />} />
				<Route path="/supplier" element={<SupplierView />} />
				<Route path="/keycap" element={<KeycapView />} />
				<Route path="/plate" element={<PlateView />} />
				<Route path="/pcb" element={<PCBView />} />
				<Route path="/stabilizers" element={<StabilizersView />} />
				<Route path={"keycap-profile"} element={<KeycapProfileView />} />
				<Route path={"keycap-set"} element={<KeycapSetView />} />
				<Route path={"switch-set"} element={<SwitchSetView />} />
			</Routes>
		</>
	);
};
