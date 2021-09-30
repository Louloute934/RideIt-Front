import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

import axios from "axios";

const Delete = ({ token }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [_id, set_id] = useState("");

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      try {
        const id = location.state.data._id;
        const response = await axios.get(
          `https://ride-it-back.herokuapp.com/offer/${id}`
        );
        console.log(response.data);
        setData(response.data);
        set_id(response.data._id);
        setIsLoading(false);
      } catch (error) {
        console.log({ error: error.message });
      }
    };
    getData();
  }, []);

  const handleClick = async () => {
    try {
      const formData = new FormData();
      formData.append("id", _id);
      const response = await axios.post(
        "https://ride-it-back.herokuapp.com/offer/delete",
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);

      history.push("/deletesucess");
    } catch (error) {
      console.log({ error: error.message });
    }
  };

  return isLoading ? (
    <div className="loadingPage">
      <Loader type="BallTriangle" color="#E60013" height={150} width={150} />
    </div>
  ) : (
    <div className="deletePage">
      <div className="deleteParts">
        <div className="deleteConditions">
          <h1>Supression de Votre Annonce</h1>
          <p>
            La supression de votre annonce est définitive, vous ne pourrez plus
            être contacté par d'autres utilisateurs.
          </p>
        </div>
        <div className="deleteButtons">
          <h1 onClick={handleClick}>SUPPRIMER MON ANNONCE</h1>
          <h2
            onClick={() => {
              const id = _id;
              history.push(`/offer/${id}`);
            }}
          >
            Revenir en arrière
          </h2>
        </div>
      </div>
    </div>
  );
};
export default Delete;
