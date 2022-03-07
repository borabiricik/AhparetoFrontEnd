import FillSurvey from "layouts/Survey/Fill/FillSurvey";
import SurveyIntroduction from "layouts/Survey/Fill/SurveyIntroduction";
import UserResults from "layouts/Survey/Results/UserResults";

export default [
  {
    path: "/introduction/:id/:verificationCode",
    name: "FillSurvey",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: SurveyIntroduction,
    layout: "/survey",
    invisible: true,
  },

  {
    path: "/results/:id/:verificationCode",
    name: "FillSurvey",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: UserResults,
    layout: "/survey",
    invisible: true,
  },
  {
    path: "/fill/:id/:verificationCode",
    name: "FillSurvey",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: FillSurvey,
    layout: "/survey",
    invisible: true,
  },
];
