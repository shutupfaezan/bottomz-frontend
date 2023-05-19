import React, { useContext, useState, useEffect } from 'react'
import { SingularContext } from '../contexts/Context';
import { useFormik } from 'formik'
import moment from 'moment';
import axios from 'axios';

export default function ForgotPasswordStep1() {
    const [timeRemaining, setTimeRemaining] = useState(300);
    const [emailError, setEmailError] = useState(null)
    const [otpError, setOtpError] = useState(null)
    const [confirmPasswordError, setConfirmPasswordError] = useState(null)
    const {setShow} = useContext(SingularContext);
    const [isLoading, setisLoading] = useState(false);
    const [otpVal, setOtpVal] = useState(0)
    const [updatedPassword, setUpdatedPassword] = useState()
    const [confirmedPassword, setConfirmPassword] = useState()
    const [ stage, setStage] = useState(1)
    const [userEmail, setUserEmail] = useState();
    
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
                setStage(2)
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
    
    const otpOrder = {
        "email_id": userEmail,
        "otp": otpVal,
    }
    const finalPassObj = {
        "new_password": confirmedPassword, 
        "email_id": userEmail,
    }

    function OtpSubmit(){
        setisLoading(true)
        axios.post(`https://nightlife-2710.herokuapp.com/verify-otp`, otpOrder)
        .then((response)=>{
            setisLoading(false);
            setStage(3)
    })
        .catch((error)=>{
            setisLoading(false)
            if (error?.response?.status === 403) {
                console.log(error?.response?.data?.detail)
                  setOtpError(error?.response?.data?.detail);
              }
              else{
                console.log(error)
              }
        })
    }
    function FinalChangeCall() {
        if (updatedPassword !== confirmedPassword) {
            setConfirmPasswordError("Passwords do not match.");
            return;
        }
    
        if (confirmedPassword.length < 8) {
            setConfirmPasswordError("Password must be at least 8 characters long.");
            return;
        }
        setisLoading(true);
        axios.put(`https://nightlife-2710.herokuapp.com/update-password`, finalPassObj)
            .then((response) => {
            sessionStorage.setItem("token", response?.data?.access_token);
            sessionStorage.setItem("username", response?.data?.User_name);
            setShow(false);
            setisLoading(false)
            })
            .catch((error) => {
                setisLoading(false);
                console.log(error);
            });
    }
    
    useEffect(() => {
        const intervalId = setInterval(() => {
          setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 1);
        }, 1000);
        
        if (timeRemaining === 0) {
          clearInterval(intervalId);
          setShow(false);
        }
        
        return () => clearInterval(intervalId);
      }, [timeRemaining, setShow]);

    return (
        <>
    <div className='m-4'>
    <h4 className='mb-4 text-center'><b>Forgot Password?</b></h4>
   {stage === 1 &&  <><p className='mb-0'><b>Enter Your registered Email Id</b></p>
    <small>*We'll send an otp to this email</small>
    <div className='position-relative mt-4'>
    <i className="fa-regular fa-envelope position-absolute" style={{fontSize: "25px", top: "10px", left: "10px"}}></i>
    <input className='w-100 py-2 pl-5' name="email_id" style={{width: "85%", border: "2px solid black", borderRadius: "10px"}} type="email" value={formik.values.email_id} id="email_id" onChange={formik.handleChange}></input>
    {formik.errors.email_id ? (
    <div style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
      {formik.errors.email_id}
    </div>
  ) : null}
  {emailError && <div style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
  {emailError}
    </div>} 
    </div>
    <div className="mt-3 d-flex justify-content-center">
        <button type="submit" className="btn mb-3" onClick={formik.handleSubmit} style={{borderRadius: "20px", background: "#7d10bf", color: "white"}}>
        {isLoading && (<span id="login-loader-span" className="spinner-border spinner-border-sm mx-1" role="status" aria-hidden="true"></span>)}
        {isLoading && (<span id="login-loading-text-span">Loading</span>)}
        {!isLoading && <span id="login-text-span">Continue</span>}
        </button>
    </div>
    </>}
   {stage === 2 &&  <><p className='mb-0 d-flex flex-column align-items-center' style={{fontWeight: '400'}}>A 6-digit OTP has been sent to <b>{userEmail && userEmail}</b></p>
    <div className='d-flex mt-4 flex-column'>
    <div className='text-center' style={{color: "crimson"}}>{moment.duration(timeRemaining, 'seconds').minutes()}:{moment.duration(timeRemaining, 'seconds').seconds().toString().padStart(2, '0')}</div>
    <input className='w-50 py-1 text-center mx-auto' type="text" pattern='\d{0,6}' name="otp" maxLength="6" style={{border: "2px solid black", width: "50%", fontSize: "30px"}} onChange={event=>setOtpVal(parseInt(event.target.value))}></input>
    {otpError && <div style={{ color: "red", fontSize: "14px", marginTop: "5px", textAlign: "center" }}>
  {otpError}
    </div>} 
    </div>
    <div className="mt-3 d-flex justify-content-center">
        <button type="submit" className="btn mb-3" onClick={OtpSubmit} style={{borderRadius: "20px", background: "#7d10bf", color: "white"}}>
        {isLoading && (<span id="login-loader-span" className="spinner-border spinner-border-sm mx-1" role="status" aria-hidden="true"></span>)}
        {isLoading && (<span id="login-loading-text-span">Loading</span>)}
        {!isLoading && <span id="login-text-span">Verify</span>}
        </button>
    </div>
    </>}
    {stage === 3 &&  <>
    <p className='mb-0'><b>Set up new password</b></p>
    <small>Enter the password of your choice and confirm it to save the changes to your existing password</small>
    <div className='position-relative mt-4'>
    <i className="fa-solid fa-unlock position-absolute" style={{fontSize: "25px", top: "10px", left: "10px"}}></i>
    <input className='w-100 py-2 pl-5' name="new_password" placeholder="Enter the new password" style={{width: "85%", border: "2px solid black", borderRadius: "10px"}} onChange={event=>setUpdatedPassword(event.target.value)}></input>
    </div>
    <div className='position-relative mt-4'>
    <i className="fa-solid fa-lock position-absolute" style={{fontSize: "25px", top: "10px", left: "10px"}}></i>
    <input className='w-100 py-2 pl-5'name="confirm_password"  placeholder="Re-enter the password to confirm" style={{width: "85%", border: "2px solid black", borderRadius: "10px"}} onChange={event=>setConfirmPassword(event.target.value)}></input>
    {confirmPasswordError && <div style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
    {confirmPasswordError}
    </div>}
    </div>
    <div className="mt-3 d-flex justify-content-center">
        <button type="submit" className="btn mb-3" onClick={FinalChangeCall} style={{borderRadius: "20px", background: "#7d10bf", color: "white"}}>
        {isLoading && (<span id="login-loader-span" className="spinner-border spinner-border-sm mx-1" role="status" aria-hidden="true"></span>)}
        {isLoading && (<span id="login-loading-text-span">Loading</span>)}
        {!isLoading && <span id="login-text-span">Change</span>}
        </button>
    </div>
    </>}
    </div>
    
    </>
  )
}
