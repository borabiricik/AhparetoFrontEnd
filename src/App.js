import React from "react";
import AuthLayout from "layouts/Auth/Auth.js";
import AdminLayout from "layouts/Admin/Admin.js";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "assets/css/nucleo-icons.css";
import "react-notification-alert/dist/animate.css";
import "assets/scss/black-dashboard-pro-react.scss?v=1.2.0";
import "assets/demo/demo.css";
import UserLayout from "layouts/User/UserLayout";
import { useHistory } from "react-router-dom";
import SurveyLayout from "layouts/Survey/SurveyLayout";
import PollsterLayout from "layouts/Pollster/PollsterLayout";
import jwtDecode from "jwt-decode";

const App = () => {
  var date = new Date();
  const history = useHistory();
  return (
    <Switch>
      <Route path="/auth" render={(props) => <AuthLayout {...props} />} />

      <Route
        path="/user"
        render={(props) => {
          if (jwtDecode(localStorage.getItem("token")).isAdmin === false) {
            return <UserLayout {...props} />;
          } else {
            return <Redirect to={"/auth/login"} />;
          }
        }}
      />

      <Route
        path="/admin"
        render={(props) => {
          if (jwtDecode(localStorage.getItem("token")).isAdmin === true) {
            return <AdminLayout {...props} />;
          } else {
            return <SurveyLayout {...props} />;
          }
        }}
      />

      <Route
        path="/survey"
        render={(props) => {
          return <SurveyLayout {...props} />;
        }}
      />

      <Route
        path="/pollster"
        render={(props) => {
          return <PollsterLayout {...props} />;
        }}
      />

      {/* <Route path={"/survey"} component={Survey} /> */}
    </Switch>
  );
};

export default App;
