import React from "react";
import Input from "../../common/Input";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GoogleLoginFunc from "../../common/GoogleLoginFunc";
import "../../css/Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email_id: "",
      password: "",
    },
    onSubmit: (values, { setSubmitting, setErrors }) => {
      let errors = {};
      if (!values.email_id) {
        errors.email_id = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email_id)) {
        errors.email_id = "Invalid email format";
      }

      if (!values.password) {
        errors.password = "Password is required";
      }
      if (Object.keys(errors).length !== 0) {
        setErrors(errors);
        setisLoading(false);
        setSubmitting(false);
        return;
      }
      setisLoading(true);
      setSubmitting(true);
      axios
        .post("https://nightlife-2710.herokuapp.com/login", values)
        .then((response) => {
          sessionStorage.setItem("username", response?.data?.User_name);
          sessionStorage.setItem("token", response.data.access_token);
          navigate(-1)
          
        })
        .catch((error) => {
          console.log(error);
          setErrors({
            password: error.response.data.detail,
          });
        })
        .finally(() => {
          setisLoading(false);
          setSubmitting(false);
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
          <h2 className="headerFont mt-3">WELCOME BACK!</h2>
          <p className="m-0 mb-3 " style={{ color: "#ffffff", opacity: "0.6" }}>
            It's good to see you back. We have multiple events waiting for you,
            can't wait for you to catch up
          </p>
        </div>
      </div>
      <div className="col mt-lg-5 mt-md-0 mt-5 pt-lg-5 pr-lg-5 mr-lg-4 d-flex justify-content-center align-items-center">
        <div className="mr-lg-3 d-flex flex-column text-center p-lg-3" style={{ color: "#ffffff99" }}>
          <div className="mb-4">
            <h2 className="headerFont">Log In</h2>
            <p>Login to your account to see what is happening in your town</p>
          </div>
          <form className="d-flex flex-column" style={{ gap: "25px" }}>
            <div className="d-flex flex-column">
              <Input
                name="email_id"
                type="email"
                icon="fa-regular fa-envelope"
                id="email_id"
                style={inputStyle}
                placeholder="Email Address"
                value={formik.values.email_id}
                handleChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email_id && formik.errors.email_id ? (
                <small className="text-danger text-left ml-5 pl-4 mt-2">
                  {formik.errors.email_id}
                </small>
              ) : null}
            </div>
            <div className="d-flex flex-column">
              <Input
                name="password"
                type="password"
                id="password"
                style={inputStyle}
                bi
                bi-lock-fill
                icon="fa-solid fa-lock"
                placeholder="Password"
                icon2="fa-regular fa-eye"
                icon3="fa-regular fa-eye-slash"
                value={formik.values.password}
                handleChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <small className="text-danger text-left ml-5 pl-4 mt-2">
                  {formik.errors.password}
                </small>
              ) : null}
            </div>
            <a
              href="/forgot-password"
              className="text-right"
              style={{ color: "white" }}
            >
              Forgot Password?
            </a>
            <button
              type="submit"
              className="btn mt-3 py-3"
              style={{
                borderRadius: "100px",
                background: "white",
                color: "black",
                fontWeight: "600",
                fontSize: "17px",
              }}
              onClick={formik.handleSubmit}
              disabled={formik.isSubmitting}
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
              {!isLoading && <span id="login-text-span">Sign In</span>}
            </button>
          </form>
          <p className="my-4" style={{ color: "rgba(255,255,255,0.5)" }}>
            or sign up using
          </p>
          <GoogleLoginFunc />
          <div className="d-flex justify-content-center my-4">
            <span className="ml-4" style={{ color: "gray", textDecoration: "none"}}>Create an account?{" "}
              <u style={{ color: "#fff", cursor: "pointer" }} onClick={() => {navigate("/sign-up")}}>Sign Up</u>
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
