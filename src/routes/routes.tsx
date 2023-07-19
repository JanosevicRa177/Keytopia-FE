import { ActivateRedirectPage } from "../pages/activate-redirect.page";
import { PartAdminPage } from "../pages/part-admin.page";
import { AuthPage } from "../pages/auth.page";
import { MainPage } from "../pages/main.page";

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
		path: "/admin/part",
		element: <PartAdminPage />,
		needAuth: true,
		requiredRole: "ADMIN",
	},
];
