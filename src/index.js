import React from "react";
import ReactDOM from "react-dom";
import App from "App";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import { Provider } from "react-redux";
import stores from "stores";
import { HashRouter } from "react-router-dom";


ReactDOM.render(
  <Provider store={stores}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
