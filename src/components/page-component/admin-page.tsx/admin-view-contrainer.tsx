import { Route, Routes } from "react-router-dom";
import { KeycapProfileView } from "../../view/part-data-view/keycap-profile.view";
import { LayoutView } from "../../view/part-data-view/layout.view";
import { SizeView } from "../../view/part-data-view/size.view";
import { SwitchView } from "../../view/part-data-view/switch.view";
import { PartView } from "../../view/part-view/part.view";
import { BrandView } from "../../view/warehouse-view/brand.view";
import { SupplierView } from "../../view/warehouse-view/supplier.view";
import { PartType } from "../../../utils/enum";

interface PartViewContainerProps {
	partType?: PartType;
}

export const PartViewContainer = (props: PartViewContainerProps) => {
	return (
		<>
			<Routes>
				<Route path="/part" element={<PartView partType={props.partType} />} />
				<Route path="/size" element={<SizeView />} />
				<Route path="/layout" element={<LayoutView />} />
				<Route path="/switch" element={<SwitchView />} />
				<Route path="/brand" element={<BrandView />} />
				<Route path="/supplier" element={<SupplierView />} />
				<Route path={"keycap-profile"} element={<KeycapProfileView />} />
			</Routes>
		</>
	);
};
