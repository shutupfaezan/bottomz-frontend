import React, { useContext, useState, useEffect } from 'react'
import Input from "../common/Input";
import { Link } from "react-router-dom";
import { SingularContext } from '../contexts/Context';
import { useFormik } from 'formik'
import moment from 'moment';
import axios from 'axios';



export default function ForgotPassword() {
  const [step, setStep] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(300);
    const [emailError, setEmailError] = useState(null)
    const [otpError, setOtpError] = useState(null)
    const [confirmPasswordError, setConfirmPasswordError] = useState(null)
    const {setShow} = useContext(SingularContext);
    const [isLoading, setisLoading] = useState(false);
    const [otpVal, setOtpVal] = useState(0)
    const [updatedPassword, setUpdatedPassword] = useState()
    const [confirmedPassword, setConfirmPassword] = useState()
    const [stage, setStage] = useState(1)
    const [userEmail, setUserEmail] = useState();

  const inputStyle = {
    display: "flex",
    padding: "8px 20px",
    gap: "12px",
    width: "100%",
  }

  const formik = useFormik({
    initialValues: {
        email_id: '',
    },
    validateOnChange: false,
    validateOnBlur: false,
    validate: (values) => {
        const errors = {};
        if (!values.email_id) {
          errors.email_id = "Required";
        } else if (!/\S+@\S+\.\S+/.test(values.email_id)) {
          errors.email_id = "Invalid email address";
        }
        return errors;
      },
    onSubmit: (values) =>{
        setisLoading(true)
        axios.post(`https://nightlife-2710.herokuapp.com/forgot-password`, values)
        .then((response)=>{
            // console.log(response)
            setisLoading(false)
            setUserEmail(response?.data)
            setStep(1)
        })
        .catch((error)=>{
            if (error?.response?.status === 403) {
                console.log(error?.response?.data?.detail)
                  setEmailError(error?.response?.data?.detail);
              }
              else{
                console.log(error)
              }
            setisLoading(false)
        })
    }
})

  return (
    <>
      <div className="p-5" style={{ background: "#0B0B0B", height: "auto" }}>
        <div className="d-flex justify-content-center py-5 my-5">
          <div
            className="col-lg-9 position-relative py-5"
            style={{ border: "1px solid rgba(255, 255, 255, 0.3)", borderRadius: "20px", height: "max-content"}}>

            {/* Stage 1*/}
            {step === 0 && (
              <>
                <div className="d-flex mx-auto rounded-circle my-4" style={{border: "1px solid rgba(255, 255, 255, 0.1)", width: "fit-content", background: "rgba(255, 255, 255, 0.07)"}}>
                  <img src={process.env.PUBLIC_URL + "./images/forgot-password 1.png"} alt="logo" style={{ width: "120px" }}/>
                </div>
                <div className="d-flex justify-content-center flex-column text-center">
                  <h4 className="text-white" style={{ fontWeight: "700" }}>
                    Forgot Password?
                  </h4>
                  <h6 className="text-white my-2" style={{ fontWeight: "700" }}>
                    No Worries! 😎
                  </h6>
                  <p className="my-2" style={{ fontWeight: "400", color: "rgba(255, 255, 255, 0.7)"}}>
                    We'll send an otp to this email
                  </p>
                </div>
                <div className="col-lg-6 mx-auto my-3">
                  <Input icon="fa-regular fa-envelope" style={inputStyle} placeholder="Email Address" type="email" name="email_id" value={formik.values.email_id} id="email_id" handleChange={formik.handleChange}/>
                  {formik.errors.email_id ? (
                    <div style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
                      {formik.errors.email_id}
                    </div>
                  ) : null}
                  {emailError && <div style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
                  {emailError}
                    </div>} 
                </div>
                <button type="submit" className="btn mt-5 py-3 col-lg-6 d-flex mx-auto justify-content-center" onClick={() => {formik.handleSubmit()}} style={{ borderRadius: "100px", background: "white", color: "black", fontWeight: "600", fontSize: "17px"}}>
                  Send
                </button>
                <div className="text-white mt-4 text-center">
                  <span>
                    Go back to{" "}
                    <Link
                      to="/login"
                      className="text-white"
                      style={{ textDecoration: "underline" }}
                    >
                      Sign In
                    </Link>
                  </span>
                </div>
              </>
            )}

            {/* Stage 2*/}
            {step === 1 && (
              <>
                <div
                  className="d-flex mx-auto rounded-circle my-4"
                  style={{ border: "1px solid rgba(255, 255, 255, 0.1)", width: "120px", height: "120px", background: "rgba(255, 255, 255, 0.07)"}}>
                  <img src={ process.env.PUBLIC_URL + "./images/forgot-password-2.svg"} alt="logo" style={{ width: "76px", margin: "0 auto" }}/>
                </div>
                <div className="d-flex justify-content-center flex-column text-center">
                  <h4 className="text-white" style={{ fontWeight: "700" }}>
                    Enter the OTP
                  </h4>
                  <h6 className="text-white my-2" style={{ fontWeight: "700" }}>
                    No Worries! 😎
                  </h6>
                  <p className="my-2" style={{ fontWeight: "400", color: "rgba(255, 255, 255, 0.7)",}}>
                    A 6-digit OTP has been sent to this email
                  </p>
                </div>
                <div className="col-lg-6 mx-auto my-3 d-flex flex-column p-1">
                  <div className="d-flex justify-content-space-between">
                    <div className="mx-2">
                      <Input maxLength={1} placeholder="" style={{ textAlign: "center" }} />
                    </div>
                    <div className="mx-2">
                      <Input maxLength={1} placeholder="" style={{ textAlign: "center" }}/>
                    </div>
                    <div className="mx-2">
                      <Input maxLength={1} placeholder="" style={{ textAlign: "center" }}/>
                    </div>
                    <div className="mx-2">
                      <Input maxLength={1} placeholder="" style={{ textAlign: "center" }}/>
                    </div>
                    <div className="mx-2">
                      <Input maxLength={1} placeholder="" style={{ textAlign: "center" }}/>
                    </div>
                    <div className="mx-2">
                      <Input maxLength={1} placeholder="" style={{ textAlign: "center" }}/>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn mt-5 py-3 col-lg-6 d-flex mx-auto justify-content-center"
                  style={{ borderRadius: "100px", background: "white", color: "black", fontWeight: "600", fontSize: "17px"}}
                  onClick={() => setStep((i) => i + 1)}>
                  Verify
                </button>
                <div className="text-white mt-4 text-center">
                  <span>
                    Go back to{" "}
                    <Link to="/login" className="text-white" style={{ textDecoration: "underline" }}>
                      Sign In
                    </Link>
                  </span>
                </div>
              </>
            )}

            {/* Stage 3*/}
            {
              step === 2 && (
                <>
                <div
                  className="d-flex mx-auto rounded-circle my-4"
                  style={{ border: "1px solid rgba(255, 255, 255, 0.1)", width: "120px", height: "120px", background: "rgba(255, 255, 255, 0.07)"}}>
                  <img src={ process.env.PUBLIC_URL + "./images/forgot-password-2.svg"} alt="logo" style={{ width: "76px", margin: "0 auto" }}/>
                </div>
                <div className="d-flex justify-content-center flex-column text-center">
                  <h4 className="text-white" style={{ fontWeight: "700" }}>
                  Create New Password
                  </h4>
                  <p className="my-2 col-lg-6 mx-auto" style={{ fontWeight: "400", color: "rgba(255, 255, 255, 0.7)",}}>
                  Password must include at least combination of 8 characters, numbers and special character
                  </p>
                </div>
                <div className="col-lg-6 mx-auto my-3 d-flex p-1">
                  <div className="d-flex flex-column col">
                    <div className="mx-2 mt-4">
                      <Input type="password" icon="fa-solid fa-lock" style={inputStyle} placeholder="New Password" icon2="fa-regular fa-eye" icon3="fa-regular fa-eye-slash" bi bi-lock-fill id="password" name="password"/>
                    </div>
                    <div className="mx-2 my-4">
                      <Input type="password" icon="fa-solid fa-lock" style={inputStyle} placeholder="Confirm Password" icon2="fa-regular fa-eye" icon3="fa-regular fa-eye-slash" bi bi-lock-fill id="password" name="password"/>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn mt-2 py-3 col-lg-6 d-flex mx-auto justify-content-center"
                  style={{ borderRadius: "100px", background: "white", color: "black", fontWeight: "600", fontSize: "17px"}}
                  onClick={() => setStep((i) => i + 1)}>
                  Continue
                </button>
                </>
              )
            }
            <img src="./images/LOGO.svg" alt="logo" className="col-lg-2 position-absolute" style={{ top: "30px" }}/>
          </div>
        </div>
      </div>
    </>
  );
}
