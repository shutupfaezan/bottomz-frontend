import React, { useContext, useState } from 'react'
import { SingularContext } from '../contexts/Context';
import { useFormik } from 'formik'
import axios from 'axios';

export default function ForgotPasswordStep1() {
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
        onSubmit: (values) =>{
            setisLoading(true)
            axios.post(`https://nightlife-2710.herokuapp.com/forgot-password-pt1`, values)
            .then((response)=>{
                // console.log(response)
                setisLoading(false)
                setUserEmail(response?.data)
                setStage(2)
            })
            .catch((error)=>{
                setisLoading(false)
                console.log(error)
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
            console.log(error)
        })
    }
    function FinalChangeCall(){
        if(updatedPassword === confirmedPassword){
            setisLoading(true)
        axios.put(`https://nightlife-2710.herokuapp.com/update-password`, finalPassObj)
        .then((response)=>[
            sessionStorage.setItem("token", response?.data?.access_token),
            sessionStorage.setItem("username", response?.data?.User_name),
            setShow(false),
            setisLoading(false)
        ])
        .catch((error)=>{
            setisLoading(false)
            console.log(error)
        })
    }}


    return (
        <>
    <div className='m-4'>
    <h4 className='mb-4 text-center'><b>Forgot Password?</b></h4>
   {stage === 1 &&  <><p className='mb-0'><b>Enter Your registered Email Id</b></p>
    <small>*We'll send an otp to this email</small>
    <div className='position-relative mt-4'>
    <i class="fa-regular fa-envelope position-absolute" style={{fontSize: "25px", top: "5px", left: "10px"}}></i>
    <input className='w-100 py-1 pl-5' name="email_id" style={{width: "85%", border: "2px solid black"}} type="email" value={formik.values.email_id} id="email_id"  onChange={formik.handleChange}></input>
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
    <input className='w-50 py-1 text-center mx-auto' type="text" pattern='\d{0,6}' name="otp" maxLength="6" style={{border: "2px solid black", width: "50%", fontSize: "30px"}} onChange={event=>setOtpVal(parseInt(event.target.value))}></input>
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
    <small>Enter the password of your choice and confirm it to save the change your existing password</small>
    <div className='position-relative mt-4'>
    <i class="fa-solid fa-unlock position-absolute" style={{fontSize: "25px", top: "5px", left: "10px"}}></i>
    <input className='w-100 py-1 pl-5' name="new_password" placeholder="Enter the new password" style={{width: "85%"}} onChange={event=>setUpdatedPassword(event.target.value)}></input>
    </div>
    <div className='position-relative mt-4'>
    <i class="fa-solid fa-lock position-absolute" style={{fontSize: "25px", top: "5px", left: "10px"}}></i>
    <input className='w-100 py-1 pl-5'name="confirm_password"  placeholder="Re-enter the password to confirm" style={{width: "85%"}} onChange={event=>setConfirmPassword(event.target.value)}></input>
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
