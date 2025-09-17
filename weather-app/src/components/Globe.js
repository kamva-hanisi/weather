import React from "react";
import "../components/Style/globe.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faLocationDot,
  faLocationArrow,
  faMagnifyingGlass,
  faEarthAmericas,
} from "@fortawesome/free-solid-svg-icons";

function Globe() {
  return (
    <div id="screen">
      {/* main section */}
      <div className="section">
        <div className="date">15 Sep 2025</div>
        <div className="button">
          <FontAwesomeIcon icon={faCirclePlus} className="btn-icon" />
        </div>
      </div>
      <div className="section-box">
        <div className="add-section">
          <div className="add-section-title">
            <h2>Add a new place</h2>
          </div>

          {/* search */}
          <div className="search">
            <div className="search-icon">
              <FontAwesomeIcon icon={faLocationDot} />
            </div>
            <input
              className="searchinput"
              type="text"
              placeholder="search..."
            />
          </div>

          {/* error messages */}
          <div className="messages">
            <div className="error-message">City not found</div>
            <div className="normal-message">Search your city to add</div>
            <div className="added-message">Successfully added ✔</div>
          </div>
        </div>
      </div>
      <div className="city-box"></div>
      nav section
      <nav>
        <ul>
          <li>
            <a href="/">
              <FontAwesomeIcon icon={faLocationArrow} />
            </a>
          </li>
          <li>
            <a href="/search">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </a>
          </li>
          <li>
            <a className="active" href="/globe">
              <FontAwesomeIcon icon={faEarthAmericas} />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Globe;
