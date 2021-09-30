import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";

//images
import Logo from "../Images/Logo.png";

const Header = ({ setUser, token }) => {
  const history = useHistory();

  return (
    <div className="header">
      <div className="logoDiv">
        <img
          onClick={() => {
            history.push("/");
          }}
          className="headerLogo"
          src={Logo}
          alt=""
        />
      </div>
      {token ? (
        <div className="headerButtons">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="accountButton"
            onClick={() => {
              history.push("/");
            }}
          >
            Accueil
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="accountButton"
            onClick={() => {
              history.push("/publish");
            }}
          >
            Poster une annonce
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="accountButton"
            onClick={() => {
              history.push("/useroffers");
            }}
          >
            Mes annonces
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="accountButton"
            onClick={() => {
              setUser(null);
              history.push("/");
            }}
          >
            Se déconnecter
          </motion.button>
        </div>
      ) : (
        <div className="headerButtons">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="accountButton"
            onClick={() => {
              history.push("/");
            }}
          >
            Accueil
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="accountButton"
            onClick={() => {
              history.push("/login");
            }}
          >
            Connexion
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="accountButton"
            onClick={() => {
              history.push("/signup");
            }}
          >
            Inscription
          </motion.button>
        </div>
      )}
    </div>
  );
};
export default Header;
