import { Route, Routes } from "react-router-dom";
import loadable from "@loadable/component";

const LayoutView = loadable(() => import("../../view/part-data-view/layout.view"), {
	resolveComponent: (components) => components.LayoutView,
});
const SizeView = loadable(() => import("../../view/part-data-view/size.view"), {
	resolveComponent: (components) => components.SizeView,
});
const SwitchView = loadable(() => import("../../view/part-data-view/switch.view"), {
	resolveComponent: (components) => components.SwitchView,
});
const KeycapProfileView = loadable(() => import("../../view/part-data-view/keycap-profile.view"), {
	resolveComponent: (components) => components.KeycapProfileView,
});
const CableView = loadable(() => import("../../view/part-view/cable.view"), {
	resolveComponent: (components) => components.CableView,
});
const CaseView = loadable(() => import("../../view/part-view/case.view"), {
	resolveComponent: (components) => components.CaseView,
});
const KeycapView = loadable(() => import("../../view/part-view/keycap.view"), {
	resolveComponent: (components) => components.KeycapView,
});
const PCBView = loadable(() => import("../../view/part-view/pcb-view"), {
	resolveComponent: (components) => components.PCBView,
});
const StabilizersView = loadable(() => import("../../view/part-view/stabilizers.view"), {
	resolveComponent: (components) => components.StabilizersView,
});
const PlateView = loadable(() => import("../../view/part-view/plate.view"), {
	resolveComponent: (components) => components.PlateView,
});
const SwitchSetView = loadable(() => import("../../view/part-view/switch-set.view"), {
	resolveComponent: (components) => components.SwitchSetView,
});
const SupplierView = loadable(() => import("../../view/warehouse-view/supplier.view"), {
	resolveComponent: (components) => components.SupplierView,
});
const BrandView = loadable(() => import("../../view/warehouse-view/brand.view"), {
	resolveComponent: (components) => components.BrandView,
});
const KeycapSetView = loadable(() => import("../../view/part-view/keycap-set.view"), {
	resolveComponent: (components) => components.KeycapSetView,
});

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
