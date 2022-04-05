import "assets/css/nucleo-icons.css";
import "assets/demo/demo.css";
import "assets/scss/black-dashboard-pro-react.scss?v=1.2.0";
import "react-notification-alert/dist/animate.css";

import jwtDecode from "jwt-decode";
import AdminLayout from "layouts/Admin/Admin.js";
import AuthLayout from "layouts/Auth/Auth.js";
import PollsterLayout from "layouts/Pollster/PollsterLayout";
import SurveyLayout from "layouts/Survey/SurveyLayout";
import UserLayout from "layouts/User/UserLayout";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { getUser } from "stores/Auth/authSlice";
import PollsterLogin from "layouts/Pollster/Auth/Login";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatch(getUser());
  }, [location.pathname]);

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
        path="/pollsterAuth"
        render={(props) => <PollsterLogin {...props} />}
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
