import React from "react";
import Input from "../../../common/Input";
import { useFormik } from "formik";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate  } from "react-router-dom";
import "../../../css/Signup.css";
import GoogleLoginFunc from "../../../common/GoogleLoginFunc";
import "../../../css/Signup.css";

export default function SignUp() {
  const navigate = useNavigate()
  const [isLoading, setisLoading] = useState(false);
  const [emailError, setEmailError] = useState();
  const [contactError, setContactError] = useState();
  const formik = useFormik({
    initialValues: {
      user_name: "",
      email_id: "",
      password: "",
      contact: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.user_name) {
        errors.user_name = "Required";
      }

      if (!values.email_id) {
        errors.email_id = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email_id)
      ) {
        errors.email_id = "Invalid email address";
      }

      if (!values.password) {
        errors.password = "Required";
      } else if (values.password.length < 8) {
        errors.password = "Password must be at least 8 characters long";
      }
      if (!values.contact) {
        errors.contact = "Required";
      } else if (!/^[789]\d{9}$/.test(values.contact)) {
        errors.contact = "Invalid contact number";
      }

      return errors;
    },
    onSubmit: (values) => {
      setEmailError(null);
      setContactError(null);
      setisLoading(true);
      axios
        .post("https://nightlife-2710.herokuapp.com/registration", values)
        .then((response) => {
          sessionStorage.setItem("token", response.data.access_token);
          sessionStorage.setItem("username", response?.data?.User_name);
          setisLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setisLoading(false);
          if (error.response.status === 401) {
            if (error.response.data.detail === "User Already Exists") {
              setEmailError("User Already Exists");
            } else if (
              error.response.data.detail === "Contact Already Exists"
            ) {
              setContactError("Contact Already Exists");
            } else {
              console.log(error);
            }
          } else {
            console.log(error);
          }
        });
    },
  });

  const inputStyle = {
    display: "flex",
    padding: "8px 20px",
    gap: "12px",
    width: "100%",
  };

  return (
    <div className="sign-up-main">
      <div className="sign-up-left">
        <img src="./images/LOGO.svg" alt="logo" className="col-lg-4"/>
        <div className="welcome">
          <h3>Welcome!</h3>
            <p>
            Lorem ipsum dolor sit amet consectetur. Malesuada parturient tellus
            laoreet tristique. Lorem massa augue pharetra augue.
            </p>
        </div>
      </div>
      <div className="sign-up-right mt-4">
        <header className="sign-up-header">
          <img src="./images/LOGO.svg" alt="logo" style={{height: "50px"}} />
          <h3>Sign up</h3>
          <p>Let's create your account</p>
        </header>
        <div>
          <form className="signup-form">
            <div>
              <div className="d-flex">
                <Input
                  name="user_name"
                  type="text"
                  value={formik.values.user_name}
                  style={inputStyle}
                  id="user_name"
                  icon="fa-regular fa-user"
                  handleChange={formik.handleChange}
                  placeholder="Enter Your Name"
                />
              </div>
              {formik.errors.user_name && formik.touched.user_name && (
                <small className="text-danger ml-2 mx-5 px-4">
                  {formik.errors.user_name}
                </small>
              )}
            </div>
            <div>
              <div className="d-flex">
                <Input
                  name="email_id"
                  type="email"
                  value={formik.values.email_id}
                  icon="fa-regular fa-envelope"
                  id="email_id"
                  style={inputStyle}
                  handleChange={formik.handleChange}
                  placeholder="Email address"
                />
              </div>
              {formik.errors.email_id && formik.touched.email_id && (
                <small className="text-danger ml-2 mx-5 px-4">
                  {formik.errors.email_id}
                </small>
              )}
              {emailError && (
                <small className="text-danger ml-2 mx-5 px-4">
                  {emailError}
                </small>
              )}
            </div>

            <div>
              <div className="d-flex">
                <Input
                  name="password"
                  type="password"
                  value={formik.values.password}
                  id="password"
                  style={inputStyle}
                  bi
                  bi-lock-fill
                  icon="fa-solid fa-lock"
                  handleChange={formik.handleChange}
                  placeholder="Set a password!"
                  icon2="fa-regular fa-eye"
                  icon3="fa-regular fa-eye-slash"
                />
              </div>
              {formik.errors.password && formik.touched.password && (
                <small className="text-danger ml-2 mx-5 px-4">
                  {formik.errors.password}
                </small>
              )}
            </div>
            <div>
              <div className="d-flex">
                <Input
                  name="contact"
                  type="number"
                  value={formik.values.contact}
                  id="contact"
                  style={{ ...inputStyle, marginBottom: "10px" }}
                  icon="fa-solid fa-phone"
                  handleChange={formik.handleChange}
                  placeholder="Phone number"
                />
              </div>
              {formik.errors.contact && formik.touched.contact && (
                <small className="text-danger ml-2 mx-5 px-4">
                  {formik.errors.contact}
                </small>
              )}
              {contactError && (
                <small className="text-danger ml-2 mx-5 px-4">
                  {contactError}
                </small>
              )}
            </div>
            <div
              className="d-flex flex-column justify-content-center align-items-center"
              style={{ marginTop: "20px", color: "white" }}
            >
              <button
                type="submit"
                className="btn"
                style={{
                  width: "100%",
                  borderRadius: "100px",
                  background: "rgba(255,255,255)",
                  fontWeight: "600",
                  color: "black",
                  padding: "16px",
                }}
                onClick={formik.handleSubmit}
              >
                {isLoading && (
                  <span
                    id="login-loader-span"
                    className="spinner-border spinner-border-sm mx-1"
                    role="status"
                    aria-hidden="true"
                  ></span>
                )}
                {isLoading && <span id="login-loading-text-span">Loading</span>}
                {!isLoading && <span id="login-text-span">Sign Up</span>}
              </button>

              <p className="my-4" style={{ color: "rgba(255,255,255,0.5)" }}>
                or sign up using
              </p>
            </div>
          </form>
              <GoogleLoginFunc />
        </div>
        <div className="d-flex justify-content-center my-2">
          <Link
            className="ml-4"
            style={{ color: "gray" }}
            to={"/login"}
          >
            Already have an account? <u style={{ color: "#fff" }}>Sign in</u>
          </Link>
        </div>
      </div>
      <button className="signup-close" onClick={() => navigate("/")}>
        &#x2715;
      </button>
    </div>
  );
}
