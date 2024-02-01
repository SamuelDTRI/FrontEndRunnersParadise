import React, { useState, useEffect, useRef, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductDetail,
  clearProductDetail,
  postCartItems,
  getSneakers,
  setSelectedImageIndex,
} from "../../redux/actions/actions";
import style from "./Detail.module.css";
import BottomBar from "./bottomBar";
import Reviews from "../../componentes/Reviews/Reviews";
import { useParams, Link } from "react-router-dom";
import { AuthContext } from "../../componentes/AuthProvider/authProvider";

const Detail = ({ brand }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { auth, setAuth } = useContext(AuthContext);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const zapatilla = useSelector((state) => state?.product?.detail);
  const currentPage = useSelector((state) => state?.product?.currentPage);
  const setSelectedImageIndex = useSelector(
    (state) => state?.selectedImageIndex
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const intervalRef = useRef(null);

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  console.log(selectedColor);
  console.log(selectedSize);
  console.log(id);

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };
  console.log(setSelectedImageIndex);

  const handleAddToCart = () => {
    if (selectedColor && selectedSize && id && auth.token.id) {
      const itemsData = {
        quantity: quantity,
        colors: [selectedColor],
        size: [selectedSize],
      };
      dispatch(postCartItems(auth.token.id, id, itemsData));
    } else {
      console.log("Selecciona color y talla antes de agregar al carrito");
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetail(id));
    }
  }, [id, dispatch]);

  let logoUrl;
  switch (brand) {
    case "NIKE":
      logoUrl =
        "https://d3sxshmncs10te.cloudfront.net/icon/free/svg/761696.svg?token=...";
      break;
    case "ADIDAS":
      logoUrl =
        "https://d3sxshmncs10te.cloudfront.net/icon/free/svg/7581614.svg?token=...";
      break;
    case "NEW BALANCE":
      logoUrl =
        "https://logos-world.net/wp-content/uploads/2020/09/New-Balance-Emblem.png";
      break;
    default:
      logoUrl = null;
  }

  useEffect(() => {
    return () => {
      dispatch(clearProductDetail());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!zapatilla) {
      dispatch(fetchProductDetail(id));
    }
  }, [dispatch, id, zapatilla]);

  if (!zapatilla) {
    return <div>Loading...</div>;
  }

  if (!zapatilla.name) {
    return <div>Datos no disponibles</div>;
  }

  const handleRatingChange = (value) => {
    setRating(value);
  };

  // Function to toggle comment form visibility
  const toggleCommentForm = () => {
    setCommentFormVisible(!isCommentFormVisible);
  };

  return (
    <div className={style.container}>
      <div className={style.sneakersListContainer}>
        <BottomBar zapatilla={zapatilla} />
      </div>
      <div className={style.detailContainer}>
        <div className={style.imagePreview}>
          <img
            src={
              setSelectedImageIndex.length > 0
                ? setSelectedImageIndex
                : (zapatilla && zapatilla.image[0].secure_url) ||
                  zapatilla.image[0].secure_url
            }
            alt={zapatilla.name}
          />
        </div>
        <div className={style.detailContent}>
          <h2>{zapatilla && zapatilla.brand}</h2>
          <div className={style.nameContainer}>
            <h4>{zapatilla && zapatilla.name}</h4>
          </div>
          {logoUrl && (
            <div className={style.logoContainer}>
              <img src={logoUrl} alt={`${zapatilla.brand} Logo`} />
            </div>
          )}
          <div className={style.price}>
            <h4>${zapatilla.price * quantity} USD</h4>
          </div>
          <div className={style.containerColors}>
            <label>Colors:</label>
            <select onChange={handleColorChange}>
              <option value="">Select</option>
              {zapatilla.colors.map((color, index) => (
                <option key={index} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>
          <div className={style.sizesContainer}>
            <div className={style.sizes}>
              <label>Sizes:</label>
            </div>
            <select onChange={handleSizeChange}>
              <option value="">Select</option>
              {zapatilla.size.map((size, index) => (
                <option key={index} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          <div className={style.quantityContainer}>
            <h4>Selecciona la cantidad:</h4>
            <div className={style.quantityButtons}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                -
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>

          <button className={style.addToCartButton} onClick={handleAddToCart}>
            Agregar al Carrito
          </button>
        </div>
      </div>
      <div className={style.reviewContainer}>
        <Reviews productId={zapatilla && zapatilla.id} />
      </div>
      <div className={style.homeButtonContainer}>
        <Link to="/home" className={style.homeButton}>
          Volver a la Tienda
        </Link>
      </div>
    </div>
  );
};

export default Detail;
