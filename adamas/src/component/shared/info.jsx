import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function Info(props) {
  const auth = props.auth;
  const cart = props.cart;
  const [product, setProduct] = useState(0);
  console.log(auth);
  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:8000/api/cart/count/${auth.user.id}`)
  //     .then((res) => {
  //       setProduct(res.data);
  //     })
  //     .catch((err) => {
  //       console.log("Error couldn't fetch your cart");
  //       console.log(err.message);
  //     });
  // }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/cart/count/${auth.user.id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log("Error couldn't fetch your cart");
        console.log(err.message);
      });
  }, [cart, auth.isAuthenticated]);
  return (
    <section className="info-section">
      <div className="container">
        <div className="row">
          <div className="col-sm-10 col-md-8">
            <ul className="ul-left">
              <li className="">
                <a href="/">
                  <i className="fa fa-mobile"></i>+92-3026589335
                </a>
              </li>
              <li className="">
                <a href="/">
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                  info@waseem.arhamsoft.org
                </a>
              </li>
              <li className="">
                <a href="/">
                  <i className="fa fa-clock-o" aria-hidden="true"></i>
                  Monday-Friday:10 to 7
                </a>
              </li>
            </ul>
          </div>
          <div className="col-sm-10 col-md-4 right-div">
            <ul className="ul-right">
              {!auth.isAuthenticated ? (
                <li>
                  <Link to={"/login"}>Sign in</Link>
                  <span>/</span>
                  <Link to={"/register"}>Register</Link>
                </li>
              ) : (
                <>
                  <DropdownButton
                    className="fontWhite"
                    variant="Primary"
                    title={"Welcome, " + auth.user.name.split(" ")[0]}
                  >
                    <Dropdown.Item eventKey="1">
                      <Link className="text-secondary" to="/orders">
                        {" "}
                        My Orders
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="text-secondary"
                      eventKey="2"
                      onClick={(e) => props.logoutUser()}
                    >
                      Sign Out
                    </Dropdown.Item>
                  </DropdownButton>
                  <li>
                    <Link to={"/cart"}>Your Cart ({product})</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
Info.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
  return { auth: state.auth, logoutUser: state.logoutUser, cart: state.cart };
}
export default connect(mapStateToProps, { logoutUser })(Info);
