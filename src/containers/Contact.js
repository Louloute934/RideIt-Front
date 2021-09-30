import React, { useState, useEffect } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";

import "react-widgets/styles.css";
import DatePicker from "react-widgets/DatePicker";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

import axios from "axios";

const Contact = ({ token }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [sender, setSender] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [senderText, setSenderText] = useState("");
  const [beginDate, setBeginDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [errorMessage, setErrorMessage] = useState("");

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      try {
        console.log(location.state);
        setData(location.state);
        setIsLoading(false);
      } catch (error) {
        console.log({ error: error.message });
      }
    };
    getData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (sender && senderEmail && beginDate && endDate) {
      try {
        const data = {
          sender: sender,
          senderEmail: senderEmail,
          beginDate: beginDate,
          endDate: endDate,
          senderText: senderText,
        };
        const response = await axios.post(
          "https://ride-it-back.herokuapp.com/user/contact",
          data,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        history.push("/");
      } catch (error) {
        console.log({ error: error.message });
      }
    } else {
      setErrorMessage(
        "Veuilez renseigner votre Email ainsi que vos Noms et Prénoms"
      );
    }
  };

  return isLoading ? (
    <div className="loadingPage">
      <Loader type="BallTriangle" color="#E60013" height={150} width={150} />
    </div>
  ) : (
    <div className="contactPage">
      <div className="contactForm">
        <div className="contactFormTitle">
          <h1>Formulaire de contact </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="infoContact">
            <h1>Votre Nom et Prénom</h1>
            <input
              type="text"
              placeholder="Jean Dupont"
              onChange={(event) => {
                setSender(event.target.value);
              }}
            />
          </div>
          <div className="infoContact">
            <h1>Votre Email</h1>
            <input
              onChange={(event) => {
                setSenderEmail(event.target.value);
              }}
              type="email"
              placeholder="jeandupont@yahoo.fr"
            />
          </div>
          <div className="datesContactForm">
            <h1>Début de la Location</h1>
            <DatePicker
              placeholder="jj/mm/aa"
              defaultValue={new Date()}
              min={new Date()}
              onChange={(value) => {
                setBeginDate(value);
              }}
              className="datePicker"
            />
          </div>
          <div className="datesContactForm">
            <h1>Fin de la Location</h1>
            <DatePicker
              placeholder="jj/mm/aa"
              defaultValue={new Date()}
              min={new Date()}
              onChange={(value) => {
                setEndDate(value);
              }}
              className="datePicker"
            />
          </div>
          <div className="infoContactTextArea">
            <h1>
              Questions ou Infos pour le propriétaire: {data.owner.username}
            </h1>
            <textarea
              onChange={(event) => {
                setSenderText(event.target.value);
              }}
              placeholder="J'ai une question"
            ></textarea>
          </div>
          <div className="errorContact">
            <h2>{errorMessage}</h2>
          </div>
          <div className="submissionContactForm">
            <button type="submit">Envoyer votre demande de location</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Contact;
