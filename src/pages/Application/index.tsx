import React, { Fragment } from "react";
import Nav from "../../components/Navigation";
import App from "../../components/App";

export default () => (
  <Fragment>
    <div
      style={{ backgroundColor: "#6c63ff", boxShadow: "2px 2px 10px #636cff" }}
    >
      <div className="container">
        <Nav />
      </div>
    </div>
    <div className="container">
      <App />
    </div>
  </Fragment>
);
