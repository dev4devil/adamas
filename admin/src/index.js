import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/animate.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "actions/authActions";
import jwt_decode from "jwt-decode";
import AdminLayout from "layouts/Admin.js";
import { Provider } from "react-redux";
import store from "./store";
// import login from "components/auth/login";

if (localStorage.jwtToken) {
  // console.log(localStorage.jwtToken);
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    // window.location.href = "./login";
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        <Redirect from="/" to="/admin" />
      </Switch>
    </BrowserRouter>
  </Provider>
);
