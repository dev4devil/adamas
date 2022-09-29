import React, { Component, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect, useSelector } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

function Register(props) {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const auth = useSelector((state) => state.auth);
  const errors = useSelector((state) => state.errors);
  const handleURL = () => {
    if (localStorage.getItem("url") != undefined) {
      navigate(localStorage.getItem("url"));
    } else {
      navigate("/");
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      country: country,
      city: city,
      address: address,
      role: "customer",
      createdBy: "Self",
    };
    props.registerUser(newUser);
    console.log(newUser);
  };

  return (
    <>
      {!props.auth.isAuthenticated ? (
        <div className="container">
          <div
            style={{ marginTop: "4rem" }}
            className="row justify-content-center"
          >
            <div className="col-md-8">
              <h4>
                <b>Register</b>
              </h4>
              <form onSubmit={onSubmit} className="m-4">
                <div className="row mb-2">
                  <div className="form-group col-md-6">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      onChange={(e) => setFirstName(e.target.value)}
                      value={firstName}
                      error={errors.firstName}
                      name="firstName"
                      type="text"
                      className={classnames("form-control", {
                        invalid: errors.firstName,
                      })}
                    />
                    <span className="text-danger">{errors.firstName}</span>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      onChange={(e) => setLastName(e.target.value)}
                      value={lastName}
                      error={errors.lastName}
                      name="lastName"
                      type="text"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="form-group col-md-6">
                    <label htmlFor="email">Email</label>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      error={errors.email}
                      name="email"
                      type="email"
                      className={classnames("form-control", {
                        invalid: errors.email,
                      })}
                    />
                    <span className="text-danger">{errors.email}</span>
                  </div>

                  <div className="form-group col-md-6">
                    <label htmlFor="password">Password</label>
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      error={errors.password}
                      name="password"
                      type="password"
                      className={classnames("form-control", {
                        invalid: errors.password,
                      })}
                    />
                    <span className="text-danger">{errors.password}</span>
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="form-group col-md-6">
                    <label htmlFor="password">Confirm Password</label>
                    <input
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      value={confirmPassword}
                      error={errors.confirmPassword}
                      name="confirmPassword"
                      type="password"
                      className={classnames("form-control", {
                        invalid: errors.confirmPassword,
                      })}
                    />
                    <span className="text-danger">
                      {errors.confirmPassword}
                    </span>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="address">Address</label>
                    <input
                      onChange={(e) => setAddress(e.target.value)}
                      value={address}
                      error={errors.address}
                      name="firstName"
                      type="text"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="form-group col-md-6">
                    <label htmlFor="city">City</label>
                    <input
                      onChange={(e) => setCity(e.target.value)}
                      value={city}
                      error={errors.city}
                      name="firstName"
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="coutry">Country</label>
                    <input
                      onChange={(e) => setCountry(e.target.value)}
                      value={country}
                      error={errors.country}
                      name="firstName"
                      type="text"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <button className="btn btn-primary btn-lg" type="submit">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        handleURL()
      )}
    </>
  );
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
  return { auth: state.auth, errors: state.errors };
}
export default connect(mapStateToProps, { registerUser })(Register);
