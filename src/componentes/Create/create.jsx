import React, { useState } from "react";
import { useDispatch } from "react-redux";
import validation from "../Validaciones/validaciones";
import "./create.css";
import { Link } from "react-router-dom";
import Select from "react-select";
import {
  postCreateProduct,
  clearCreateProductState,
  createProductSuccess,
  createProductFailure,
} from "../../redux/actions/actions";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Snackbar from "@mui/material/Snackbar";

const ProductForm = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [input, setInput] = useState({
    name: "",
    brand: "",
    size: [],
    image: null,
    colors: [],
    price: "",
  });
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    return () => {
      dispatch(clearCreateProductState());
    };
  }, [dispatch]);

  const handleValidation = () => {
    const newErrors = validation(input);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "size") {
    } else if (name === "image") {
      const imagesArray = value.split(",").map((url) => url.trim());
      setInput((prevInput) => ({ ...prevInput, [name]: imagesArray }));
      setImageUrl(value.name);
    } else {
      setInput((prevInput) => ({ ...prevInput, [name]: value }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (handleValidation()) {
      try {
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("brand", input.brand);
        input.size.forEach((size) => {
          formData.append("size", size);
        });
        formData.append("price", input.price);
        input.colors.forEach((color) => {
          formData.append("colors", color);
        });
        if (input.image) {
          formData.append("image", input.image);
        }
        for (let [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`);
        }
        console.log(input.image);
        const response = await dispatch(postCreateProduct(formData));

        console.log("Respuesta del servidor:", response);
        setMessage("Producto creado exitosamente.");
        setSnackbarOpen(true);

        setInput({
          name: "",
          brand: "",
          size: [],
          image: null,
          colors: [],
          price: "",
        });
        setImageUrl("");
      } catch (error) {
        console.error("Error al crear el producto:", error);
        dispatch(createProductFailure(error));
        setMessage(
          "Error al crear el producto. Contacta con un administrador para más detalles."
        );
        setSnackbarOpen(true);
      }
    } else {
      setMessage("Por favor, completa el formulario correctamente.");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const availableBrands = ["ADIDAS", "NIKE", "NEWBALANCE"];
  const brandColors = {
    NIKE: ["green", "white", "black", "pink", "yellow", "red", "blue"],
    ADIDAS: ["green", "white", "black", "pink", "yellow", "red", "blue"],
    NEWBALANCE: ["green", "white", "black", "pink", "yellow", "red", "blue"],
  };

  const colorOptions = (brandColors[input.brand]).map((color, index) => ({
    value: color,
    label: color,
    key: index,
  }));

  const handleBrandChange = (event) => {
    const selectedBrand = event.target.value;
    setInput((prevInput) => ({
      ...prevInput,
      brand: selectedBrand,
      colors: [],
    }));
  };

  const handleColorInputChange = (selectedOptions) => {
    const selectedColors = selectedOptions.map((option) => option.value);
    setInput((prevInput) => ({
      ...prevInput,
      colors: selectedColors,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setInput((prevInput) => ({ ...prevInput, image: file }));
    setImageUrl(URL.createObjectURL(file));
  };

  const sizeOptions = [
    { value: "7", label: "7" },
    { value: "8", label: "8" },
    { value: "9", label: "9" },
    { value: "10", label: "10" },
    { value: "11", label: "11" },
    { value: "12", label: "12" },
  ];

  const handleSizeChange = (selectedOptions) => {
    const selectedSizes = selectedOptions.map((option) => option.value);
    setInput((prevInput) => ({
      ...prevInput,
      size: selectedSizes,
    }));
  };

  const colorStyles = {
    green: { backgroundColor: "green", color: "white" },
    white: { backgroundColor: "white", color: "black" },
    black: { backgroundColor: "black", color: "white" },
    blue: { backgroundColor: "blue", color: "white" },
    yellow: { backgroundColor: "yellow", color: "black" },
    red: { backgroundColor: "red", color: "white" },
    pink: { backgroundColor: "pink", color: "black" },
  };

  return (
    <div className="container">
      <div className="form-and-preview-container">
        <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
          <label className="form-label">Modelo</label>
          <input
            type="text"
            value={input.name}
            name="name"
            placeholder="Modelo..."
            onChange={(e) => handleChange(e)}
            className="form-input"
          />
          <p className="error-message">{errors.name}</p>
          <label className="form-label">Precio en USD$</label>
          <input
            type="number"
            value={input.price}
            name="price"
            placeholder="Precio..."
            onChange={(e) => {
              const value = parseFloat(e.target.value) || 0;
              handleChange({ target: { name: "price", value } });
            }}
            min="1"
            step="any"
            className="form-input"
          />

          <p className="error-message">{errors.price}</p>

          <label className="form-label">Imagen</label>
          <input type="file" name="image" onChange={handleFileChange} />
          <p className="error-message">{errors.image}</p>

          <label className="form-label">Marca</label>
          <select
            value={input.brand}
            name="brand"
            onChange={(e) => {
              handleBrandChange(e);
              handleChange(e);
            }}
            className="form-input"
          >
            <option value="" disabled>
              Selecciona una marca
            </option>
            {availableBrands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
          <p className="error-message">{errors.brand}</p>

          <label className="form-label">Tamaños</label>
          <Select
            value={input.size.map((size) => ({ value: size, label: size }))}
            name="size"
            onChange={(selectedOption) => handleSizeChange(selectedOption)}
            isMulti
            options={[
              {
                value: "placeholder",
                label: "Selecciona dos tamaños",
                isDisabled: true,
              },
              ...sizeOptions,
            ]}
          />
          {input.size.length < 2 && (
            <p className="alertSize">Por favor, selecciona dos tamaños.</p>
          )}

          <label className="form-label">Colores</label>
          <Select
            value={input.colors.map((color) => ({
              value: color,
              label: color,
            }))}
            name="colors"
            onChange={handleColorInputChange}
            isMulti
            options={[
              {
                value: "placeholder",
                label: "Selecciona dos colores",
                isDisabled: true,
              },
              ...colorOptions,
            ]}
          />

          {input.colors.length < 2 && (
            <p className="alertCol">Por favor, selecciona dos colores.</p>
          )}

          <div className="button-container">
            <button type="submit" className="submit-button">
              Crear
            </button>
            <Link to="/home">
              <button className="submit-button">Home</button>
            </Link>
          </div>
        </form>

        <div className="preview-container">
          <div className="nombre">
            <h3>{input.name ? input.name : "Modelo..."}</h3>
          </div>

          <h4 className="precio-preview">
            {" "}
            {input.price ? `USD $${input.price}` : "Precio..."}
          </h4>
          <p className="feactures-container"></p>

          <div className="image-preview">
            {imageUrl && (
              <img src={imageUrl} alt="Preview" className="preview-image" />
            )}
          </div>
          <p className="feactures-container"></p>

          <div className="tipos">
            <p className="titulo">Marca seleccionada</p>
            <div className="selected-sizes-container">
              <span className="selected-size">
                {input.brand ? input.brand : "Ninguna marca seleccionada"}
              </span>
            </div>
          </div>

          <div className="tipos">
            <p className="titulo">Tamaños seleccionados</p>
            <div className="selected-sizes-container">
              {input.size.length === 0 ? (
                <p className="selected-size">Ningún tamaño seleccionado</p>
              ) : (
                input.size.map((selectedSize, index) => (
                  <span key={selectedSize} className="selected-size">
                    {selectedSize}
                    {index < input.size.length - 1 && (
                      <span className="size-separator"></span>
                    )}
                  </span>
                ))
              )}
            </div>
          </div>

          <div className="tipos">
            <p className="titulo">Colores seleccionados</p>
            <div className="selected-sizes-container">
              {input.colors.length === 0 ? (
                <p className="selected-size">Ningún color seleccionado</p>
              ) : (
                input.colors.map((selectedColor, index) => (
                  <span
                    key={selectedColor}
                    className="selected-size"
                    style={colorStyles[selectedColor]}
                  >
                    {selectedColor}
                    {index < input.colors.length - 1 && (
                      <span className="size-separator"></span>
                    )}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={message}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleSnackbarClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
};

export default ProductForm;
