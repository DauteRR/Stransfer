import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import HomePage from "./pages/Home";
import AppPage from "./pages/Application";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const Router = (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/app" component={AppPage} />
      <Route component={() => <div>Error</div>} />
    </Switch>
  </BrowserRouter>
);

ReactDOM.render(Router, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
