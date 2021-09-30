import { useState } from "react";
import axios from "axios";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password && email) {
      try {
        const response = await axios.post(
          "https://ride-it-back.herokuapp.com/user/login",
          {
            email: email,
            password: password,
          }
        );
        console.log(response.data);
        if (response.data.token) {
          setUser(response.data.token);

          history.push("/");
        } else {
          setErrorMessage("An error occured please try again");
        }
      } catch (error) {
        console.log({ message: error.message });
        if (error.message === "Request failed with status code 400") {
          setErrorMessage("Password and/or Email wrong");
        }
      }
    } else {
      setErrorMessage("You have to fill all Fields");
    }
  };

  return (
    <div className="loginPage">
      <div className="formLoginArea">
        <div className="loginTitle">
          <h1>Connection</h1>
        </div>
        <form className="formLogin" onSubmit={handleSubmit}>
          <div className="logindiv">
            <h2>Votre Email </h2>
            <input
              type="text"
              placeholder="email"
              onChange={(event) => {
                setEmail(event.target.value);
                setErrorMessage("");
              }}
            />
          </div>
          <div className="logindiv">
            <h2>Votre Mot de Passe </h2>
            <input
              type="password"
              placeholder="password"
              onChange={(event) => {
                setPassword(event.target.value);
                setErrorMessage("");
              }}
            />
          </div>
          <div className="ifnot">
            <p className="errorMessage">{errorMessage}</p>
          </div>

          <div className="submitLoginButton">
            <button type="submit">Se connecter</button>
          </div>
        </form>
        <div className="ifnotLogin">
          <p
            className="ifbutton"
            onClick={() => {
              history.push("/signup");
            }}
          >
            Cliquez ici pour créer un compte
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
