import { useState } from "react";
import axios from "axios";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Publish = ({ token }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState();
  const [type, setType] = useState("");
  const [miles, setMiles] = useState("");
  const [year, setYear] = useState("");
  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");
  const [picture, setPicture] = useState();
  const [secondPicture, setSecondPicture] = useState();
  const [thirdPicture, setThirdPicture] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      title &&
      description &&
      location &&
      price &&
      type &&
      miles &&
      year &&
      brand &&
      model &&
      type
    ) {
      setIsLoading(true);
      try {
        const formData = new FormData();

        formData.append("title", title);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("type", type);
        formData.append("location", location);
        formData.append("miles", miles);
        formData.append("year", year);
        formData.append("brand", brand);
        formData.append("model", model);
        formData.append("picture", picture);
        formData.append("secondPicture", secondPicture);
        formData.append("thirdPicture", thirdPicture);

        const response = await axios.post(
          "https://ride-it-back.herokuapp.com/offer/publish",
          formData,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        //console.log(response.data);
        setIsLoading(false);
        const id = response.data._id;
        history.push(`/offer/${id}`);
      } catch (error) {
        console.log({ error: error.message });
      }
    } else {
      setErrorMessage("Tous les champs doivent être remplis ou sélectionnés");
    }
  };

  return isLoading ? (
    <div className="loadingPage">
      <Loader type="BallTriangle" color="#E60013" height={150} width={150} />
    </div>
  ) : (
    <div className="publishPage">
      <div className="publishAnnonce">
        <h1>LOUER VOTRE MOTO</h1>
        <p>
          Renseignez TOUS les critères demandés dans le formulaire afin que
          votre annonce soit publiée. Si quelqu'un souhaite louer votre véhicule
          vous en serez informé directement par mail.
        </p>
      </div>
      <div className="publishForm">
        <form onSubmit={handleSubmit}>
          <div className="formFirstPart">
            <div className="firstPartTitle">
              <h1>1-Votre Moto</h1>
            </div>

            <div className="yourRideSpecs">
              <div className="SpecOfBike">
                <h3>Marque</h3>
                <input
                  onChange={(event) => {
                    setBrand(event.target.value);
                  }}
                  placeholder="Yamaha, Honda..."
                  type="text"
                />
              </div>
              <div className="SpecOfBike">
                <h3>Modèle</h3>
                <input
                  onChange={(event) => {
                    setModel(event.target.value);
                  }}
                  placeholder="XJR1300, IRON883"
                  type="text"
                />
              </div>
              <div className="SpecOfBike">
                <h3>Année</h3>
                <input
                  onChange={(event) => {
                    setYear(event.target.value);
                  }}
                  type="number"
                  min="1900"
                  max="2099"
                  placeholder="2015"
                />
              </div>
              <div className="SpecOfBike">
                <h3>Kilométrage</h3>
                <input
                  onChange={(event) => {
                    setMiles(event.target.value);
                  }}
                  placeholder="32000"
                  type="number"
                  min="0"
                />
              </div>
              <div className="SpecOfBike">
                <h3>Type</h3>
                <select
                  onChange={(event) => {
                    setType(event.target.value);
                  }}
                >
                  <option value="">Type</option>
                  <option value="roadster">Roadster</option>
                  <option value="sportive">Sportive</option>
                  <option value="trail">Trail</option>
                  <option value="custom">Custom / Vintage</option>
                </select>
              </div>
            </div>
          </div>
          <div className="formSecondPart">
            <div className="publishAnnonce">
              <h1>2-Votre Annonce</h1>
            </div>
            <div>
              <div className="titleAnnonce">
                <h3>Titre de l'annonce</h3>
                <input
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                  type="text"
                  placeholder="MT-10 parfait état..."
                />
              </div>
              <div className="descriptionAnnonce">
                <h3>Description de l'annonce</h3>
                <textarea
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                  type="text"
                  placeholder="Description, km ect..."
                />
              </div>
              <div className="locationAnnonce">
                <h3>Votre Département</h3>
                <select
                  onChange={(event) => {
                    setLocation(event.target.value);
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
              </div>

              <div className="priceAnnonce">
                <h3>Votre Prix par jour</h3>
                <input
                  onChange={(event) => {
                    setPrice(event.target.value);
                  }}
                  type="number"
                  placeholder="120 €"
                  min="0"
                  max="5000"
                />
              </div>
              <div className="pictureAnnonce">
                <h3>Photo 1</h3>
                <input
                  type="file"
                  placeholder="votre photo"
                  onChange={(event) => {
                    setPicture(event.target.files[0]);
                  }}
                />
              </div>
              <div className="pictureAnnonce">
                <h3>Photo 2</h3>
                <input
                  type="file"
                  placeholder="votre photo"
                  onChange={(event) => {
                    setSecondPicture(event.target.files[0]);
                  }}
                />
              </div>
              <div className="pictureAnnonce">
                <h3>Photo 3</h3>
                <input
                  type="file"
                  placeholder="votre photo"
                  onChange={(event) => {
                    setThirdPicture(event.target.files[0]);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="submitYourAnnonce">
            <div className="publishAnnonce">
              <h1>3-Publiez Votre Annonce</h1>
            </div>
            <div className="errorSection">
              <p className="errorMessagePublish">{errorMessage}</p>
            </div>
            <div className="submitOrError">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="submit"
              >
                Publiez Votre Annonce
              </motion.button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Publish;
