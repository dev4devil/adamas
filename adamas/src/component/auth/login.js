import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";

function Login(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useSelector((state) => state.auth);
  const errors = useSelector((state) => state.errors);
  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password,
    };
    console.log("submit: ", userData);
    props.loginUser(userData);
    console.log(auth);
  };
  console.log(auth);
  const handleURL = () => {
    if (localStorage.getItem("url") != undefined) {
      navigate(localStorage.getItem("url"));
    } else {
      navigate("/");
    }
  };
  return (
    <>
      {!props.auth.isAuthenticated ? (
        <div className="container">
          <div
            style={{ marginTop: "4rem" }}
            className="row justify-content-center"
          >
            <div className="col-md-4">
              <h4>
                <b>Login</b>
              </h4>
              <form onSubmit={onSubmit} className="mb-4">
                <div className="form-group mb-2">
                  <label htmlFor="email">Email</label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    error={errors.email}
                    name="email"
                    type="email"
                    className={classnames("form-control", {
                      invalid: errors.email || errors.emailNotFound,
                    })}
                  />
                  <span className="text-danger">
                    {errors.email}
                    {errors.emailNotFound}
                  </span>
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="password">Password</label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    error={errors.password}
                    name="password"
                    type="password"
                    className={classnames("form-control", {
                      invalid: errors.password || errors.passwordincorrect,
                    })}
                  />
                  <span className="text-danger">
                    {errors.password}
                    {errors.passwordincorrect}
                  </span>
                </div>
                <div className="d-flex justify-content-end">
                  <button className="btn btn-primary btn-lg" type="submit">
                    Login
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
  return { auth: state.auth, errors: state.errors };
}
export default connect(mapStateToProps, { loginUser })(Login);
