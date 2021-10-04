import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import axios from "axios";
import Loader from "react-loader-spinner";

import Carousel from "react-grid-carousel";

import { motion, useAnimation } from "framer-motion";

const Offer = ({ token }) => {
  const { id } = useParams();
  const history = useHistory();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://ride-it-back.herokuapp.com/offer/${id}`
      );
      console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <div className="loadingPage">
      <Loader type="BallTriangle" color="#E60013" height={150} width={150} />
    </div>
  ) : (
    <div className="oneOfferPage">
      <div className="entireOffer">
        <div className="firstPartOfOneOfferOneOfferPage">
          <div className="picturesOneOffer">
            <Carousel showDots={true} loop={true} autoplay={2000}>
              {data.picture && (
                <Carousel.Item>
                  <img src={data.picture.secure_url} alt="firstPicture" />
                </Carousel.Item>
              )}
              {data.secondPicture && (
                <Carousel.Item>
                  <img src={data.secondPicture.secure_url} alt="firstPicture" />
                </Carousel.Item>
              )}
              {data.thirdPicture && (
                <Carousel.Item>
                  <img src={data.thirdPicture.secure_url} alt="firstPicture" />
                </Carousel.Item>
              )}
            </Carousel>
          </div>

          <div className="titleOfOneOffer">
            <h1>{data.title}</h1>
          </div>
          <div className="locationAndMiles">
            <h3>
              Département {data.location} - {data.miles} km
            </h3>
          </div>
          <div className="priceByDay">
            <h1>Prix / Jour:</h1>
            <h1>{data.price} € </h1>
          </div>
        </div>
        <div className="secondPartOneOfferOneOfferPage">
          <div className="newCriteriasOneOffer">
            <h2>Marque : </h2>
            <h2>{data.brand}</h2>
          </div>
          <div className="newCriteriasOneOffer">
            <h2>Modèle : </h2>
            <h2>{data.model}</h2>
          </div>
          <div className="newCriteriasOneOffer">
            <h2>Année : </h2>
            <h2>{data.year}</h2>
          </div>
          <div className="newCriteriasOneOffer">
            <h2>Kilométrage : </h2>
            <h2>{data.miles} km</h2>
          </div>
          <div className="newCriteriasOneOffer">
            <h2>Type : </h2>
            {data.type === "custom" && <h2>Custom / Vintage</h2>}
            {data.type === "roadster" && <h2>Roaster</h2>}
            {data.type === "sportive" && <h2>Sportive</h2>}
            {data.type === "trail" && <h2>Trail / Voyageuse</h2>}
          </div>
        </div>
        <div className="descriptionPartOneOffer">
          <h1>Description : </h1>
          <h2>{data.description}</h2>
        </div>
        {token === data.owner.token ? (
          <div className="contactPartOneOffer">
            <div>
              <motion.h2
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() =>
                  history.push({
                    pathname: "/update",
                    state: {
                      data: data,
                    },
                  })
                }
              >
                Gérez ou Modifiez votre Annonce
              </motion.h2>
            </div>
            <div className="suppressOfferDivision">
              <h4
                onClick={() => {
                  history.push({
                    pathname: "/delete",
                    state: {
                      data: data,
                    },
                  });
                }}
              >
                Supprimez votre annonce
              </h4>
            </div>
          </div>
        ) : (
          <div className="contactPartOneOffer">
            <motion.h2
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() =>
                history.push({
                  pathname: "/contact",
                  state: {
                    owner: data.owner,
                  },
                })
              }
            >
              Contactez {data.owner.username} pour louer ce véhicule
            </motion.h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Offer;
