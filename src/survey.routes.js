import FillSurvey from "layouts/Survey/Fill/FillSurvey";
import UserResults from "layouts/Survey/Results/UserResults";

export default [
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
    path: "/:id/:verificationCode",
    name: "FillSurvey",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: FillSurvey,
    layout: "/survey",
    invisible: true,
  },
  
];
