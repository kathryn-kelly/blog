import React from "react";
import "./index.css";
//import registerServiceWorker from "./registerServiceWorker";
import ReactDOM from "react-dom";
import Playlist from "./components/Playlist";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import User from "./components/Login";

const Root = () => {
  return (
    <Router>
      <h1 className="text-center">
        fitlist
        <Route exact path="/" component={User} />
        <Route path="/playlists" component={Playlist} />
      </h1>
    </Router>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));

//registerServiceWorker();
