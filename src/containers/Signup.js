import { useState } from "react";
import axios from "axios";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";

const Signup = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmPassWord] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (username && email && password && confirmedPassword) {
      if (password === confirmedPassword) {
        try {
          setIsLoading(true);

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
          setIsLoading(false);
        } catch (error) {
          console.log({ message: error.message });
          setErrorMessage("Un compte Existe déjà avec cet Email");
        }
      } else {
        setErrorMessage("Les Mots de Passe doivent être identiques");
      }
    } else {
      setErrorMessage("Tous les champs de saisie doivent être remplis");
    }
  };

  return isLoading ? (
    <div className="loadingPage">
      <Loader type="BallTriangle" color="#E60013" height={150} width={150} />
    </div>
  ) : (
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
              placeholder="Votre mot de passe"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>
          <div className="logdiv">
            <h2>Confirmez votre mot de passe</h2>
            <input
              type="password"
              placeholder="Votre mot de passe"
              onChange={(event) => {
                setConfirmPassWord(event.target.value);
              }}
            />
          </div>
          <div className="ifnot">
            <p className="errorMessage">{errorMessage}</p>
          </div>

          <div className="submitSignup">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="submit"
            >
              Créer un compte
            </motion.button>
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
