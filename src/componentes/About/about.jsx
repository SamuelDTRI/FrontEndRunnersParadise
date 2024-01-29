import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./About.css"; // Asegúrate de tener este archivo CSS para los estilos personalizados
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function About(props) {
  return (
    <div className="container mt-5  mb-5">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
          integrity="sha512-xrRac0c5/3Ma9HN6T5Q/T1uHuL5oav5eaP3QQPyCv/Z3MWJ1HpuHrkQIH/FuRx3Ib8xvjQHyLx7O5vjRh2x/WWg=="
          crossorigin="anonymous"
        />
      </head>
      <div className="cuadrante">
        <div className="title">
          <h3>Sobre Nosotros</h3>
        </div>
        <p>
          ¡Bienvenido a Runners Paradise!
          <br />
          En Runners Paradise, no solo vendemos zapatillas deportivas, sino que
          también compartimos una pasión por la actividad física y el bienestar.
          Somos más que una tienda; somos un destino para todos los entusiastas
          de la moda atlética y las últimas tendencias en calzado deportivo.
        </p>
      </div>

      <div className="cuadrante">
        <div className="title">
          <h3>Nuestra Misión</h3>
        </div>
        <p>
          En el corazón de Runners Paradise está nuestra misión de inspirar y
          equipar a todos, desde aquellos que buscan el estilo perfecto hasta
          los amantes del rendimiento. Queremos ser tu compañero de confianza en
          cada paso de tu viaje, brindándote solo las mejores zapatillas en
          colores vibrantes y tallas que se ajusten a tu estilo único.
        </p>
      </div>

      <div className="cuadrante">
        <div className="title">
          <h3>Variedad para Todos</h3>
        </div>
        <p>
          Sabemos que cada persona es única, al igual que sus preferencias de
          calzado. Es por eso que ofrecemos una amplia variedad de zapatillas
          deportivas en colores llamativos, tallas para todos y precios que se
          adaptan a tu presupuesto. Descubre nuestra selección de marcas, que
          incluyen Adidas, New Balance y Nike.
        </p>
      </div>

      <div className="cuadrante">
        <div className="title">
          <h3>Experiencia Personalizada</h3>
        </div>
        <p>
          En Runners Paradise, nos enorgullece ofrecer más que solo productos
          excepcionales. Nuestro equipo está aquí para brindarte una experiencia
          de compra personalizada. Ya sea que busques zapatillas para destacar
          en tus entrenamientos o complementar tu estilo diario, estamos aquí
          para ayudarte a encontrar el par perfecto en el color y talla que
          prefieras.
        </p>
      </div>

      <div className="agradecimientos">
        <div className="title1">
          <h5>Equipo</h5>
        </div>
        <div className="agradecimientosContent">
          <h6>Front</h6>
          <p>
            Andres Vera
            <br />
            Matias Quirico
            <br />
          </p>

          <hr />
          <h6>Back</h6>
          <p>
            Tomas
            <br />
            Sam <br />
            Jaime
          </p>
          <hr />
          <br />

          <div className="socialIcons">
            <a
              href="https://www.instagram.com/soyhenry_ok/?hl=es"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://www.facebook.com/soyhenryok"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href="https://github.com/AndresXX1/P.F-Front"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-github"></i>
            </a>
            <h6 className="equipo">Equipo de RunnersParadise</h6>
          </div>
        </div>
      </div>
    </div>
  );
}
