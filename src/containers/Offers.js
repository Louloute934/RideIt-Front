import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

import axios from "axios";

const Offers = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [locality, setLocality] = useState("");
  const [type, setType] = useState("");
  const [priceMax, setPriceMax] = useState("");

  const location = useLocation();
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

  useEffect(() => {
    const getData = async () => {
      try {
        if (location.state) {
          const response = await axios.get(
            `https://ride-it-back.herokuapp.com/offers?page=1&title=${location.state.title}&location=${location.state.locality}&type=${location.state.type}&priceMax=${location.state.priceMax}`
          );
          console.log(response.data);
          setData(response.data);
          setIsLoading(false);
          window.scrollTo(0, 0);
        } else {
          const response = await axios.get(
            `https://ride-it-back.herokuapp.com/offers?page=1`
          );
          console.log(response.data);
          setData(response.data);
          setIsLoading(false);
          window.scrollTo(0, 0);
        }
      } catch (error) {
        console.log({ error: error.message });
      }
    };
    getData();
  }, [location]);

  return isLoading ? (
    <div className="loadingPage">
      <Loader type="BallTriangle" color="#E60013" height={150} width={150} />
    </div>
  ) : (
    <div className="OfferPage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
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
            <option value={10000000}>plus de 300 €</option>
          </select>
          <button type="submit">Rechercher</button>
        </form>
        <motion.div
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.9 }}
          className="allModelsSearch"
          onClick={() => {
            history.push("/offers");
          }}
        >
          <h2>Accéder à toutes les offres</h2>
        </motion.div>
      </div>
      <div className="offerSelection">
        <div className="correspondantoffers">
          <div className="OfferCount">
            <h1>{data.count} Annonces trouvées </h1>
          </div>
          {data.offers.map((offer, index) => {
            return (
              <div
                onClick={() => {
                  const id = offer._id;
                  history.push(`/offer/${id}`);
                }}
                key={index}
                className="oneOffer"
              >
                {offer.picture && (
                  <div>
                    <img src={offer.picture.secure_url} alt="pictureAnnonce" />
                  </div>
                )}

                <div className="secondPartOneOffer">
                  <div>
                    <h2>{offer.title}</h2>
                    <h2>Prix par jour : {offer.price} €</h2>
                  </div>
                  <div className="inlineSpecSection">
                    <div className="inlineSpec">
                      <h3>Année: {offer.year}</h3>
                    </div>
                    <div className="inlineSpec">
                      <h3>Type: {offer.type}</h3>
                    </div>
                  </div>
                  <div className="oneOfferLocation">
                    <h3>Département: {offer.location}</h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Offers;
