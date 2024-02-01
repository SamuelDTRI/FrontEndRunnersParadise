import "./App.css";
import NavBar from "./componentes/NavBar/navBar";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Landing from "./views/Landing/landing";
import Home from "./views/Home/home";
import Detail from "./views/Detail/detail";
import Create from "./componentes/Create/create";
import LogIn from "./componentes/LogInForm/LogIn";
import About from "./componentes/About/about";
import Registro from "./componentes/Register/Register";
import AdminDashboard from "./componentes/DashBoard Admin/dashBoard";
import UserDashboard from "./componentes/DashBoard Usuario/dashBoard";
import { AuthProvider } from "./componentes/AuthProvider/authProvider";
import Shopping from "./views/Shopping/Shopping";
import ProtectedRoute from "./GeneralLogin";
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
            <Route exact path="/shopping" component={Shopping} />
            <Route exact path="/unauthorized" component={Unauthorized} />
            <Route exact path="/configUser" component={UserDashboard} />
            <Route exact path="/configAdmin" component={AdminDashboard} />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
