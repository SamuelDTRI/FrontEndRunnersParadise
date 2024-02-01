import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../redux/actions/actions";
import { AuthContext } from "../AuthProvider/authProvider";
import { TextField, Button, Typography, Box, Alert } from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import styles from "./edditProfile.module.css";

const ChangePasswordForm = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const history = useHistory();
  const [formData, setFormData] = useState({
    id: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState(null);
  const [passwordValidation, setPasswordValidation] = useState({
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
    isLengthValid: false,
  });

  const dispatch = useDispatch();
  const { loading, error: updateUserError } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (auth && auth.token) {
      const { id, email } = auth.token;
      setFormData({
        id: id || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [auth]);

  const handleEditClick = () => {
    setEditMode(true);
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
    if (formData.newPassword !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setError(null);

    try {
      const userId = formData.id;
      const { currentPassword, newPassword } = formData;

      dispatch(updatePassword(userId, currentPassword, newPassword))
        .then(() => {
          // Cambio de contraseña exitoso
          const confirmationMessage =
            "Se cambió correctamente tu contraseña. Por favor, vuelve a loguearte!";

          if (window.confirm(confirmationMessage)) {
            logOut();
          }
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al cambiar la contraseña:", error);
        });

      setEditMode(false);
    } catch (error) {
      setError("Error al actualizar el usuario");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validación de la nueva contraseña en tiempo real
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{5,}$/;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecialChar = /[!@#$%^&*()_+]/.test(value);
    const isLengthValid = value.length >= 5;

    setPasswordValidation({
      hasUpperCase,
      hasLowerCase,
      hasNumber,
      hasSpecialChar,
      isLengthValid,
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSaveClick}>
      <div className={styles.title}>
        <h4>Cambio de Contraseña</h4>
      </div>

      <div className={styles.inputContainer}>
        <label className={styles.label} htmlFor="currentPassword">
          Contraseña Actual:
        </label>
        <TextField
          className={styles.input}
          id="currentPassword"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          type="password"
          variant="outlined"
          size="small"
        />
      </div>

      <div className={styles.inputContainer}>
        <label className={styles.label} htmlFor="newPassword">
          Nueva Contraseña:
        </label>
        <TextField
          className={styles.input}
          id="newPassword"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          type="password"
          disabled={!editMode}
          variant="outlined"
          size="small"
        />
        <PasswordValidationMessages {...passwordValidation} />
      </div>

      <div className={styles.inputContainer}>
        <label className={styles.label} htmlFor="confirmPassword">
          Confirmar Contraseña:
        </label>
        <TextField
          className={styles.input}
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          type="password"
          disabled={!editMode}
          variant="outlined"
          size="small"
        />
      </div>

      <Button
        type="button"
        onClick={handleEditClick}
        className={styles.editButton}
      >
        Editar
      </Button>

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

const PasswordValidationMessages = ({
  hasUpperCase,
  hasLowerCase,
  hasNumber,
  hasSpecialChar,
  isLengthValid,
}) => {
  return (
    <div className={styles.passwordValidation}>
      <Typography
        variant="caption"
        className={hasUpperCase ? styles.valid : styles.invalid}
      >
        Al menos una mayúscula
      </Typography>
      <Typography
        variant="caption"
        className={hasLowerCase ? styles.valid : styles.invalid}
      >
        Al menos una minúscula
      </Typography>
      <Typography
        variant="caption"
        className={hasNumber ? styles.valid : styles.invalid}
      >
        Al menos un número
      </Typography>
      <Typography
        variant="caption"
        className={hasSpecialChar ? styles.valid : styles.invalid}
      >
        Al menos un caracter especial
      </Typography>
      <Typography
        variant="caption"
        className={isLengthValid ? styles.valid : styles.invalid}
      >
        Al menos 5 caracteres
      </Typography>
    </div>
  );
};

export default ChangePasswordForm;
