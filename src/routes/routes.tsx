import { ActivateRedirectPage } from "../pages/ActivateRedirecPage";
import { PartAdminPage } from "../pages/PartAdminPage";
import { AuthPage } from "../pages/AuthPage";
import { MainPage } from "../pages/MainPage";

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
