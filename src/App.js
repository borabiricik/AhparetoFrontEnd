import React from "react";
import AuthLayout from "layouts/Auth/Auth.js";
import AdminLayout from "layouts/Admin/Admin.js";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "assets/css/nucleo-icons.css";
import "react-notification-alert/dist/animate.css";
import "assets/scss/black-dashboard-pro-react.scss?v=1.2.0";
import "assets/demo/demo.css";

const App = () => {
  return (
    <Switch>
      <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      {/* {
        localStorage.getItem("token") == null ? <Redirect from="/" to="/auth/login" /> : <Redirect from="/" to="/admin/dashboard" />
      } */}
    </Switch>
  );
};

export default App;
