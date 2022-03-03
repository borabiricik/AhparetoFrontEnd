import BuyCredits from "layouts/Admin/Pages/Actions/BuyCredits";
import PasswordActions from "layouts/Admin/Pages/Actions/PasswordActions";
import IyzicoSettings from "layouts/Admin/Pages/Settings/IyzicoSettings";
import MailSettings from "layouts/Admin/Pages/Settings/MailSettings";
import CreatePrice from "layouts/Admin/Pages/Settings/Price/CreatePrice";
import EditPrice from "layouts/Admin/Pages/Settings/Price/EditPrice";
import Pricing from "layouts/Admin/Pages/Settings/Pricing";
import FillSurvey from "layouts/Survey/Fill/FillSurvey";
import SurveyLayout from "layouts/Survey/SurveyLayout";
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
import AddCriterias from "layouts/User/Pages/Surveys/Criterias/AddCriterias";
import ViewCriterias from "layouts/User/Pages/Surveys/Criterias/ViewCriterias";
import EditSurvey from "layouts/User/Pages/Surveys/EditSurvey";
import AddItemCriteria from "layouts/User/Pages/Surveys/ItemCriteria/AddItemCriteria";
import ViewItemCriteria from "layouts/User/Pages/Surveys/ItemCriteria/ViewItemCriteria";
import AddItems from "layouts/User/Pages/Surveys/Items/AddItems";
import ViewItems from "layouts/User/Pages/Surveys/Items/ViewItems";
import AddQuestions from "layouts/User/Pages/Surveys/Questions/AddQuestions";
import ViewQuestions from "layouts/User/Pages/Surveys/Questions/ViewQuestions";
import Surveys from "layouts/User/Pages/Surveys/Surveys";
import SurveySettings from "layouts/User/Pages/Surveys/SurveySettings";
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
    invisible: true,
  },
  {
    path: "/register",
    name: "Register",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Register,
    layout: "/auth",
    invisible: true,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/surveys",
    name: "Surveys",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Surveys,
    layout: "/admin",
  },
  {
    path: "/pollsters",
    name: "Pollsters",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Pollsters,
    layout: "/admin",
  },
  {
    path: "/demografik",
    name: "Demographic",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Demografik,
    layout: "/admin",
  },

  {
    path: "/create/demografik",
    name: "Create Demographic",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: CreateDemografik,
    layout: "/admin",
    invisible: true,
  },
  {
    path: "/edit/demografik/:id",
    name: "Edit Demographic",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: EditDemografik,
    layout: "/admin",
    invisible: true,
  },
  {
    path: "/pollstergroups",
    name: "Pollster Groups",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: PollsterGroups,
    layout: "/admin",
  },
  {
    path: "/create/pollstergroup",
    name: "Create Pollster Group",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: CreatePollsterGroup,
    layout: "/admin",
    invisible: true,
  },
  {
    path: "/edit/pollstergroup/:id",
    name: "Edit Pollster Group",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: EditPollsterGroup,
    layout: "/admin",
    invisible: true,
  },
  {
    path: "/create/pollster",
    name: "Create Pollster",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: CreatePollster,
    layout: "/admin",
    invisible: true,
  },
  {
    path: "/edit/pollster/:id",
    name: "Edit Pollster",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: EditPollster,
    layout: "/admin",
    invisible: true,
  },
  {
    path: "/edit/survey/:id",
    name: "Edit Survey",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: EditSurvey,
    layout: "/admin",
    invisible: true,
  },
  {
    path: "/settings/survey/:id/viewCriterias",
    name: "Add Items",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: ViewCriterias,
    layout: "/admin",
    invisible: true,
  },
  {
    path: "/settings/survey/:id/viewQuestions",
    name: "Add Items",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: ViewQuestions,
    layout: "/admin",
    invisible: true,
  },
  {
    path: "/settings/survey/:id/viewItems",
    name: "Add Items",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: ViewItems,
    layout: "/admin",
    invisible: true,
  },
  {
    path: "/settings/survey/:id/viewItemCriterias",
    name: "Add Items",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: ViewItemCriteria,
    layout: "/admin",
    invisible: true,
  },
  {
    path: "/settings/survey/:id/addItemCriteria",
    name: "Add Items",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: AddItemCriteria,
    layout: "/admin",
    invisible: true,
  },
  {
    path: "/settings/survey/:id/addQuestions",
    name: "Add Items",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: AddQuestions,
    layout: "/admin",
    invisible: true,
  },
  {
    path: "/settings/survey/:id/addCriterias",
    name: "Add Items",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: AddCriterias,
    layout: "/admin",
    invisible: true,
  },
  {
    path: "/settings/survey/:id/addItems",
    name: "Add Items",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: AddItems,
    layout: "/admin",
    invisible: true,
  },
  {
    path: "/settings/survey/:id",
    name: "Survey Settings",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: SurveySettings,
    layout: "/admin",
    invisible: true,
  },

  {
    path: "/create/survey",
    name: "Create Survey",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: CreateSurvey,
    layout: "/admin",
    invisible: true,
  },
  {
    collapse: true,
    name: "Settings",
    rtlName: "خرائط",
    icon: "tim-icons icon-pin",
    state: "settingsCollapse",
    views: [
      {
        path: "/iyzico-settings",
        name: "Iyzico Settings",
        rtlName: "خرائط جوجل",
        mini: "IA",
        rtlMini: "زم",
        component: IyzicoSettings,
        layout: "/admin",
      },
      {
        path: "/mail-settings",
        name: "Mail Settings",
        rtlName: "خرائط جوجل",
        mini: "MA",
        rtlMini: "زم",
        component: MailSettings,
        layout: "/admin",
      },
      {
        path: "/pricing-settings",
        name: "Pricing",
        rtlName: "خرائط جوجل",
        mini: "F",
        rtlMini: "زم",
        component: Pricing,
        layout: "/admin",
      },
      {
        path: "/buy-credits",
        name: "Buy Credits",
        rtlName: "خرائط جوجل",
        mini: "KR",
        rtlMini: "زم",
        component: BuyCredits,
        layout: "/admin",
      },
      {
        path: "/password-actions",
        name: "Password Actions",
        rtlName: "خرائط جوجل",
        mini: "Şİ",
        rtlMini: "زم",
        component: PasswordActions,
        layout: "/admin",
      },
      {
        path: "/edit/price/:id",
        name: "Edit Price",
        rtlName: "خرائط جوجل",
        mini: "PD",
        rtlMini: "زم",
        component: EditPrice,
        layout: "/admin",
        invisible: true,
      },
      {
        path: "/create/price",
        name: "Create Price",
        rtlName: "خرائط جوجل",
        mini: "PD",
        rtlMini: "زم",
        component: CreatePrice,
        layout: "/admin",
        invisible: true,
      },
    ],
  },
];
