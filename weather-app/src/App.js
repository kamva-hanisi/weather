import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Search from "./components/Search";
import Globe from "./components/Globe";
import "./App.css";

function App() {
  return (
    <Router>
      <div id="container">
        {/* Page Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/globe" element={<Globe />} />
        </Routes>

        {/* ✅ Navbar stays at the bottom */}
        <nav>
          <ul>
            <li>
              <Link to="/">
                <i className="fa-solid fa-location-arrow"></i>
              </Link>
            </li>
            <li>
              <Link to="/search">
                <i className="fa-solid fa-magnifying-glass"></i>
              </Link>
            </li>
            <li>
              <Link to="/globe">
                <i className="fa-solid fa-earth-americas"></i>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </Router>
  );
}

export default App;
