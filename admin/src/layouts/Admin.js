import React, { Component, useState } from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
import login from "components/auth/login";
import AdminNavbar from "components/Navbars/AdminNavbar";
// import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import routes from "routes.js";

// import { setCurrentUser, logoutUser } from "../actions/authActions";
import store from "../store";
// import jwt_decode from "jwt-decode";
// import setAuthToken from "../utils/setAuthToken";

import sidebarImage from "assets/img/sidebar-3.jpg";
// console.log(localStorage.jwtToken);
import { useSelector, connect } from "react-redux";

function Admin() {
  const auth = useSelector((state) => state.auth);
  const [image, setImage] = React.useState(sidebarImage);
  const [color, setColor] = React.useState("black");
  const [hasImage, setHasImage] = React.useState(true);

  const location = useLocation();
  const mainPanel = React.useRef(null);
  const getRoutes = (routes) => {
    // console.log(auth);
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return auth.user.role === "moderator" &&
          prop.path === "/user" ? null : (
          <Route
            path={prop.layout + prop.path}
            render={(props) => <prop.component {...props} />}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  React.useEffect(() => {
    if (auth.isAuthenticated) {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      mainPanel.current.scrollTop = 0;
      if (
        window.innerWidth < 993 &&
        document.documentElement.className.indexOf("nav-open") !== -1
      ) {
        document.documentElement.classList.toggle("nav-open");
        var element = document.getElementById("bodyClick");
        element.parentNode.removeChild(element);
      }
    }
  }, [location]);
  return (
    <>
      {auth.isAuthenticated ? (
        <div className="wrapper">
          <Sidebar
            color={color}
            image={hasImage ? image : ""}
            routes={routes}
          />
          <div className="main-panel" ref={mainPanel}>
            <AdminNavbar />
            <div className="content">
              <Switch>{getRoutes(routes)}</Switch>
            </div>
            {/* <Footer /> */}
          </div>
        </div>
      ) : (
        <Route to="/admin/login" component={login} />
      )}
    </>
  );
}

export default Admin;
