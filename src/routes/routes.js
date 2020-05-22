import LoginPage from "pages/login";
import MainPage from "pages/main";
import DashboardPage from "pages/dashboard";

export const Routes = [
  {
    component: MainPage,
    exact: true,
    path: "/",
  },
  {
    component: LoginPage,
    exact: true,
    path: "/login",
  },
  {
    component: DashboardPage,
    exact: true,
    path: "/admin",
  },
];
