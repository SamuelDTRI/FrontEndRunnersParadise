import React, { useState } from "react";
import { useDispatch } from "react-redux";
import validation from "../Validaciones/validaciones";
import styles from "./create.module.css";
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
import styled from "@emotion/styled";

const ProductForm = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [input, setInput] = useState({
    name: "",
    brand: "",
    size: [],
    image: [],
    colors: [],
    price: "",
    description: "",
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
      // Manejar cambios en el input de tallas si es necesario
    } // Esto puede que ya no sea necesario si muestras una vista previa de todas las imágenes
    else {
      setInput((prevInput) => ({ ...prevInput, [name]: value }));
    }
  };

  const handleSubmit = async (event, files) => {
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

        const inputFile = document.querySelector("input[name='image']").files;
        for (let i = 0; i < inputFile.length; i++) {
          formData.append("image", inputFile[i]);
        }

        formData.append("description", input.description);

        for (let [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`);
        }
        console.log(input.image);
        console.log(formData);
        console.log(inputFile);
        const response = await dispatch(postCreateProduct(formData));

        console.log("Respuesta del servidor:", response);
        setMessage("Producto creado exitosamente.");

        setInput({
          name: "",
          brand: "",
          size: [],
          image: [],
          colors: [],
          price: "",
          description: "",
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

  const colorOptions = (brandColors[input.brand] || []).map((color, index) => ({
    value: color,
    label: color,
    key: index,
  }));

  const handleBrandChange = (event) => {
    const selectedBrand = event.target.value;
    setInput((prevInput) => ({
      ...prevInput,
      brand: selectedBrand,
      color: [],
    }));
  };

  const handleColorInputChange = (selectedOptions) => {
    const selectedColors = selectedOptions.map((option) => option.value);
    setInput((prevInput) => ({
      ...prevInput,
      colors: selectedColors,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const sizeOptions = [
    { value: "all", label: "Todos" },
    { value: "7", label: "7" },
    { value: "7.5", label: "7.5" },
    { value: "8", label: "8" },
    { value: "8.5", label: "8.5" },
    { value: "9", label: "9" },
    { value: "9.5", label: "9.5" },
    { value: "10", label: "10" },
    { value: "10.5", label: "10.5" },
    { value: "11", label: "11" },
    { value: "11.5", label: "11.5" },
    { value: "12", label: "12" },
  ];

  const handleSizeChange = (selectedOptions) => {
    const selectedSizes = selectedOptions.map((option) => option.value);
    setInput((prevInput) => ({
      ...prevInput,
      size: selectedSizes,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImageUrl(null);
    }
  };

  const colorStyles = {
    green: { backgroundColor: "green", color: "white" },
    white: { backgroundColor: "white", color: "black" },
    black: { backgroundColor: "black", color: "white" },
    blue: { backgroundColor: "blue", color: "white" },
    grey: { backgroundColor: "grey", color: "white" },
    red: { backgroundColor: "red", color: "white" },
  };

  const updatedInput = {
    ...input,
    size: input.size, // Asegúrate de que 'size' sea un array de strings
    image: input.image, // Envía 'image' como un string
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.formandpreviewcontainer}>
          <form
            className={styles.formcontainer}
            onSubmit={(e) => handleSubmit(e)}
          >
            <label className={styles.formlabelModelo}>Modelo</label>
            <div className={styles.inputModelo}>
              <input
                type="text"
                value={input.name}
                name="name"
                placeholder="Modelo..."
                onChange={(e) => handleChange(e)}
                className={styles.forminput}
              />
              <p className={styles.errormessage}>{errors.name}</p>
            </div>

            <label className={styles.formlabelprecio}>USD$</label>
            <div className={styles.inputprecio}>
              <input
                type="number"
                value={input.price}
                name="price"
                placeholder="Precio..."
                onChange={(e) => {
                  // Validar y convertir a número
                  const value = parseFloat(e.target.value) || 0;
                  handleChange({ target: { name: "price", value } });
                }}
                min="1"
                step="any" // Permite números decimales
                className={styles.forminputprecio}
              />

              <p className={styles.errormessage}>{errors.price}</p>
            </div>

            <label className={styles.formlabelimagen}>Imagen</label>
            <div className={styles.inputimage}>
              {" "}
              <form>
                <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  multiple
                />
              </form>
              <p className={styles.errormessage}>{errors.image}</p>
            </div>

            <label>
              Descripción:
              <input
                type="text"
                name="description"
                value={input.description}
                onChange={handleInputChange}
              />
            </label>

            <label className={styles.formlabelmarca}>Marca</label>

            <select
              value={input.brand}
              name="brand"
              onChange={(e) => {
                handleBrandChange(e);
                handleChange(e);
              }}
              className={styles.forminputMarca}
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
            <p className={styles.errormessage}>{errors.brand}</p>

            <label className={styles.formlabelTalles}>Talles</label>

            <Select
              className={styles.inputtalle}
              value={input.size.map((size) => ({ value: size, label: size }))}
              name="size"
              onChange={(selectedOption) => handleSizeChange(selectedOption)}
              isMulti
              options={sizeOptions}
            />
            {input.size.length < 2 && (
              <p style={{ marginLeft: "5px" }}>
                Por favor, selecciona como mínimo dos talles.
              </p>
            )}

            <label className={styles.formlabelcolor}>Colores</label>
            <div className={styles.inputcolor}>
              <Select
                value={input.colors.map((color) => ({
                  value: color,
                  label: color,
                }))}
                name="colors"
                onChange={handleColorInputChange}
                isMulti
                options={colorOptions}
              />

              {input.colors.length < 2 && (
                <p className="alertCol">
                  Por favor, selecciona como mínimo dos colores.
                </p>
              )}
            </div>

            <div className={styles.buttoncontainer}>
              <button type="submit" className={styles.submitbutton}>
                Crear
              </button>
              <Link to="/home">
                <button className={styles.submitbutton}>Home</button>
              </Link>
            </div>

            {/*   {message && (
          <div className={ message.includes("éxito") ? "success-message" : "error-message"}>
          {message}
          </div>
        )} */}
          </form>

          <div className={styles.previewcontainer}>
            <div className="nombre">
              <h5>{input.name ? input.name : "Nombre..."}</h5>
            </div>

            <h6 className={styles.preciopreview}>
              {" "}
              {input.price ? `USD $${input.price}` : "Precio..."}
            </h6>
            <p className={styles.feacturescontainer}></p>

            <div className={styles.imagepreview}>
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Preview"
                  className={styles.previewimage}
                />
              )}
            </div>

            <p className={styles.feacturescontainer}></p>

            <div className={styles.tipos}>
              <p className={styles.titulo}>Marca seleccionada</p>
              <div className={styles.selectedsizescontainer}>
                <span className={styles.selectedsize}>
                  {input.brand ? input.brand : "Marca"}
                </span>
              </div>
            </div>

            <div className={styles.tipos}>
              <p className={styles.titulo}>Colores seleccionados</p>
              <div className={styles.selectedsizescontainer}>
                {input.colors.map((selectedColor, index) => (
                  <span
                    key={selectedColor}
                    className={styles.selectedsize}
                    style={colorStyles[selectedColor]}
                  >
                    {selectedColor}
                    {index < input.colors.length - 1 && (
                      <span className={styles.sizeseparator}></span>
                    )}
                  </span>
                ))}
              </div>
            </div>
            <div className={styles.tipos}>
              <p className={styles.titulo}>Talles seleccionados</p>
              <div className={styles.selectedsizescontainer}>
                {input.size.map((selectedSize, index) => (
                  <span key={selectedSize} className={styles.selectedsize}>
                    {selectedSize}
                    {index < input.size.length - 1 && (
                      <span className="size-separator"></span>
                    )}
                  </span>
                ))}
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
    </div>
  );
};

export default ProductForm;
