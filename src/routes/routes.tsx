import { ActivateRedirectPage } from "../pages/activate-redirect.page";
import { PartAdminPage } from "../pages/part-admin.page";
import { AuthPage } from "../pages/auth.page";
import { MainPage } from "../pages/main.page";
import { UserPage } from "../pages/user.page";
import { CurrentProcurementPage } from "../pages/current-procurement.page";
import { ProcurementPage } from "../pages/procurements-page";

interface CustomRouteProps {
	path: string;
	element: JSX.Element;
	needAuth: boolean;
	requiredRole?: string;
}

export const routes: CustomRouteProps[] = [
	{
		path: "/authorization",
		element: <AuthPage />,
		needAuth: false,
	},
	{
		path: "/",
		element: <MainPage />,
		needAuth: false,
	},
	{
		path: "/user/activation/:token",
		element: <ActivateRedirectPage />,
		needAuth: false,
	},
	{
		path: "/manage/parts/*",
		element: <PartAdminPage />,
		needAuth: true,
		requiredRole: "ADMIN",
	},
	{
		path: "/current/procurement",
		element: <CurrentProcurementPage />,
		needAuth: true,
		requiredRole: "ADMIN",
	},
	{
		path: "/procurements",
		element: <ProcurementPage />,
		needAuth: true,
		requiredRole: "ADMIN",
	},
	{
		path: "/user",
		element: <UserPage />,
		needAuth: true,
	},
];
