import React from 'react'
import Input from '../../common/Input'
import { useFormik } from 'formik'
import { useContext, useState } from 'react';
import { SingularContext } from '../../contexts/Context';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

export default function SignUp() {
  const navigate = useNavigate()
  const {setShow} = useContext(SingularContext);
  const [isLoading, setisLoading] = useState(false);
  const [emailError, setEmailError] = useState()
  const [contactError, setContactError] = useState()
  const formik = useFormik({
    initialValues: {
      user_name: '',
      email_id: '',
      password: '',
      contact: '',
    },
    validate: (values) => {
      const errors = {};

      if (!values.user_name) {
        errors.user_name = 'Required';
      }

      if (!values.email_id) {
        errors.email_id = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email_id)) {
        errors.email_id = 'Invalid email address';
      }

      if (!values.password) {
        errors.password = 'Required';
      } else if (values.password.length < 8) {
        errors.password = 'Password must be at least 8 characters long';
      }
      if (!values.contact) {
        errors.contact = 'Required';
      } else if (!/^[789]\d{9}$/.test(values.contact)) {
        errors.contact = 'Invalid contact number';
      }

      return errors;
    },
    onSubmit: (values)=> {
      setEmailError(null)
      setContactError(null)
      setisLoading(true);
      axios.post("https://nightlife-2710.herokuapp.com/registration", values)
      .then((response)=>{
        sessionStorage.setItem('token', response.data.access_token)
        sessionStorage.setItem("username", response?.data?.User_name)
        setisLoading(false);
        setShow(false)  
        
      }
      )
      .catch((error)=>{
        console.log(error)
        setisLoading(false)
        if (error.response.status === 401) {
          if (error.response.data.detail === "User Already Exists") {
            setEmailError("User Already Exists");
          } else if (error.response.data.detail === "Contact Already Exists") {
            setContactError("Contact Already Exists");
          } else {
            console.log(error);
          }
        }
        else{
          console.log(error)
        }
      }
      )
    }
  })

  return ( 
      <div className='d-flex flex-column justify-content-center align-items-center'>
        <div className='col-md-6 m-md-5' style={{borderRadius: "10x", border: "1px solid black"}}>
        <h3 className="d-flex justify-content-center mt-5 mb-4">
          <strong>
            New User
          </strong>
        </h3>
        <div> 
          <form>
            <div className='mb-2'>
              <div className='d-flex justify-content-center'><Input name="user_name" type="text" value={formik.values.user_name} style={{width: "85%"}} id="user_name" icon="fa-regular fa-user" handleChange={formik.handleChange} placeholder="Enter Your Name"/></div>
            {formik.errors.user_name && formik.touched.user_name &&  (
              <small className="text-danger ml-2 mx-5 px-4">{formik.errors.user_name}</small>
            )}
            </div>

            <div className='mb-2'>
            <div className='d-flex justify-content-center'><Input name="email_id" type="email" value={formik.values.email_id} icon="fa-regular fa-at" id="email_id" style={{width: "85%"}}  handleChange={formik.handleChange} placeholder="Enter Your Email"/></div>
            {formik.errors.email_id && formik.touched.email_id && (
              <small className="text-danger ml-2 mx-5 px-4">{formik.errors.email_id}</small>
            )}
            {
              emailError && (<small className="text-danger ml-2 mx-5 px-4">{emailError}</small>)
            }
            </div>

            <div className='mb-2'>
            <div className='d-flex justify-content-center'><Input name="password" type="password" value={formik.values.password} id="password" style={{width: "85%"}} bi bi-lock-fill icon="bi bi-lock-fill" handleChange={formik.handleChange} placeholder="Set a password!" icon2="bi bi-eye-fill position-relative" icon3="bi bi-eye-slash-fill position-relative"/></div>
            {formik.errors.password  && formik.touched.password &&  (
              <small className="text-danger ml-2 mx-5 px-4">{formik.errors.password}</small>
            )}
            </div>
            <div className='mb-2'>
            <div className='d-flex justify-content-center'><Input name="contact" type="number" value={formik.values.contact} id="contact" style={{width: "85%"}} icon="fa-regular fa-address-book" handleChange={formik.handleChange} placeholder="Enter Your Contact"/></div>
            {formik.errors.contact && formik.touched.contact &&  (
              <small className="text-danger ml-2 mx-5 px-4">{formik.errors.contact}</small>
            )}
            {
              contactError && (<small className="text-danger ml-2 mx-5 px-4">{contactError}</small>)
            }
            </div>
            <div className="mt-3 d-flex justify-content-center">
              <button type="submit" className="btn mb-3" style={{borderRadius: "20px", background: "#7d10bf", color: "white"}} onClick={formik.handleSubmit}>
              {isLoading && (<span id="login-loader-span" className="spinner-border spinner-border-sm mx-1" role="status" aria-hidden="true"></span>)}
              {isLoading && (<span id="login-loading-text-span">Loading</span>)}
              {!isLoading && <span id="login-text-span">Sign Up</span>}
              </button>
            </div>
          </form>
        </div>
        <div className='d-flex my-3'>
          <Link className='ml-4' style={{color: "gray"}} onClick={navigate("/login")}>Already a User? Log In</Link>
        </div>
        </div>
      </div>
  )
}
