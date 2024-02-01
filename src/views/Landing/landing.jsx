import * as React from "react";
import { Link } from "react-router-dom";
import "./landing.css";
import logo from "../../assets/Runners Paradise.png";
import StandardImageList from "./display img/imgList";
import Slide from "../../componentes/Slide/slide";

const Landing = () => {
  const galleryStyle = {
    position: "fixed",
    bottom: "0",
    left: "0",
    height: "100vh",
  };

  return (
    <div className="land-container">
      <div>
        <img src={logo} className="logo" alt="Runners Paradise" />
        <div className="text">
          <p className="intro">
            ¡Bienvenido a <b>Runners Paradise</b>, el destino definitivo para
            los apasionados del deporte y el confort! En Runners Paradise, no
            solo ofrecemos <b>calzados deportivos de las mejores marcas</b>,
            sino que también proporcionamos una experiencia única para aquellos
            que buscan el equilibrio perfecto entre <b>rendimiento y estilo.</b>{" "}
            Navega por nuestra amplia selección de zapatillas diseñadas para
            potenciar tu carrera y elevar tu estilo de vida activo. En cada par,
            encontrarás la fusión perfecta de{" "}
            <b>
              tecnología avanzada, comodidad insuperable y diseño vanguardista.
            </b>{" "}
            Descubre la diferencia en Runners Paradise, donde la pasión por el
            deporte se encuentra con la moda atlética. ¡Prepárate para elevar
            tus límites y correr hacia la excelencia en cada paso!
          </p>
        </div>
        <div className="slideContainer">
          <Slide />
        </div>
        <div className="imagesList">
          <StandardImageList style={galleryStyle} />
        </div>
        <Link to="/home">
          <button className="land-button">Compre con nosotros</button>
        </Link>
      </div>
    </div>
  );
};
export default Landing;
