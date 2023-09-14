import React from "react";
import Input from "../../common/Input";
import { useFormik } from "formik";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../../css/Signup.css";
import GoogleLoginFunc from "../../common/GoogleLoginFunc";
import "../../css/Signup.css";

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
        errors.user_name = "Name is Required";
      }

      if (!values.email_id) {
        errors.email_id = "Email is Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email_id)
      ) {
        errors.email_id = "Invalid email address";
      }

      if (!values.password) {
        errors.password = "Password is Required";
      } else if (values.password.length < 8) {
        errors.password = "Password must be at least 8 characters long";
      }
      if (!values.contact) {
        errors.contact = "Contact Info is Required";
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
          navigate("/")
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
    <div className="d-flex position-relative" style={{ backgroundColor: "#0B0B0B", color: "white", minHeight: "100vh", gap: "60px"}}>
      <div className="position-relative p-4 d-lg-block d-none m-3" style={{ flex: "0 0 52%", background: `url(${process.env.PUBLIC_URL + "/images/new-signup.png"}) no-repeat center 43%`, backgroundSize: "cover", borderRadius: "20px"}}>
        <img src="./images/LOGO.svg" alt="logo" className="col-lg-4" />
        <div className="col p-4" style={{ border: "1px solid #ffffff26", borderRadius: "15px", background: "#ffffff1a", backdropFilter: "blur(17px)", position: "sticky", bottom: "0px", top: "69vh", margin: "0 auto 25px"}}>
          <h2 className="headerFont mt-3">Welcome To The Club!</h2>
          <p className="m-0 mb-3 " style={{ color: "#ffffff", opacity: "0.6" }}>
            Its good to see you join us. Create an account to particpate in featured events. Have a great day!
          </p>
        </div>
      </div>
      <div className="col col-md-8 mx-auto col-lg mt-lg-5 mt-md-0 mt-5 pt-lg-5 pt-5 pr-lg-5 mr-lg-4 d-flex justify-content-center align-items-center">
        <div className="mr-lg-3 d-flex flex-column text-center py-lg-3 w-100" style={{ color: "#ffffff99" }}>
          <div className="mb-4">
            <h2 className="headerFont">Sign Up</h2>
            <p>Let's create your account</p>
          </div>
            <form className="d-flex flex-column" style={{gap: "25px"}}>
              <div className="d-flex flex-column">
                <div className="d-flex flex-column">
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
                  <small className="text-danger text-left ml-5 pl-4 mt-2">
                   {formik.errors.user_name}
                  </small>
                )}
              </div>
              <div className="d-flex flex-column">
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
                  <small className="text-danger text-left ml-5 pl-4 mt-2">
                    {formik.errors.email_id}
                  </small>
                )}
                {emailError && (
                  <small className="text-danger text-left ml-5 pl-4 mt-2">
                   Email is {emailError}
                  </small>
                )}
              </div>
              <div className="d-flex flex-column">
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
                  <small className="text-danger text-left ml-5 pl-4 mt-2">
                    {formik.errors.password}
                  </small>
                )}
              </div>
              <div className="d-flex flex-column">
                <div className="d-flex">
                  <Input
                    name="contact"
                    type="number"
                    value={formik.values.contact}
                    id="contact"
                    style={{ ...inputStyle}}
                    icon="fa-solid fa-phone"
                    handleChange={formik.handleChange}
                    placeholder="Phone number"
                  />
                </div>
                {formik.errors.contact && formik.touched.contact && (
                  <small className="text-danger text-left ml-5 pl-4 mt-2">
                    {formik.errors.contact}
                  </small>
                )}
                {contactError && (
                  <small className="text-danger text-left ml-5 pl-4 mt-2">
                    {contactError}
                  </small>
                )}
              </div>
              <div className="d-flex flex-column justify-content-center align-items-center" style={{ marginTop: "20px", color: "white" }}>
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
                  {isLoading && (
                    <span id="login-loading-text-span">Loading</span>
                  )}
                  {!isLoading && <span id="login-text-span">Sign Up</span>}
                </button>

                <p className="my-4" style={{ color: "rgba(255,255,255,0.5)" }}>
                  or sign up using
                </p>
              </div>
            </form>
            <GoogleLoginFunc />
            <div className="d-flex justify-content-center my-4">
            <span className="ml-4" style={{ color: "gray", textDecoration: "none"}}>Already have an account?{" "}
              <u style={{ color: "#fff", cursor: "pointer" }} onClick={() => {navigate("/login")}}>Sign In</u>
            </span>
          </div>
        </div>
      </div>
      <button
        className="position-absolute d-flex justify-content-center align-items-center"
        style={{ height: "36px", width: "36px", border: "solid white 1px", borderRadius: "50%", backgroundColor: "transparent", color: "white", top: "4%", right: "4%"}}
        onClick={() => {navigate("/");}}>
        &#x2715;
      </button>
    </div>
  );
}
