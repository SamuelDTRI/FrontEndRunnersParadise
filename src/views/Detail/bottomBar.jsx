import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./bottomBar.css";
import { useDispatch, useSelector } from "react-redux";
import { getSneakers, setSelectedSneakerIndex,setSelectedImageIndex } from "../../redux/actions/actions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';




const BottomBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const detail = useSelector((state) => state?.product?.detail);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = (colorIndex) => {
    dispatch(setSelectedImageIndex(colorIndex));
  };

  console.log("ESTO VIENE DE BUTTONBAR",detail.colors)
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < detail.colors.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="container">
      <div className="bottom-bar-container">
        <FontAwesomeIcon icon={faAngleUp} onClick={handlePrev} />
        {detail.colors && Array.isArray(detail.colors) && detail.colors.length > 0 ? (
          detail.colors.map((color, colorIndex) => (
            <div
              key={colorIndex}
              className={`bottom-button ${currentIndex === colorIndex ? 'selected' : ''}`}
              onClick={() => handleClick(color)}
            >
              <img src={color} />
            </div>
          ))
        ) : (
          <div>No hay colores disponibles</div>
        )}
        <FontAwesomeIcon icon={faAngleDown} onClick={handleNext} />
      </div>
    </div>
  );
};

export default BottomBar;