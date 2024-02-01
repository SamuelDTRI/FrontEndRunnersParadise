import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import { registerUser } from "../../redux/actions/actions";
import style from "./Login.module.css";
import { AuthContext } from "../AuthProvider/authProvider";

export default function LogIn(props) {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [isValid, setIsValid] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);
  const history = useHistory();
  console.log(userData);
  const userRegex = new RegExp("^[^s@]+@[^s@]+.[^s@]+$");
  const passwordRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[A-Za-zd$!%*#?&]{6,}$"
  );

  const validarBotonSubmit = () => {
    if (
      userRegex.test(userData.email) &&
      passwordRegex.test(userData.password)
    ) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  const clientID =
    "1066333447186-lrpcof1n2jm1vdfplai4k88lsfvkvo88.apps.googleusercontent.com";

  const handChangePass = (e) => {
    setUserData({
      ...userData,
      password: e.target.value,
    });
    validarBotonSubmit();
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      email: e.target.value,
    });
    validarBotonSubmit();
  };

  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        clientId: clientID,
      });
    };
    gapi.load("client:auth2", start);
  }, []);

  const onFailure = () => {
    setError("Algo salió mal");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://backendrunnersparadise-production.up.railway.app/users/login",
        userData
      );
      console.log("response:", response); // Update the URL to the correct endpoint
      const data = response.data;
      console.log("user data:", data);
      if (data) {
        setAuth({ token: data });
        history.push("/home");
        console.log(data);
      } else {
        setError("Error: The response is not an array of reviews");
      }
    } catch (error) {
      setError("Error al iniciar sesión:", error.message);
    }
  };

  useEffect(() => {
    console.log("Valor actualizado de auth:", auth);
  }, [auth]);

  const onSuccess = (response) => {
    console.log("Login Success: currentUser:", response.profileObj);
    const profile = response.profileObj;
    if (response) {
      dispatch(
        registerUser({
          name: "jaime",
          surName: "gallego",
          email: "jaimeGallego@gmail.com",
          password: "Test123.",
          admin: true,
        })
      );
    }
    setAuth({ token: response.profileObj });
    history.push("/home");
  };

  return (
    <>
      <div>
        <div className="row justify-content-center">
          <div className="col-md-4 ml-5 border mt-5 p-5">
            {error && (
              <div style={{ color: "red", margin: "10px 0" }}>{error}</div>
            )}
            <h2 className="text-center mb-4">Inicie sesión</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label" style={{ color: "black" }}>
                  Email:
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  value={userData.email}
                  onChange={handleChange}
                  placeholder="Escriba aquí su email"
                  style={{ height: "50px", fontSize: "16px" }}
                ></input>
              </div>
              <div className="mb-3">
                <label className="form-label" style={{ color: "black" }}>
                  Contraseña:
                </label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  value={userData.password}
                  onChange={handChangePass}
                  placeholder="Y aquí su contraseña..."
                  style={{ height: "50px", fontSize: "16px" }}
                ></input>
                {isValid ? (
                  <p>
                    La contraseña debe tener al menos 1 minúscula, 1 mayúscula,
                    1 dígito y 6 caracteres de longitud como mínimo
                  </p>
                ) : (
                  <p></p>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={!userData.password}
              >
                Log In
              </button>
            </form>
            <div className={style.google} style={{ margin: "20px" }}>
              <GoogleLogin
                clientId={clientID}
                onSuccess={onSuccess}
                onfailure={onFailure}
                cookiePolicy={"single_host_policy"}
                redirectUri={"http://localhost:5173/home"}
              />
            </div>
            <p className="text-center mt-3">¿No estás registrado aún?</p>
            <Link to="/register">
              <p className="text-center">
                <u>Regístrate aquí</u>
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
