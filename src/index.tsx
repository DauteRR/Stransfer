import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./components/App";
import LandingPage from "./components/LandingPage";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const Router = (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route path="/app" component={App} />
      <Route component={() => <div>Error</div>} />
    </Switch>
  </BrowserRouter>
);

ReactDOM.render(Router, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
