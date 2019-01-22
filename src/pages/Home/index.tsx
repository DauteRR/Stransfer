import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Nav from "../../components/Navigation";
import "./LandingPage.scss";
import MakingArtImg from "./img/undraw_making_art_759c.svg";
import UploadingImg from "./img/undraw_image_upload_wqh3.svg";
import SafeImg from "./img/undraw_safe_bnk7.svg";
import AiImg from "./img/undraw_artificial_intelligence_upfn.svg";

export default () => (
  <Fragment>
    <header className="header">
      <div className="container">
        <Nav />
        <span aria-hidden="true" className="header__down-arrow-container">
          <span className="down-arrow-container__arrow">⌄</span>
        </span>
      </div>
    </header>
    <main>
      <section id="about-section" className="container section">
        <h2 className="centered-message">What is Stransfer?</h2>
        <p className="centered-message">
          Stransfer is a web application that lets you take pictures and apply a
          style to them. It was made by students as part of a college project
          using the{" "}
          <a
            className="inline-link"
            href="https://ml5js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            ml5js
          </a>{" "}
          library.
        </p>
        <ul className="features">
          <li className="features__card">
            <p className="card__message">
              You can take photos within the app and apply astonishing styles to
              them
            </p>
            <img
              className="card_img"
              src={MakingArtImg}
              alt="Cartoon person painting herself in a canvas with a different style"
            />
          </li>
          {/* <li className="features__card">
            <p className="card__message">
              You can also upload images from your device
            </p>
            <img
              className="card_img"
              src={UploadingImg}
              alt="Cartoon person uploading physical files to a cardboard imitating the browser"
            />
          </li> */}
          <li className="features__card">
            <p className="card__message">
              And everything is done in your browser, your photos never leave
              your device
            </p>
            <img
              className="card_img"
              src={SafeImg}
              alt="Cartoon image of three browser windows secured with a lock"
            />
          </li>
        </ul>
      </section>
      <section id="about-us-section" className="container section">
        <h2 className="centered-message">Who are we?</h2>
        <ul className="our-information">
          <li className="our-information__info-container">
            <img
              className="info-container__img"
              src={AiImg}
              alt="Cartoon robot"
            />
            <p className="info-container__info">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequatur placeat assumenda quibusdam hic aliquid culpa quae
              odit exercitationem velit dicta alias accusantium, laborum porro
              veniam molestiae optio nisi, obcaecati eligendi?
            </p>
          </li>
          <li className="our-information__info-container">
            <img
              className="info-container__img"
              src={AiImg}
              alt="Cartoon robot"
            />
            <p className="info-container__info">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequatur placeat assumenda quibusdam hic aliquid culpa quae
              odit exercitationem velit dicta alias accusantium, laborum porro
              veniam molestiae optio nisi, obcaecati eligendi?
            </p>
          </li>
        </ul>
        <p className="centered-message">
          We are students at{" "}
          <a
            className="inline-link"
            href="https://www.ull.es/en/"
            target="_blank"
            rel="noopener noreferrer"
          >
            ULL
          </a>{" "}
          where this app was born as part of a project for the{" "}
          <q>Intelligent Systems</q> subject. We decided to do a web application
          so anyone can enjoy it, hope you like it 😊
        </p>
      </section>
      <section id="go-to-app-section" className="container section">
        <Link className="go-to-app-link" to="/app">
          Go to the application
        </Link>
      </section>
    </main>
  </Fragment>
);
