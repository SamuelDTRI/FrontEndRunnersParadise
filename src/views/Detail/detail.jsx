import React, { useState, useEffect, useRef, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductDetail,
  clearProductDetail,
  postCartItems,
  getSneakers,
  setSelectedImageIndex,
} from "../../redux/actions/actions";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  const [hoveredColor, setHoveredColor] = useState("");
  const [hoveredSize, setHoveredSize] = useState("");
  const [messages, setMessages] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [showMore, setShowMore] = useState(false);
  const zapatilla = useSelector((state) => state?.product?.detail);
  const currentPage = useSelector((state) => state?.product?.currentPage);
  const setSelectedImageIndex = useSelector(
    (state) => state?.selectedImageIndex
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const intervalRef = useRef(null);

  const handleColorChange = (selectedColor) => {
    setSelectedColor(selectedColor);
  };

  console.log(selectedColor);
  console.log(selectedSize);
  console.log(id);

  const handleSizeChange = (selectedSize) => {
    setSelectedSize(selectedSize);
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

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className={style.container}>
      <div className={style.lineDividerHeader}></div>
      <section>
        <div className={style.flexBox}>
          <div className={style.left}>
            <div className={style.bigImg}>
              <img
                src={
                  setSelectedImageIndex.length > 0
                    ? setSelectedImageIndex
                    : (zapatilla && zapatilla.image.secure_url) ||
                      zapatilla.image[0].secure_url
                }
                alt={zapatilla.name}
              />
            </div>
            <div className={style.images}>
              <div className={style.smallImg}>
                <BottomBar zapatilla={zapatilla} />
              </div>
            </div>
          </div>
          <div className={style.right}>
            <div className={style.nameContainer}>
              <h1>{zapatilla && zapatilla.name}</h1>
            </div>
            <div className={style.brand}>
              <h4> Sneakers - {zapatilla && zapatilla.brand}</h4>
            </div>
            {logoUrl && (
              <div className={style.logoContainer}>
                <img src={logoUrl} alt={`${zapatilla.brand} Logo`} />
              </div>
            )}
            <div className={style.price}>
              <h4>{zapatilla.price * quantity} $</h4>
            </div>
            <div className={style.containerColors}>
              <label>Colors:</label>
              <div className={style.colorOptionsContainer}>
                {zapatilla.colors.map((color, index) => (
                  <div
                    key={index}
                    className={`${style.colorOption}  
                ${color === hoveredColor ? style.hovered : ""} 
                ${color === selectedColor ? style.selectedColor : ""}`}
                    onMouseOver={() => setHoveredColor(color)}
                    onMouseOut={() => setHoveredColor("")}
                    onClick={() => handleColorChange(color)}
                  >
                    {color}
                  </div>
                ))}
              </div>
            </div>
            <div className={style.sizesContainer}>
              <div className={style.sizes}>
                <p>Selecciona tu talla:</p>
              </div>
              <div className={style.sizeOptionsContainer}>
                {zapatilla.size.map((size, index) => (
                  <div
                    key={index}
                    className={`${style.colorOption} 
                    ${size === hoveredSize ? style.hovered : ""} 
                    ${size === selectedSize ? style.selectedSize : ""}`}
                    onMouseOver={() => setHoveredSize(size)}
                    onMouseOut={() => setHoveredSize("")}
                    onClick={() => handleSizeChange(size)}
                  >
                    {`US ${size}`}
                  </div>
                ))}
              </div>
            </div>
            <div className={style.quantityContainer}>
              <p>cantidad:</p>
              <div className={style.quantityButtons}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  -
                </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

            <button
              className={style.addToCartButton}
              onClick={() => {
                if (auth === null) {
                  setMessages([
                    "registrase para agregar productos al carro",
                    <Link to="/login">Iniciar sesión</Link>,
                  ]);
                } else if (auth.token.id) {
                  if (selectedColor && selectedSize && id && auth.token.id) {
                    handleAddToCart();
                    setMessages([
                      "agregado",
                      <Link to="/shopping">ir al carrito</Link>,
                    ]);
                  } else {
                    setMessages([
                      "Por favor, elija todas las opciones antes de agregar al carrito",
                    ]);
                  }
                }
              }}
            >
              Agregar al Carrito
            </button>

            {messages.length > 0 && (
              <div className={style.messages}>
                {messages.map((message, index) => (
                  <p key={index}>{message}</p>
                ))}
              </div>
            )}
            <div className={style.collect}>
              <span>Recogida gratuita</span>
            </div>

            <div className={style.lineDivider}></div>

            <p className={style.description}>
              {zapatilla.description
                ? zapatilla.description
                : "no hay description"}
            </p>

            <div className={style.lineDivider}></div>

            <div className={style.devolutionsContainer}>
              <div>
                <p className={style.devolutions}>
                  Devoluciones y envíos gratuitos
                </p>
                {!showMore && (
                  <button
                    className={style.buttonDevolution}
                    onClick={toggleShowMore}
                  >
                    ver mas...
                    <FontAwesomeIcon icon={faChevronDown} />
                  </button>
                )}
                {showMore && (
                  <>
                    <button onClick={toggleShowMore}>
                      Ver menos <FontAwesomeIcon icon={faChevronUp} />
                    </button>
                    {
                      <p className={style.descriptionDevolution}>
                        Entrega estándar gratuita con tu{" "}
                        {zapatilla && zapatilla.brand} Membership. Puedes
                        devolver tu pedido en un plazo de 30 días sin ningún
                        coste.
                      </p>
                    }
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className={style.detailContainer}>
        <div className={style.detailContent}></div>
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
