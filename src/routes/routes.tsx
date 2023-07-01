import { AuthPage } from "../pages/AuthPage";
import { MainPage } from "../pages/MainPage";

interface CustomRouteProps {
  path: string;
  element: JSX.Element;
  needAuth: boolean;
  requiredRole?: string[];
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
];
