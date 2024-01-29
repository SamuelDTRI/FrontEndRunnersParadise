import React from "react";
import { Link } from "react-router-dom";
import styles from "./Unauthorized.module.css";
import { FaExclamationCircle } from "react-icons/fa";

const Unauthorized = () => {
  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}>
        <FaExclamationCircle className={styles.icon} />
      </div>
      <h2 className={styles.title}>Acceso no autorizado</h2>
      <p className={styles.message}>
        Lo sentimos, como comprador, no tienes los permisos necesarios para
        crear productos.
      </p> 
      {/* //toco poner esto para los espacios {" "} */}
      <p className={styles.info}>
        Unicamente tienes acceso a esta ruta si eres un
        administrador. Puedes dirigirte a{" "}
        <Link to="/home" className={styles.link}>
          Home
        </Link>{" "} 
        para continuar con tus compras o{" "} 
        <Link to="/login" className={styles.link}>
          iniciar sesion
        </Link>{" "}
        con otra cuenta si tienes rol de aministrador. Si no tienes una cuenta con
        otro rol,{" "}
        <Link to="/register" className={styles.link}>
          registrate aqui
        </Link>{" "}
        con rol de administrador para que puedas tener una experiencia aun mejor.
      </p>
    </div>
  );
};

export default Unauthorized;
