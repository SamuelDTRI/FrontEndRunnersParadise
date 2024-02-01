import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateUser } from "../../redux/actions/actions";
import { AuthContext } from "../AuthProvider/authProvider";
import { TextField, Button, Typography, Box, Alert } from "@mui/material";
import styles from "./edditProfile.module.css";

const UserMail = () => {
  const { auth, setAuth } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    id: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const [editMode, setEditMode] = useState({
    email: false,
    password: false,
  });

  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState("");
  const history = useHistory();

  const dispatch = useDispatch();
  const { loading, error: updateUserError } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (auth && auth.token) {
      const { id, email } = auth.token;
      setFormData((prevFormData) => ({
        ...prevFormData,
        id: id || "",
        email: email || "",
      }));
    }
  }, [auth]);

  const handleEditClick = (field) => {
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [field]: true,
    }));
  };

  const logOut = () => {
    if (window.gapi && window.gapi.auth2) {
      var auth2 = window.gapi.auth2.getAuthInstance();
      auth2.disconnect().then(function () {
        console.log("User disconnected.");
      });
    }

    setAuth(null);
    localStorage.removeItem("auth");
    history.push("/home");
  };

  const handleSaveClick = async () => {
    if (
      editMode.password &&
      formData.password !== formData.passwordConfirmation
    ) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (editMode.email && emailError) {
      setError("Por favor, ingresa un correo electrónico válido");
      return;
    }

    setError(null);

    const userId = formData.id;
    const currentPassword = formData.password;

    dispatch(updateUser(userId, { newEmail: formData.email, currentPassword }))
      .then(() => {
        const confirmationMessage =
          "Se cambió correctamente su correo. Por favor, vuelve a loguearte!";

        if (window.confirm(confirmationMessage)) {
          logOut();
        }
      })
      .catch((error) => {
        console.error("Error al cambiar el correo:", error);
      });

    setEditMode({
      email: false,
      password: false,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      validateEmail(value);
    }

    setFormData({ ...formData, [name]: value });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateEmail = (email) => {
    if (!isValidEmail(email)) {
      setEmailError("Por favor, ingresa un correo electrónico válido");
    } else {
      setEmailError("");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSaveClick}>
      <div className={styles.title}>
        <h4>Modifica tu Email</h4>
      </div>
      <div className={styles.inputContainer}>
        <label className={styles.label} htmlFor="email">
          Nuevo Email:
        </label>
        <TextField
          className={styles.input}
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={() => validateEmail(formData.email)}
          disabled={!editMode.email}
          variant="outlined"
          size="small"
        />
        {editMode.email && emailError && (
          <Alert severity="error">{emailError}</Alert>
        )}
        <Button
          type="button"
          onClick={() => handleEditClick("email")}
          className={styles.editButton}
        >
          Editar
        </Button>
      </div>

      <div className={styles.inputContainer}>
        <label className={styles.label} htmlFor="password">
          Contraseña:
        </label>
        <TextField
          className={styles.input}
          id="password"
          name="password"
          type="password" // ahora se ve como "password"
          value={formData.password}
          onChange={handleChange}
          disabled={!editMode.password}
          variant="outlined"
          size="small"
        />
        <Button
          type="button"
          onClick={() => handleEditClick("password")}
          className={styles.editButton}
        >
          Editar
        </Button>
      </div>

      {editMode.password && (
        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="passwordConfirmation">
            Confirmar Contraseña:
          </label>
          <TextField
            className={styles.input}
            id="passwordConfirmation"
            name="passwordConfirmation"
            type="password"
            value={formData.passwordConfirmation}
            onChange={handleChange}
            variant="outlined"
            size="small"
          />
        </div>
      )}

      <Button
        type="button"
        onClick={handleSaveClick}
        className={styles.saveButton}
      >
        Guardar Cambios
      </Button>

      {error && <Alert severity="error">{error}</Alert>}
      {updateUserError && (
        <Typography className={styles.error}>
          Error al actualizar el usuario: {updateUserError}
        </Typography>
      )}
    </form>
  );
};

export default UserMail;
