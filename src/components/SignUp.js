import React from 'react'
import Input from '../common/Input'
import { useFormik } from 'formik'
import { useContext } from 'react';
import { SingularContext } from '../contexts/Context';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import "../css/Login.css"

export default function SignUp() {
  const {setSignActive, setLoginActive} = useContext(SingularContext);
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      name: "",
      email_id: "",
      password: "",
      contact: ""
    },
    onSubmit: (values)=> {
      console.log(values)
      axios.post("https://nightlife-2710.herokuapp.com/registration", values)
      .then((response)=>{
        // localStorage.setItem('token', response.data.access_token)
        navigate("/")
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
            <Input name="password" type="password" value={formik.values.password} id="password" bi bi-lock-fill icon="bi bi-lock-fill" handleChange={formik.handleChange} placeholder="Set a password!"/>
            <Input name="contact" type="number" value={formik.values.contact} id="contact" icon="fa-regular fa-address-book" handleChange={formik.handleChange} placeholder="Enter Your Contact"/>
            <div className="mt-3 d-flex justify-content-center">
              <button type="submit" className="btn mb-3" style={{borderRadius: "20px", background: "#7d10bf", color: "white"}} onClick={formik.handleSubmit}>Sign Up</button>
            </div>
          </form>
        </div>
        <div className='d-flex my-3'>
          <Link className='ml-4'style={{color: "gray"}} onClick={()=>{setSignActive(false); setLoginActive(true)}}>Already a User? Log In</Link>
          {/* <Link className='mr-4 ml-auto' style={{color: "gray"}}>Forgot Password?</Link> */}
        </div>
      </div>
  )
}
