import "./App.css";
import NavBar from "./componentes/NavBar/navBar";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Landing from "./views/Landing/landing";
import Home from "./views/Home/home";
import Detail from "./views/Detail/detail";
import Create from "./componentes/Create/create";
import LogIn from "./componentes/LoginForm/Login";
import About from "./componentes/About/about";
import Registro from "./componentes/Register/Register";
import Perfil from "./componentes/perfilDeUsuario/perfil";
import Ajustes from "./componentes/Configuracion/configuracion";
import ProtectedRoute from "./GeneralLogin";
import { AuthProvider } from "./componentes/AuthProvider/authProvider";
import Unauthorized from "./views/Unauthorized/Unauthorized";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Route
            render={(props) => {
              if (props.location.pathname !== "/") {
                return <NavBar />;
              }
              return null;
            }}
          />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/home" component={Home} />
            <ProtectedRoute
              exact
              path="/create"
              component={Create}
              redirectUnauthorized={true}
            />
            <Route exact path="/login" component={LogIn} />
            <Route exact path="/about" component={About} />
            <Route exact path="/register" component={Registro} />
            <Route exact path="/detail/:id" component={Detail} />
            <Route exact path="/perfil" component={Perfil} />
            <Route exact path="/Configuracion" component={Ajustes} />
            <Route exact path="/unauthorized" component={Unauthorized} />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
