import React from "react";
import Input from "../../../common/Input";
import { useFormik } from "formik";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../../../css/Signup.css";
import GoogleLoginFunc from "../../../common/GoogleLoginFunc";
import "../../../css/Signup.css";

export default function SignUp() {
  const navigate = useNavigate();
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
        {/* <img
          src="./images/new-signup-min.jpg"
          alt="sign-up"
          className="sign-up-img"
        /> */}
        <img src="./images/LOGO.svg" alt="logo" />
        <div className="welcome">
          <h2>Welcome!</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur. Malesuada parturient tellus
            laoreet tristique. Lorem massa augue pharetra augue.
          </p>
        </div>
      </div>
      <div className="sign-up-right">
        {/* <h3 className="d-flex mt-5 mb-4">
          <strong>New User</strong>
        </h3> */}
        <header className="sign-up-header">
          <img src="./images/LOGO.svg" alt="logo" style={{ height: "50px" }} />
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
                  // background:
                  //   formik.values.user_name &&
                  //   formik.values.email_id &&
                  //   formik.values.password &&
                  //   formik.values.contact
                  //     ? "rgba(255,255,255,0.8)"
                  //     : "#3B4456",
                  // color:
                  //   formik.values.user_name &&
                  //   formik.values.email_id &&
                  //   formik.values.password &&
                  //   formik.values.contact
                  //     ? "black"
                  //     : "white",
                  // padding: "16px",
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

              {/* <button
                type="submit"
                className="btn mb-2"
                style={{
                  width: "100%",
                  borderRadius: "120px",
                  background: "rgba(244, 244, 245, 0.10)",
                  color: "white",
                  padding: "15px",
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
                {!isLoading && (
                  <span
                    id="login-text-span"
                    className="d-flex align-items-center justify-content-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="23"
                      height="22"
                      viewBox="0 0 23 22"
                      fill="none"
                      className="mr-1"
                    >
                      <path
                        d="M21.1708 9.08759L12.197 9.08716C11.8007 9.08716 11.4795 9.40832 11.4795 9.80458V12.6713C11.4795 13.0675 11.8007 13.3887 12.1969 13.3887H17.2504C16.6971 14.8248 15.6642 16.0275 14.3465 16.7917L16.5013 20.5219C19.9579 18.5228 22.0015 15.0152 22.0015 11.0887C22.0015 10.5296 21.9603 10.13 21.8779 9.67993C21.8152 9.33802 21.5184 9.08759 21.1708 9.08759Z"
                        fill="#167EE6"
                      />
                      <path
                        d="M10.9992 17.6962C8.52611 17.6962 6.36713 16.345 5.20758 14.3455L1.47754 16.4954C3.37573 19.7853 6.93167 22.0007 10.9992 22.0007C12.9946 22.0007 14.8774 21.4634 16.4993 20.5272V20.522L14.3445 16.7918C13.3589 17.3635 12.2183 17.6962 10.9992 17.6962Z"
                        fill="#12B347"
                      />
                      <path
                        d="M16.5001 20.5271V20.522L14.3453 16.7917C13.3597 17.3634 12.2192 17.6961 11 17.6961V22.0006C12.9954 22.0006 14.8783 21.4633 16.5001 20.5271Z"
                        fill="#0F993E"
                      />
                      <path
                        d="M4.30447 11.0004C4.30447 9.78139 4.63714 8.64093 5.20868 7.65533L1.47864 5.50537C0.53721 7.1222 0 8.9999 0 11.0004C0 13.0009 0.53721 14.8786 1.47864 16.4954L5.20868 14.3455C4.63714 13.3599 4.30447 12.2194 4.30447 11.0004Z"
                        fill="#FFD500"
                      />
                      <path
                        d="M10.9992 4.30447C12.6119 4.30447 14.0932 4.87751 15.2503 5.83071C15.5357 6.06584 15.9506 6.04887 16.2121 5.7874L18.2433 3.75621C18.5399 3.45955 18.5188 2.97395 18.2019 2.69902C16.2633 1.01723 13.741 0 10.9992 0C6.93166 0 3.37573 2.2154 1.47754 5.50526L5.20758 7.65522C6.36713 5.6557 8.52611 4.30447 10.9992 4.30447Z"
                        fill="#FF4B26"
                      />
                      <path
                        d="M15.2511 5.83071C15.5365 6.06584 15.9515 6.04887 16.2129 5.7874L18.2441 3.75621C18.5407 3.45955 18.5196 2.97395 18.2027 2.69902C16.2641 1.01718 13.7418 0 11 0V4.30447C12.6127 4.30447 14.094 4.87751 15.2511 5.83071Z"
                        fill="#D93F21"
                      />
                    </svg>
                    Sign in with Google
                  </span>
                )}
              </button> */}
              <GoogleLoginFunc />
            </div>
          </form>
        </div>
        <div className="d-flex justify-content-center my-2">
          <Link
            className="ml-4"
            style={{ color: "gray" }}
            // onClick={navigate("/login")}
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
