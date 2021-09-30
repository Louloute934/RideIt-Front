import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

import axios from "axios";

//Img
import sport from "../Images/Sportive.png";
import roadster from "../Images/Roadster.png";
import trail from "../Images/Trail.png";
import custom from "../Images/Custom.png";
import bcg from "../Images/bcg.mp4";

const Homepage = () => {
  const [title, setTitle] = useState("");
  const [locality, setLocality] = useState("");
  const [type, setType] = useState("");
  const [priceMax, setPriceMax] = useState("");

  const controls = useAnimation();

  const { ref, inView, entry } = useInView();
  console.log(inView);
  if (inView) {
    controls.start({ x: 0, transition: { delay: 0.3, duration: 0.5 } });
  }

  const firstPartVariant = {
    hidden: { x: "-100vw" },
    visible: {
      x: 0,
      transition: { delay: 0.3, when: "beforeChildren", duration: 0.5 },
    },
  };
  const formVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } },
  };

  const promotionVariant = {
    hidden: { x: "200vw" },
    visible: {
      x: 0,
      transition: { delay: 0.5, when: "beforeChildren", duration: 0.5 },
    },
  };

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    history.push({
      pathname: "/offers",
      state: {
        title: title,
        locality: locality,
        type: type,
        priceMax: priceMax,
      },
    });
  };

  return (
    <div className="homePage">
      <div className="homeFirstPart">
        <div className="videoWrap">
          <video autoPlay loop muted src={bcg} className="bgVideo"></video>
        </div>
        <div className="overlay"></div>
        <motion.div
          variants={firstPartVariant}
          animate="visible"
          initial="hidden"
          className="searchBar"
        >
          <div className="bigTitle">
            <h1>PRENDS LA ROUTE</h1>
          </div>
          <motion.form variants={formVariant} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Modèle"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />

            <select
              onChange={(event) => {
                setLocality(event.target.value);
              }}
              className="locationSearch"
              placeholder="Département"
            >
              <option value="">Département</option>
              <option value="75">75 Paris</option>
              <option value="77">77 Seine-et-Marne</option>
              <option value="78">78 Yvelines</option>
              <option value="91">91 Essonne</option>
              <option value="92">92 Hauts-de-Seine</option>
              <option value="93">93 Seine-Saint-Denis</option>
              <option value="94">94 Val-de-Marne</option>
              <option value="95">95 Val-d'oise</option>
            </select>
            <select
              onChange={(event) => {
                setType(event.target.value);
              }}
              className="typeSearch"
            >
              <option value="">Type</option>
              <option value="roadster">Roadsters</option>
              <option value="sportive">Sportives</option>
              <option value="trail">Trails / Routières</option>
              <option value="custom">Customs / Vintages</option>
            </select>
            <select
              onChange={(event) => {
                setPriceMax(event.target.value);
              }}
              className="priceSearch"
            >
              <option value="">Prix / Jour</option>
              <option value={100}>0 à 100 €</option>
              <option value={300}>100 à 300 €</option>
              <option value={100}>plus de 300 €</option>
            </select>
            <button type="submit">Rechercher</button>
          </motion.form>
          <motion.div
            variants={formVariant}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            className="allModelsSearch"
            onClick={() => {
              history.push("/offers");
            }}
          >
            <h2>Accéder à toutes les offres</h2>
          </motion.div>
          <motion.div variants={formVariant} className="socialMedias">
            <FontAwesomeIcon
              className="socialMediasIcons"
              icon={["fab", "facebook"]}
            />
            <FontAwesomeIcon
              className="socialMediasIcons"
              icon={["fab", "youtube"]}
            />
            <FontAwesomeIcon
              className="socialMediasIcons"
              icon={["fab", "twitter"]}
            />
          </motion.div>
        </motion.div>
      </div>

      <div className="homeSecondpart">
        <svg
          style={{ position: "absolute", zIndex: 0 }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#000000"
            fillOpacity="1"
            d="M0,32L34.3,26.7C68.6,21,137,11,206,5.3C274.3,0,343,0,411,42.7C480,85,549,171,617,197.3C685.7,224,754,192,823,154.7C891.4,117,960,75,1029,64C1097.1,53,1166,75,1234,74.7C1302.9,75,1371,53,1406,42.7L1440,32L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
          ></path>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#FF0000"
            fillOpacity="1"
            d="M0,256L34.3,224C68.6,192,137,128,206,117.3C274.3,107,343,149,411,160C480,171,549,149,617,149.3C685.7,149,754,171,823,202.7C891.4,235,960,277,1029,250.7C1097.1,224,1166,128,1234,74.7C1302.9,21,1371,11,1406,5.3L1440,0L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
          ></path>
        </svg>
        <motion.div
          initial={{ x: "-200vw" }}
          animate={controls}
          className="promotionPart"
        >
          <div className="argumentsPromo">
            <h1>
              Une plateforme simple et sécurisée pour une location réussie
            </h1>
            <p>
              Entre le nom du modèle de ta future bécane, la ville de tes rêves
              et pars l'esprit libre pour une nouvelle aventure !
            </p>
          </div>
          <div className="argumentsPromo">
            <h1>Nombreux modèles disponibles à la location</h1>
            <p>
              Pour sortir avec style dans ta ville, chiller avec madame lors
              d'une soirée romantique, te lancer dans un road trip à sensation
              au coeur des montagnes du Jura... LA moto que tu recherches est
              sur RIDE-IT !
            </p>
          </div>
        </motion.div>

        <svg
          ref={ref}
          style={{ backgroundAttachment: "fixed" }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#FF0000"
            fillOpacity="1"
            d="M0,256L34.3,224C68.6,192,137,128,206,117.3C274.3,107,343,149,411,160C480,171,549,149,617,149.3C685.7,149,754,171,823,202.7C891.4,235,960,277,1029,250.7C1097.1,224,1166,128,1234,74.7C1302.9,21,1371,11,1406,5.3L1440,0L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
          ></path>
          <svg
            style={{ position: "absolute", zIndex: -1 }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="#000000"
              fillOpacity="1"
              d="M0,32L34.3,26.7C68.6,21,137,11,206,5.3C274.3,0,343,0,411,42.7C480,85,549,171,617,197.3C685.7,224,754,192,823,154.7C891.4,117,960,75,1029,64C1097.1,53,1166,75,1234,74.7C1302.9,75,1371,53,1406,42.7L1440,32L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
            ></path>
          </svg>
        </svg>
      </div>
      <div className="thirdPartHome">
        <div className="lastPartHome">
          <motion.h1
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.1 }}
            onClick={() => {
              history.push("/offers");
            }}
          >
            PRENDS LA ROUTE MAINTENANT !
          </motion.h1>
        </div>
      </div>
      <div className="fourthParthome">
        <div className="bikeCategories">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              history.push({
                pathname: "/offers",
                state: {
                  title: title,
                  locality: locality,
                  type: "roadster",
                  priceMax: priceMax,
                },
              });
            }}
            className="bikecat"
          >
            <h1>Roasters</h1>
            <img src={roadster} alt="roadster" />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              history.push({
                pathname: "/offers",
                state: {
                  title: title,
                  locality: locality,
                  type: "sportive",
                  priceMax: priceMax,
                },
              });
            }}
            className="bikecat"
          >
            <h1>Sportives</h1>
            <img src={sport} alt="sporty" />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              history.push({
                pathname: "/offers",
                state: {
                  title: title,
                  locality: locality,
                  type: "trail",
                  priceMax: priceMax,
                },
              });
            }}
            className="bikecat"
          >
            <h1>Trails / Routières</h1>
            <img src={trail} alt="trail" />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              history.push({
                pathname: "/offers",
                state: {
                  title: title,
                  locality: locality,
                  type: "custom",
                  priceMax: priceMax,
                },
              });
            }}
            className="bikecat"
          >
            <h1>Vintage / Custom</h1>
            <img src={custom} alt="Custom" />
          </motion.div>
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#000000"
            fillOpacity="1"
            d="M0,0L48,5.3C96,11,192,21,288,26.7C384,32,480,32,576,58.7C672,85,768,139,864,165.3C960,192,1056,192,1152,213.3C1248,235,1344,277,1392,298.7L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};
export default Homepage;
