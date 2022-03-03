import FillSurvey from "layouts/Survey/Fill/FillSurvey";
import Login from "views/pages/Login";

export default [
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
