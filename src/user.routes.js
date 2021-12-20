import Dashboard from "layouts/User/Pages/Dashboard";
import Pollsters from "layouts/User/Pages/Pollsters";
import Surveys from "layouts/User/Pages/Surveys";

export default [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/user",
  },
  {
    path: "/surveys",
    name: "Anketler",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Surveys,
    layout: "/user",
  },
  {
    path: "/pollsters",
    name: "Anketörler",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Pollsters,
    layout: "/user",
  },
];
