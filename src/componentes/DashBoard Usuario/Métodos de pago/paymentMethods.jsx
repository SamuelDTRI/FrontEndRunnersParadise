import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import "./paymentMethods.css";
import Diners from "../../../assets/diners-club-international-tarjeta.png";
import MasterCard from "../../../assets/Master.jpg";
import Visa from "../../../assets/VisaT.png";
import Naranja from "../../../assets/Naranja.jpg";
import Amex from "../../../assets/Amex.jpg";
import Cabal from "../../../assets/cabal-logo.png";
import { AuthContext } from "../../AuthProvider/authProvider";
import { updateUserpay } from "../../../redux/actions/actions";

export default function PaymentMethods() {
  const dispatch = useDispatch();
  const { auth } = React.useContext(AuthContext);
  console.log(auth);
  const [selectedBrand, setSelectedBrand] = React.useState("");
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm();
  const handleKeyPress1 = (event) => {
    if (!/[0-9]/.test(event.key) || event.target.value.length >= 16) {
      event.preventDefault();
    }
  };

  const handleKeyPress2 = (event) => {
    if (!/[0-9]/.test(event.key) || event.target.value.length >= 3) {
      event.preventDefault();
    }
  };

  const onSubmit = (data, e) => {
    e.preventDefault();
    const toSend = {
      ...data,
      id: auth.token.id,
    };
    console.log(toSend);
    dispatch(updateUserpay(toSend));

    Object.keys(data).forEach((fieldName) => {
      setValue(fieldName, "");
    });
    setSelectedBrand(null);
  };

  const handleSelectChange = (event) => {
    setSelectedBrand(event.target.value);
  };

  return (
    <div className="whole">
      <div className="payment-container">
        <div className="payment-form">
          <h3>
            Aquí podrás gestionar los métodos de pago asociados a tu cuenta.
          </h3>
          <p>Podrás agregar tarjetas de crédito:</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label>Seleccione la marca de su tarjeta de crédito</label>
              <select
                {...register("marca", { required: true })}
                className="select-box"
                onChange={handleSelectChange}
              >
                <option value="">Seleccione una opción</option>
                <option value="Visa">Visa</option>
                <option value="MasterCard">MasterCard</option>
                <option value="Naranja">Naranja</option>
                <option value="American Express">American Express</option>
                <option value="Diners Club">Diners Club</option>
                <option value="Cabal">Cabal</option>
              </select>
              {errors.marca?.type === "required" && (
                <p className="error">
                  Por favor, seleccione una marca de Tarjeta de Crédito.
                </p>
              )}
            </div>

            <div className="form-group">
              <label>N° de tarjeta de crédito</label>
              <input
                type="text"
                onKeyPress={handleKeyPress1}
                {...register("nroTarjeta", { required: true, maxlength: 16 })}
                className="text-input"
              />
              {errors.nroTarjeta?.type === "required" && (
                <p className="error">
                  Por favor, ingrese el n° de su Tarjeta de Crédito.
                </p>
              )}
            </div>

            <div className="form-group">
              <label>CVV (Code Verification Value)</label>
              <p>*puedes verificarlo en el dorso de tu tarjeta*</p>
              <input
                type="text"
                onKeyPress={handleKeyPress2}
                {...register("cvv", { required: true, maxlength: 3 })}
                className="text-input"
              />
              {errors.cvv?.type === "required" && (
                <p className="error">
                  Por favor, ingrese el código de verificación al dorso de su
                  tarjeta de crédito.
                </p>
              )}
            </div>

            <h3 className="tarjeta">Tarjeta:</h3>
            {selectedBrand === "Visa" && (
              <img src={Visa} className="card"></img>
            )}
            {selectedBrand === "MasterCard" && (
              <img src={MasterCard} className="card"></img>
            )}
            {selectedBrand === "Naranja" && (
              <img src={Naranja} className="card"></img>
            )}
            {selectedBrand === "American Express" && (
              <img src={Amex} className="card"></img>
            )}
            {selectedBrand === "Diners Club" && (
              <img src={Diners} className="card"></img>
            )}
            {selectedBrand === "Cabal" && (
              <img src={Cabal} className="card"></img>
            )}
            <button type="submit" className="submit-button">
              Guardar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
