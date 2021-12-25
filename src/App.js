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

const App = () => {
  var date = new Date(); // Or the date you'd like converted.
  var isoDateTime = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  ).toISOString();
  const history = useHistory()
  return (
    <Switch>
      <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
      <Route
        path="/admin"
        render={(props) => {
          if (
            localStorage.getItem("token") &&
            localStorage.getItem("role") == "admin"
          ) {
            return <AdminLayout {...props} />;
          } else {
            return <UserLayout {...props} />;
          }
        }}
      />
      <Route
        path="/user"
        render={(props) => {
          if (
            localStorage.getItem("token") &&
            localStorage.getItem("role") == "user"
          ) {
            return <UserLayout {...props} />;
          } else {
            return <Redirect to={"/auth/login"} />;
          }
        }}
      />
      {localStorage.getItem("token") == null &&
      localStorage.getItem("role") == "user" ? (
        <Redirect from="/" to="/auth/login" />
      ) : (
        <Redirect from="/" to="/user/dashboard" />
      )}
      {localStorage.getItem("token") == null &&
      localStorage.getItem("role") == "admin" ? (
        <Redirect from="/" to="/auth/login" />
      ) : (
        <Redirect from="/" to="/admin/dashboard" />
      )}
      {localStorage.getItem("token") &&
      localStorage.getItem("expiration") < isoDateTime ? history.replace("/auth/login") : null}
    </Switch>
  );
};

export default App;
