import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./component/shared/header";
import Slider from "./component/home/slider";
import Card from "./component/home/card";
import Arrival from "./component/home/latestArrival";
import Featured from "./component/home/featured";
import Social from "./component/shared/social";
import Footer from "./component/shared/footer";
import FooterLine from "./component/shared/footerLine";
import CategorySlide from "./component/category/categorySlide";
import Category from "./component/category/category";
import Product from "./component/product/productDetail";
import Map from "./component/contact/map";
import Contact from "./component/contact/contactUs";
import Cart from "./component/cart/cart";
import { logoutUser } from "./actions/authActions";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/authActions";
import jwt_decode from "jwt-decode";
import { Provider } from "react-redux";
import store from "./store";
import Login from "./component/auth/login";
import Register from "./component/auth/register";
import Order from "./component/order/order";

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

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            element={[
              <Slider />,
              <Card />,
              <Arrival />,
              <Featured />,
              <Social />,
            ]}
          />
          <Route
            path="/category/:id"
            element={[<CategorySlide />, <Category />]}
          />
          <Route path="/product/:id" element={[<Product />, <Social />]} />
          <Route path="/contact" element={[<Map />, <Contact />, <Social />]} />
          <Route path="/cart" element={[<Cart />]} />
          <Route path="/orders" element={[<Order />]} />
          <Route path="/login" element={[<Login />]} />
          <Route path="/register" element={[<Register />]} />
          {/* <Link to={"/category/" + cat._id}>Visit Store</Link> */}
        </Routes>

        <Footer />
        <FooterLine />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
