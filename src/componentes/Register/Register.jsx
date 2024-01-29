import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "./Register.module.css";
import { registerUser } from "../../redux/actions/actions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Snackbar from "@mui/material/Snackbar";

const Register = () => {
  const dispatch = useDispatch();
  const initialFormData = {
    name: "",
    surName: "",
    email: "",
    password: "",
    admin: false,  
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [createdUsersList, setCreatedUsersList] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  const validateForm = () => {
    const newErrors = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "admin" && value.trim() === "") {
        newErrors[key] = "*Campo obligatorio*";
      }
    });

    const nameRegex = /^[A-Z][a-z]{0,9}( [A-Z][a-z]{0,9})?$/;
    if (formData.name !== "" && !nameRegex.test(formData.name)) {
      newErrors.name =
        "El campo nombre debe comenzar con mayúscula y debe contener no más de 10 caracteres. Ejemplo: Juan";
    }

    const surNameRegex = /^[A-ZÑñ][a-zñ]{0,9}( [A-ZÑñ][a-zñ]{0,9})?$/;
    if (formData.surName !== "" && !surNameRegex.test(formData.surName)) {
      newErrors.surName =
        "El campo apellido debe comenzar con mayúscula y debe contener no más de 10 caracteres. Ejemplo: Pérez";
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[@.])[a-zA-Z0-9@.]{6,12}$/;
    if (formData.password !== "" && !passwordRegex.test(formData.password)) {
      newErrors.password =
        "La contraseña debe contener de 6 a 12 caracteres e incluir: una mayúscula como primer caracter, una minúscula y un caracter especial: Password@";
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (formData.email !== "" && !emailRegex.test(formData.email)) {
      newErrors.email =
        "Ingrese una dirección de e-mail válida. Ejemplo: user@example.com";
    }

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (datauser) => {
    console.log("Datos enviados al backend:", datauser);
    dispatch(registerUser(datauser));
    setMessage(
      "¡Te has registrado correctamente! Verifica tu casilla de correo"
    );
    setSnackbarOpen(true);
    setFormData(initialFormData);
    setErrors({});
    setIsFormValid(false);
    setCreatedUsersList((prevList) => {
      const updatedList = [...prevList, datauser];
      localStorage.setItem("createdUsersList", JSON.stringify(updatedList));
      return updatedList;
    });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Ingrese su nombre..."
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span className={styles.error}>{errors.name}</span>}

        <label htmlFor="surName">Apellido:</label>
        <input
          type="text"
          id="surName"
          name="surName"
          placeholder="Ingrese su apellido..."
          value={formData.surName}
          onChange={handleChange}
        />
        {errors.surName && (
          <span className={styles.error}>{errors.surName}</span>
        )}

        <label htmlFor="email">E-mail:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Ingrese su dirección de e-mail..."
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className={styles.error}>{errors.email}</span>}

        <label htmlFor="password">Contraseña:</label>
        <div className={styles.passwordInputContainer}>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Ingrese su contraseña..."
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={styles.showHideButton}
          >
            {showPassword ? "Ocultar" : "Mostrar"}
          </button>
        </div>
        {errors.password && (
          <span className={styles.error}>{errors.password}</span>
        )}

        <label htmlFor="admin">¿Admin?</label>
        <input
          type="checkbox"
          id="admin"
          name="admin"
          checked={formData.admin}
          onChange={(e) =>
            setFormData({ ...formData, admin: e.target.checked })
          }
        />

        <button
          type="button"
          onClick={() => handleSubmit(formData)}
          className={`${styles.button} ${
            !isFormValid ? styles.buttonDisabled : ""
          }`}
          disabled={!isFormValid}
        >
          -- Registrarse --
        </button>
      </form>
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

export default Register;
