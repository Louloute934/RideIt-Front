import { useState } from "react";
import axios from "axios";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router-dom";

const Signup = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username && email && password) {
      try {
        const response = await axios.post(
          "https://ride-it-back.herokuapp.com/user/signup",
          {
            username: username,
            email: email,
            password: password,
          }
        );
        if (response.data.token) {
          setUser(response.data.token);
          history.push("/");
        }
      } catch (error) {
        console.log({ message: error.message });
        setErrorMessage("Un compte Existe déjà avec cet Email");
      }
    } else {
      setErrorMessage("Tous les champs de saisie doivent être remplis");
    }
  };

  return (
    <div className="signupPage">
      <div className="formArea">
        <div className="signupTitle">
          <h1>Création de compte</h1>
        </div>
        <form className="formSignup" onSubmit={handleSubmit}>
          <div className="logdiv">
            <h2>Nom d'utilisateur</h2>
            <input
              type="text"
              placeholder="username"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
          </div>

          <div className="logdiv">
            <h2>Votre Email</h2>
            <input
              type="email"
              placeholder="email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>
          <div className="logdiv">
            <h2>Votre mot de passe</h2>
            <input
              type="password"
              placeholder="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>
          <div className="ifnot">
            <p className="errorMessage">{errorMessage}</p>
          </div>

          <div className="submitSignup">
            <button type="submit">Créer un compte</button>
          </div>
        </form>
        <div className="ifnot">
          <p
            className="ifbutton"
            onClick={() => {
              history.push("/login");
            }}
          >
            Si vous avez déjà un compte c'est par ici !
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
