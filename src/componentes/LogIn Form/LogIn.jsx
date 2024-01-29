import React, {useState} from 'react'
import NavBar from '../NavBar/navBar'
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function LogIn (props) {
 const [userName, setUserName] = useState('')
 const [password, setPassword] = useState('')
 const [esVálido, setEsVálido] = useState('')

 const userRegex = '^[^\s@]+@[^\s@]+\.[^\s@]+$'
 const passwordRegex = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$'

 const handChangePass = (e) =>{
    setPassword(e.target.value)
 }
 const handleChange = (e) => {
    setUserName(e.target.value)
 }

 const validarBotonSubmit = () => {
    if (userRegex.test(userName) && passwordRegex.test(password)){
        setEsVálido(true);
    } else {
        setEsVálido(false)
    }
 }

 return (
    <>
    <NavBar />
    <div className="container">
        <div className="row justify-content-start">
            <div className="col-md-4 ml-5">
              <h2 className="text-center mb-4">Inicie sesión</h2>
              <form>
                <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input type='text' className="form-control form-control-lg" value={userName} onChange={handleChange} placeholder='Escriba aquí su nombre de usuario' style={{height: '50px'}}></input>
                </div>
                <div className="mb-3">
                    <label className="form-label">Contraseña:</label>
                    <input type='password' className="form-control form-control-lg" value={password} onChange={handChangePass} placeholder='Y aquí su contraseña...' style={{height: '50px'}}></input>
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={!esVálido}>Iniciar Sesión</button>
              </form>
              <p className="text-center mt-3">¿No estás registrado aún?</p>
              <Link to='/register'><p className="text-center"><u>Regístrate aquí</u></p></Link>
            </div>
        </div>
    </div>
    </>
 )
}

//CAMBIO