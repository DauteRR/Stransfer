import React from "react";
import { HashLink as Link } from "react-router-hash-link";
import "./Navigation.scss";

export default () => (
  <nav className="header__nav">
    <Link to="/">
      <h1 className="nav__logo">Stransfer</h1>
    </Link>
    <div className="collapsable-nav-list">
      <input type="checkbox" id="collapse-nav" hidden />
      <label
        aria-hidden="true"
        className="collapse-nav-list-btn"
        htmlFor="collapse-nav"
      >
        <span /> <span /> <span />
      </label>
      <ul className="nav__nav-list">
        <li className="nav-list__nav-item">
          <Link to="/#about-section">About Stransfer</Link>
        </li>
        <li className="nav-list__nav-item">
          <Link to="/app">App</Link>
        </li>
        <li className="nav-list__nav-item">
          <Link to="/#about-us-section">About Us</Link>
        </li>
        <li className="nav-list__nav-item">
          <a
            href="https://github.com/DauteRR/StyleTransfer"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </li>
      </ul>
    </div>
  </nav>
);
