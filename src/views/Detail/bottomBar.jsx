import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./bottomBar.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getSneakers,
  setSelectedSneakerIndex,
  setSelectedImageIndex,
} from "../../redux/actions/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleUp,
  faAngleDown,
  faAngleRight,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";

const BottomBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const detail = useSelector((state) => state?.product?.detail);
  const [currentIndex, setCurrentIndex] = useState(0);
  const selectedImageIndex = useSelector((state) => state?.selectedImageIndex);

  const handleClick = (colorIndex) => {
    dispatch(setSelectedImageIndex(colorIndex));
  };

  return (
    <div className="container">
      <div className="bottom-bar-container">
        {detail.image &&
        Array.isArray(detail.image) &&
        detail.image.length > 0 ? (
          detail.image.map((image, colorIndex) => (
            <div
              key={colorIndex}
              className={`bottom-button ${
                selectedImageIndex === image.secure_url ? "selected" : ""
              }`}
              onClick={() => handleClick(image.secure_url)}
            >
              <img src={image.secure_url} />
            </div>
          ))
        ) : (
          <div>No hay colores disponibles</div>
        )}
      </div>
    </div>
  );
};

export default BottomBar;
