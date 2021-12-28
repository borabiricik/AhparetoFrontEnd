import BuyCredits from "layouts/Admin/Pages/Actions/BuyCredits";
import PasswordActions from "layouts/Admin/Pages/Actions/PasswordActions";
import Dashboard from "layouts/User/Pages/Dashboard";
import CreateDemografik from "layouts/User/Pages/Demografik/CreateDemografik";
import Demografik from "layouts/User/Pages/Demografik/Demografik";
import EditDemografik from "layouts/User/Pages/Demografik/EditDemografik";
import CreatePollsterGroup from "layouts/User/Pages/PollsterGroups/CreatePollsterGroup";
import EditPollsterGroup from "layouts/User/Pages/PollsterGroups/EditPollsterGroup";
import PollsterGroups from "layouts/User/Pages/PollsterGroups/PollsterGroups";
import CreatePollster from "layouts/User/Pages/Pollsters/CreatePollster";
import EditPollster from "layouts/User/Pages/Pollsters/EditPollster";
import Pollsters from "layouts/User/Pages/Pollsters/Pollsters";
import CreateSurvey from "layouts/User/Pages/Surveys/CreateSurvey";
import EditSurvey from "layouts/User/Pages/Surveys/EditSurvey";
import Surveys from "layouts/User/Pages/Surveys/Surveys";
import Login from "views/pages/Login";
import Register from "views/pages/Register";

export default [
  {
    path: "/login",
    name: "Login",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Login,
    layout: "/auth",
    invisible:true
  },
  {
    path: "/register",
    name: "Register",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Register,
    layout: "/auth",
    invisible:true
  },
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
  {
    path: "/demografik",
    name: "Demografik",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Demografik,
    layout: "/user",
  },
  {
    path: "/create/demografik",
    name: "Create Demografik",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: CreateDemografik,
    layout: "/user",
    invisible: true,
  },
  {
    path: "/edit/demografik/:id",
    name: "Edit Demografik",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: EditDemografik,
    layout: "/user",
    invisible: true,
  },
  {
    path: "/pollstergroups",
    name: "Anketör Grupları",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: PollsterGroups,
    layout: "/user",
  },
  {
    path: "/create/pollstergroup",
    name: "Anketör Grubu Oluştur",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: CreatePollsterGroup,
    layout: "/user",
    invisible: true,
  },
  {
    path: "/edit/pollstergroup/:id",
    name: "Anketör Grubu Düzenle",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: EditPollsterGroup,
    layout: "/user",
    invisible: true,
  },
  {
    path: "/create/pollster",
    name: "Anketör Oluştur",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: CreatePollster,
    layout: "/user",
    invisible: true,
  },
  {
    path: "/edit/pollster/:id",
    name: "Anketör Düzenle",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: EditPollster,
    layout: "/user",
    invisible: true,
  },
  {
    path: "/edit/survey/:id",
    name: "Anketi Düzenle",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: EditSurvey,
    layout: "/user",
    invisible: true,
  },
  {
    path: "/create/survey",
    name: "Anket Oluştur",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: CreateSurvey,
    layout: "/user",
    invisible: true,
  },
  {
    collapse: true,
    name: "AYARLAR",
    rtlName: "خرائط",
    icon: "tim-icons icon-pin",
    state: "settingsCollapse",
    views: [
      {
        path: "/buy-credits",
        name: "Kredi Satın Al",
        rtlName: "خرائط جوجل",
        mini: "KR",
        rtlMini: "زم",
        component: BuyCredits,
        layout: "/user",
      },
      {
        path: "/password-actions",
        name: "ŞİFRE İŞLEMLERİ",
        rtlName: "خرائط جوجل",
        mini: "Şİ",
        rtlMini: "زم",
        component: PasswordActions,
        layout: "/user",
      },
    ],
  },
];
