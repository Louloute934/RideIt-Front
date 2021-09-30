import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

import axios from "axios";

const Update = ({ token }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [_id, set_id] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("");
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

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      try {
        const id = location.state.data._id;
        const response = await axios.get(
          `https://ride-it-back.herokuapp.com/offer/${id}`
        );
        //console.log(response.data);

        setData(response.data);
        set_id(response.data._id);
        setTitle(response.data.title);

        setDescription(response.data.description);
        setDepartment(response.data.location);
        setPrice(response.data.price);
        setType(response.data.type);
        setMiles(response.data.miles);
        setYear(response.data.year);
        setModel(response.data.model);
        setBrand(response.data.brand);
        if (response.data.picture) {
          setPicture(response.data.picture);
        }
        if (response.data.secondPicture) {
          setSecondPicture(response.data.secondPicture);
        }
        if (response.data.thirdPicture) {
          setThirdPicture(response.data.thirdPicture);
        }
        setIsLoading(false);
      } catch (error) {
        console.log({ error: error.message });
      }
    };
    getData();
  }, [location]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      _id &&
      title &&
      description &&
      department &&
      price &&
      type &&
      miles &&
      year &&
      brand &&
      model
    ) {
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append("id", _id);
        formData.append("picture", picture);
        formData.append("secondPicture", secondPicture);
        formData.append("thirdPicture", thirdPicture);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("type", type);
        formData.append("location", department);
        formData.append("miles", miles);
        formData.append("year", year);
        formData.append("brand", brand);
        formData.append("model", model);

        const response = await axios.post(
          "https://ride-it-back.herokuapp.com/offer/update",
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
      <div className="updateAnnonce">
        <h1>Modifiez votre Annonce</h1>
      </div>
      <div className="updateForm">
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
                  value={brand}
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
                  value={model}
                />
              </div>
              <div className="SpecOfBike">
                <h3>Année</h3>
                <input
                  onChange={(event) => {
                    setYear(event.target.value);
                  }}
                  placeholder="2017"
                  type="number"
                  min="1900"
                  max="2099"
                  value={year}
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
                  value={miles}
                />
              </div>
              <div className="SpecOfBike">
                <h3>Type</h3>
                <select
                  onChange={(event) => {
                    setType(event.target.value);
                  }}
                  value={type}
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
          <div className="updateFormSecondPart">
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
                  value={title}
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
                  value={description}
                />
              </div>
              <div className="locationAnnonce">
                <h3>Votre Département</h3>
                <select
                  onChange={(event) => {
                    setDepartment(event.target.value);
                  }}
                  className="locationSearch"
                  placeholder="Département"
                  value={department}
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
                  min="0"
                  max="5000"
                  placeholder="120 €"
                  value={price}
                />
              </div>
              {data.picture && (
                <div className="updatePictureAnnonce">
                  <h3>Photo 1 Actuelle</h3>
                  <img src={data.picture.secure_url} alt="" />
                </div>
              )}
              <div className="updatePictureAnnonce">
                <h3>Nouvelle Photo 1</h3>
                <input
                  type="file"
                  placeholder="votre photo"
                  onChange={(event) => {
                    setPicture(event.target.files[0]);
                  }}
                />
              </div>
              {data.secondPicture && (
                <div className="updatePictureAnnonce">
                  <h3>Photo 2 Actuelle</h3>
                  <img src={data.secondPicture.secure_url} alt="" />
                </div>
              )}
              <div className="updatePictureAnnonce">
                <h3>Nouvelle Photo 2</h3>
                <input
                  type="file"
                  placeholder="votre photo"
                  onChange={(event) => {
                    setSecondPicture(event.target.files[0]);
                  }}
                />
              </div>
              {data.thirdPicture && (
                <div className="updatePictureAnnonce">
                  <h3>Photo 3 Actuelle</h3>
                  <img src={data.thirdPicture.secure_url} alt="" />
                </div>
              )}
              <div className="updatePictureAnnonce">
                <h3>Nouvelle Photo 3</h3>
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
              <h1>3-Modifiez Votre Annonce</h1>
            </div>
            <div className="errorSection">
              <p className="errorMessagePublish">{errorMessage}</p>
            </div>
            <div className="submitOrError">
              <button type="submit">Modifiez Votre Annonce</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Update;
