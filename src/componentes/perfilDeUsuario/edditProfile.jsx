import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfileData } from "../../redux/actions/actions";
import { AuthContext } from "../AuthProvider/authProvider";
import { TextField, Button, Typography, Box } from "@mui/material";
import { Alert } from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import styles from "./edditProfile.module.css";

const UserProfileForm = ({ updateUserData }) => {
  const { auth, setAuth } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    phone: "",
    address: "",
    country: "",
    profilePicture: null,
  });

  const [editMode, setEditMode] = useState({
    name: false,
    phone: false,
    address: false,
    country: false,
  });

  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const dispatch = useDispatch();
  const { loading, error: updateUserError } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (auth && auth.token) {
      const { id, name, phone, address, country, profilePicture } = auth.token;
      setFormData({
        id: id || "",
        name: name || "",
        phone: phone || "",
        address: address || "",
        country: country || "",
        profilePicture: profilePicture || "",
      });
    }
  }, [auth]);

  const handleEditClick = (field) => {
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [field]: true,
    }));
  };

  const history = useHistory();

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

  const handleSaveClick = () => {
    const userId = formData.id;
    dispatch(updateUserProfileData(userId, formData));

    const confirmationMessage =
      "Cambios realizados con éxito. ¿Deseas salir de tu sesión?";
    const shouldLogOut = window.confirm(confirmationMessage);

    if (shouldLogOut) {
      logOut();
    }

    setEditMode({
      name: false,
      phone: false,
      address: false,
      country: false,
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Validación p/ nombre
    if (e.target.name === "name") {
      if (e.target.value.length < 4 || !/^[A-Z]/.test(e.target.value)) {
        setNameError(
          "El nombre debe tener al menos 4 caracteres y empezar con mayúscula."
        );
      } else {
        setNameError("");
      }
    }

    // Validación p/ fono
    if (e.target.name === "phone") {
      if (!/^\d+$/.test(e.target.value)) {
        setPhoneError("Ingrese solo números para el teléfono.");
      } else {
        setPhoneError("");
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profilePicture: file });

    // Llama a la función de actualización del componente principal
    updateUserData({ profilePicture: file });
  };
  return (
    <form className={styles.form} onSubmit={handleSaveClick}>
      <div className={styles.title}>
        <h4>Modifica tus datos</h4>
      </div>

      <div className={styles.inputContainer}>
        <label className={styles.label} htmlFor="name">
          Nombre:
        </label>
        <TextField
          className={styles.input}
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={!editMode.name}
          variant="outlined"
          size="small"
        />
        {nameError && (
          <Typography className={styles.error}>{nameError}</Typography>
        )}
        <Button
          type="button"
          onClick={() => handleEditClick("name")}
          className={styles.editButton}
        >
          Editar
        </Button>
      </div>

      <div className={styles.inputContainer}>
        <label className={styles.label} htmlFor="phone">
          Teléfono:
        </label>
        <TextField
          className={styles.input}
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          disabled={!editMode.phone}
          variant="outlined"
          size="small"
        />
        {phoneError && (
          <Typography className={styles.error}>{phoneError}</Typography>
        )}
        <Button
          type="button"
          onClick={() => handleEditClick("phone")}
          className={styles.editButton}
        >
          Editar
        </Button>
      </div>

      <div className={styles.inputContainer}>
        <label className={styles.label} htmlFor="address">
          Dirección:
        </label>
        <TextField
          className={styles.input}
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          disabled={!editMode.address}
          variant="outlined"
          size="small"
        />
        <Button
          type="button"
          onClick={() => handleEditClick("address")}
          className={styles.editButton}
        >
          Editar
        </Button>
      </div>

      <div className={styles.inputContainer}>
        <label className={styles.label} htmlFor="country">
          Ciudad:
        </label>
        <TextField
          className={styles.input}
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          disabled={!editMode.country}
          variant="outlined"
          size="small"
        />
        <Button
          type="button"
          onClick={() => handleEditClick("country")}
          className={styles.editButton}
        >
          Editar
        </Button>
      </div>

      <Button type="submit" className={styles.saveButton}>
        Guardar Cambios
      </Button>

      {updateUserError && (
        <Typography className={styles.error}>
          Error al actualizar el usuario: {updateUserError.toString()}
        </Typography>
      )}
    </form>
  );
};

export default UserProfileForm;
