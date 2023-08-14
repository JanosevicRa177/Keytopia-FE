import { ActivateRedirectPage } from "../pages/activate-redirect.page";
import { PartPage } from "../pages/part.page";
import { AuthPage } from "../pages/auth.page";
import { MainPage } from "../pages/main.page";
import { UserPage } from "../pages/user.page";
import { CurrentProcurementPage } from "../pages/current-procurement.page";
import { ProcurementPage } from "../pages/procurements-page";
import { MakeKeyboardPage } from "../pages/make-keyboard.page";

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
		path: "/parts/*",
		element: <PartPage />,
		needAuth: false,
	},
	{
		path: "/cart",
		element: <CurrentProcurementPage />,
		needAuth: false,
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
	{
		path: "/make-keyboard",
		element: <MakeKeyboardPage />,
		needAuth: false,
	},
];
