import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { motion, useAnimation } from "framer-motion";

const Useroffers = ({ token }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://ride-it-back.herokuapp.com/user/offers",
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log({ error: error.message });
      }
    };
    getData();
  }, []);

  return isLoading ? (
    <div className="loadingPage">
      <Loader type="BallTriangle" color="#E60013" height={150} width={150} />
    </div>
  ) : (
    <div className="userOffersPage">
      <div className="offersList">
        <div>
          <h1>Mes Annonces</h1>
        </div>
        {data.offers.map((offer, index) => {
          return (
            <div key={index} className="oneOfferFromList">
              {offer.picture && <img src={offer.picture.secure_url} alt="" />}
              <h2>Titre: {offer.title}</h2>
              <h2>Prix: {offer.price} €</h2>
              <div className="buttonToGetToOffer">
                <motion.h3
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    const id = offer._id;
                    history.push(`/offer/${id}`);
                  }}
                >
                  Accèder à l'annonce
                </motion.h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Useroffers;
