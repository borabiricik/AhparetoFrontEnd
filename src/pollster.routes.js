import Login from "layouts/Pollster/Auth/Login";
import AnswerSurvey from "layouts/Pollster/Survey/AnswerSurvey";
import FillSurvey from "layouts/Pollster/Survey/FillSurvey";
import SurveyDemografik from "layouts/Pollster/Survey/SurveyDemografik";
import SurveyResults from "layouts/Pollster/Survey/SurveyResults";
import Surveys from "layouts/Pollster/Survey/Surveys";
import Dashboard from "views/Dashboard";

export default [
  {
    path: "/login",
    name: "PollsterLogin",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Login,
    layout: "/pollsterAuth",
    invisible: true,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/pollster",
  },
  {
    path: "/survey/demographic/:id",
    name: "Demographic",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: SurveyDemografik,
    layout: "/pollster",
    invisible: true,
  },
  {
    path: "/survey/introduction/:id",
    name: "Answer Survey",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: AnswerSurvey,
    layout: "/pollster",
    invisible: true,
  },
  {
    path: "/survey/fill/:id",
    name: "Fill Survey",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: FillSurvey,
    layout: "/pollster",
    invisible: true,
  },
  {
    path: "/survey/results/:id/:resultId",
    name: "Survey Results",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: SurveyResults,
    layout: "/pollster",
    invisible: true,
  },

  {
    path: "/surveys",
    name: "Surveys",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Surveys,
    layout: "/pollster",
  },
];
