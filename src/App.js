import "./App.css";
import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Cookies from "js-cookie";

//Containers
import Homepage from "./containers/Homepage";
import Offers from "./containers/Offers";
import Publish from "./containers/Publish";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Offer from "./containers/Offer";
import Contact from "./containers/Contact";
import Update from "./containers/Update";
import Delete from "./containers/Delete";
import Deletesucess from "./containers/Deletesucess";
import Useroffers from "./containers/Useroffers";

//Components
import Header from "./components/Header";

//Icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
library.add(faEnvelope, fab);

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);

  const setUser = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token);
    } else {
      setToken(null);
      Cookies.remove("token");
    }
  };

  return (
    <Router>
      <Header setUser={setUser} token={token} />
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/publish">
          <Publish token={token} />
        </Route>
        <Route exact path="/useroffers">
          <Useroffers token={token} />
        </Route>
        <Route exact path="/offers">
          <Offers />
        </Route>
        <Route exact path="/offer/:id">
          <Offer token={token} />
        </Route>
        <Route exact path="/update">
          <Update token={token} />
        </Route>
        <Route exact path="/delete">
          <Delete token={token} />
        </Route>
        <Route exact path="/deletesucess">
          <Deletesucess token={token} />
        </Route>
        <Route exact path="/contact">
          <Contact token={token} />
        </Route>
        <Route exact path="/signup">
          <Signup setUser={setUser} />
        </Route>
        <Route exact path="/login">
          <Login setUser={setUser} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
