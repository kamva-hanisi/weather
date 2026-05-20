import React from "react";
import { HashRouter as Router, NavLink, Route, Routes } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEarthAmericas,
  faLocationArrow,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import Home from "./components/Home";
import Search from "./components/Search";
import Globe from "./components/Globe";
import "./App.css";

function App() {
  return (
    <Router>
      <div id="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/globe" element={<Globe />} />
        </Routes>

        <nav className="app-nav" aria-label="Primary navigation">
          <ul>
            <li>
              <NavLink to="/" end>
                <FontAwesomeIcon icon={faLocationArrow} />
              </NavLink>
            </li>
            <li>
              <NavLink to="/search">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </NavLink>
            </li>
            <li>
              <NavLink to="/globe">
                <FontAwesomeIcon icon={faEarthAmericas} />
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </Router>
  );
}

export default App;
