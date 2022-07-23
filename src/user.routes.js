import Payment from "components/Payment/Payment";
import BuyCredits from "layouts/Admin/Pages/Actions/BuyCredits";
import PasswordActions from "layouts/Admin/Pages/Actions/PasswordActions";
import SurveyLayout from "layouts/Survey/SurveyLayout";
import Dashboard from "layouts/User/Pages/Dashboard";
import CreateDemografik from "layouts/User/Pages/Demografik/CreateDemografik";
import Demografik from "layouts/User/Pages/Demografik/Demografik";
import EditDemografik from "layouts/User/Pages/Demografik/EditDemografik";
import CallBack from "layouts/User/Pages/Payment/CallBack";
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
import Buy from "components/Payment/Buy";
import FillProfile from "views/pages/FillProfile";
import ViewCriterias from "layouts/User/Pages/Surveys/Criterias/ViewCriterias";
import EditParticipants from "layouts/User/Pages/Surveys/Participants/EditParticipants";
import ViewParticipants from "layouts/User/Pages/Surveys/Participants/ViewParticipants";
import ViewQuestions from "layouts/User/Pages/Surveys/Questions/ViewQuestions";
import ViewItems from "layouts/User/Pages/Surveys/Items/ViewItems";
import ViewItemCriteria from "layouts/User/Pages/Surveys/ItemCriteria/ViewItemCriteria";
import AddItemCriteria from "layouts/User/Pages/Surveys/ItemCriteria/AddItemCriteria";
import AddQuestions from "layouts/User/Pages/Surveys/Questions/AddQuestions";
import AddCriterias from "layouts/User/Pages/Surveys/Criterias/AddCriterias";
import AddItems from "layouts/User/Pages/Surveys/Items/AddItems";
import ViewDemografik from "layouts/User/Pages/Surveys/Demografik/ViewDemografik";
import AddDemografik from "layouts/User/Pages/Surveys/Demografik/AddDemografik";
import SurveySettings from "layouts/User/Pages/Surveys/SurveySettings";
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
    layout: "/user",
  },
  {
    path: "/surveys",
    name: "Surveys",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Surveys,
    layout: "/user",
  },
  {
    path: "/pollsters",
    name: "Pollsters",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Pollsters,
    layout: "/user",
  },
  {
    path: "/demografik",
    name: "Demographic",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Demografik,
    layout: "/user",
  },
  {
    path: "/payment/buy/:id",
    name: "Buy Credits",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Buy,
    layout: "/user",
    invisible: true,
  },
  {
    path: "/payment/callback",
    name: "Payment CallBack",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: CallBack,
    layout: "/user",
    invisible: true,
  },
  {
    path: "/payment",
    name: "Payment",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Payment,
    layout: "/user",
  },

  {
    path: "/create/demografik",
    name: "Create Demographic",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: CreateDemografik,
    layout: "/user",
    invisible: true,
  },
  {
    path: "/edit/demografik/:id",
    name: "Edit Demographic",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: EditDemografik,
    layout: "/user",
    invisible: true,
  },
  {
    path: "/pollstergroups",
    name: "Pollster Groups",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: PollsterGroups,
    layout: "/user",
  },
  {
    path: "/create/pollstergroup",
    name: "Create Pollster Group",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: CreatePollsterGroup,
    layout: "/user",
    invisible: true,
  },
  {
    path: "/edit/pollstergroup/:id",
    name: "Edit Pollster Group",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: EditPollsterGroup,
    layout: "/user",
    invisible: true,
  },
  {
    path: "/create/pollster",
    name: "Create Pollster",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: CreatePollster,
    layout: "/user",
    invisible: true,
  },
  {
    path: "/edit/pollster/:id",
    name: "Edit Pollster",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: EditPollster,
    layout: "/user",
    invisible: true,
  },
  {
    path: "/edit/survey/:id",
    name: "Edit Survey",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: EditSurvey,
    layout: "/user",
    invisible: true,
  },
  {
    path: "/create/survey",
    name: "Create Survey",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: CreateSurvey,
    layout: "/user",
    invisible: true,
  },
  {
    path: "/settings/survey/:id/viewCriterias",
    name: "Add Items",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: ViewCriterias,
    layout: "/user",
    invisible: true,
  },
  {
    path: "/settings/survey/:id/editParticipants",
    name: "Add Items",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: EditParticipants,
    layout: "/user",
    invisible: true,
  },
  {
    path: "/settings/survey/:id/viewParticipants",
    name: "Add Items",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: ViewParticipants,
    layout: "/user",
    invisible: true,
  },

  {
    path: "/settings/survey/:id/viewQuestions",
    name: "Add Items",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: ViewQuestions,
    layout: "/user",
    invisible: true,
  },
  {
    path: "/settings/survey/:id/viewItems",
    name: "Add Items",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: ViewItems,
    layout: "/user",
    invisible: true,
  },
  {
    path: "/settings/survey/:id/viewItemCriterias",
    name: "Add Items",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: ViewItemCriteria,
    layout: "/user",
    invisible: true,
  },
  {
    path: "/settings/survey/:id/addItemCriteria",
    name: "Add Items",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: AddItemCriteria,
    layout: "/user",
    invisible: true,
  },
  {
    path: "/settings/survey/:id/addQuestions",
    name: "Add Items",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: AddQuestions,
    layout: "/user",
    invisible: true,
  },

  {
    path: "/settings/survey/:id/addCriterias",
    name: "Add Items",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: AddCriterias,
    layout: "/user",
    invisible: true,
  },
  {
    path: "/settings/survey/:id/addItems",
    name: "Add Items",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: AddItems,
    layout: "/user",
    invisible: true,
  },
  {
    path: "/settings/survey/:id/viewDemografik",
    name: "Add Items",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: ViewDemografik,
    layout: "/user",
    invisible: true,
  },
  {
    path: "/settings/survey/:id/addDemografik",
    name: "Add Items",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: AddDemografik,
    layout: "/user",
    invisible: true,
  },

  {
    path: "/settings/survey/:id",
    name: "Survey Settings",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: SurveySettings,
    layout: "/user",
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
        path: "/buy-credits",
        name: "Buy Credits",
        rtlName: "خرائط جوجل",
        mini: "BC",
        rtlMini: "زم",
        component: BuyCredits,
        layout: "/user",
      },
      {
        path: "/fill-profile",
        name: "Fill Profile",
        rtlName: "خرائط جوجل",
        mini: "FP",
        rtlMini: "زم",
        component: FillProfile,
        layout: "/user",
      },
      {
        path: "/password-actions",
        name: "Password Actions",
        rtlName: "خرائط جوجل",
        mini: "PA",
        rtlMini: "زم",
        component: PasswordActions,
        layout: "/user",
      },
    ],
  },
];
