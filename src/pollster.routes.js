import Login from "layouts/Pollster/Auth/Login";
import Dashboard from "layouts/Pollster/Dashboard";

export default [
  {
    path: "/login",
    name: "PollsterLogin",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Login,
    layout: "/pollster",
    invisible: true,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/pollster",
    invisible: true,
  },
];
