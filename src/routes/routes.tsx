import { ActivateRedirectPage } from "../pages/activate-redirect.page";
import { PartPage } from "../pages/part.page";
import { AuthPage } from "../pages/auth.page";
import { MainPage } from "../pages/main.page";
import { UserPage } from "../pages/user.page";
import { CartPage } from "../pages/cart.page";
import { ProcurementPage } from "../pages/procurements-page";
import { MakeKeyboardPage } from "../pages/make-keyboard.page";
import { KeyboardPage } from "../pages/keyboard.page";

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
		path: "/keyboard/:name",
		element: <KeyboardPage />,
		needAuth: false,
	},
	{
		path: "/cart",
		element: <CartPage />,
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
