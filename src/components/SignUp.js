import React from 'react'
import Input from '../common/Input'
import { useFormik } from 'formik'
import { useContext, useState } from 'react';
import { SingularContext } from '../contexts/Context';
import axios from 'axios'
import { Link } from 'react-router-dom'
import "../css/Login.css"

export default function SignUp() {
  const {setSignActive, setLoginActive, setShow} = useContext(SingularContext);
  const [isLoading, setisLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      email_id: "",
      password: "",
      contact: ""
    },
    onSubmit: (values)=> {
      setisLoading(true);
      axios.post("https://nightlife-2710.herokuapp.com/registration", values)
      .then((response)=>{
        localStorage.setItem('token', response.data.access_token)
        setisLoading(false);
        setShow(false)
      }
      )
      .catch(()=>{
        setisLoading(false)
      }
      )
    }
  })

  return ( 
      <div className='d-flex flex-column justify-content-center'>
        <h3 className="d-flex justify-content-center mt-5 mb-3">
          <strong>
            New User
          </strong>
        </h3>
        <div>
          <form>
            <Input name="name" type="text" value={formik.values.name} id="name" icon="fa-regular fa-user" handleChange={formik.handleChange} placeholder="Enter Your Name"/>
            <Input name="email_id" type="email" value={formik.values.email_id} icon="fa-regular fa-at" id="email_id"  handleChange={formik.handleChange} placeholder="Enter Your Email"/>
            <Input name="password" type="password" value={formik.values.password} id="password" bi bi-lock-fill icon="bi bi-lock-fill" handleChange={formik.handleChange} placeholder="Set a password!" icon2="bi bi-eye-fill position-relative" />
            <Input name="contact" type="number" value={formik.values.contact} id="contact" icon="fa-regular fa-address-book" handleChange={formik.handleChange} placeholder="Enter Your Contact"/>
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
          <Link className='ml-4' style={{color: "gray"}} onClick={()=>{setSignActive(false); setLoginActive(true)}}>Already a User? Log In</Link>
        </div>
      </div>
  )
}
