import React from "react";
import BasicRating from "../Reviews/Reviews";
import style from "../Card/Card.module.css"; // Asegúrate de tener un archivo Card.css en tu proyecto

const Card = ({ id, model, size, image, color, brand, price }) => {
  let logoUrl;

  switch (brand) {
    case "NIKE":
      logoUrl = "https://i.pinimg.com/originals/33/e6/3d/33e63d5adb0da6b303a83901c8e8463a.png";
      break;
    case "ADIDAS":
      logoUrl = "https://logodownload.org/wp-content/uploads/2014/07/adidas-logo-0.png";
      break;
    case "NEW BALANCE":
      logoUrl = "https://logos-world.net/wp-content/uploads/2020/09/New-Balance-Emblem.png";
      break;
    default:
      logoUrl = null;
  }

  return (
    <div className={style.container}>
      <div className={style.cardContent}>
        <div className={style.cardTitle}>
        <h3 style={{fontWeight:'500'}}>{brand}</h3>
        </div>
        <img
          src={image}
          alt="Zapatilla"
        />
        <div className={style.brand}>
        <h3>{model}</h3>
        <div className={style.details}>
          <h4>
             ${price} USD
        </h4>
      </div>
        <div className={style.logoContainer}>
        {logoUrl && <img src={logoUrl} alt={`${brand} Logo`} />}
        </div>
      </div>
    </div>
  </div>
  );
};

export default Card;
