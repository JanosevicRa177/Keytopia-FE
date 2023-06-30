import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";

interface CustomRouteProps {
  path: string;
  element: JSX.Element;
  isProtected: boolean;
  requiredRole?: string[];
}

export const routes: CustomRouteProps[] = [
  {
    path: "/",
    element: <HomePage />,
    isProtected: false,
  },
  {
    path: "/login",
    element: <LoginPage />,
    isProtected: false,
  },
];
