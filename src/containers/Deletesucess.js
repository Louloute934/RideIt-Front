import { useHistory } from "react-router-dom";

const Deletesucess = ({ token }) => {
  const history = useHistory();
  return (
    <div className="deleteSucessPage">
      <div className="sucessSection">
        <h1>Votre Annonce a bien été supprimée</h1>
        <div className="returnSucessButton">
          <button
            onClick={() => {
              history.push("/");
            }}
          >
            Retour à la page d'accueil
          </button>
        </div>
      </div>
    </div>
  );
};

export default Deletesucess;
