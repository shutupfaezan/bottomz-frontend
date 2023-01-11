import React from 'react'
import Input from '../common/Input'
import { useFormik } from 'formik'
import { useContext } from 'react';
import { SingularContext } from '../contexts/Context';
import axios from 'axios'
import { Link } from 'react-router-dom'
import "../css/Login.css"
import GoogleLoginFunc from '../common/GoogleLoginFunc'

export default function Login() {
  const {setSignActive, setLoginActive, setShow} = useContext(SingularContext);
  const formik = useFormik({
    initialValues: {
      email_id: "",
      password: ""
    },
    onSubmit: (values)=> {
      axios.post("https://nightlife-2710.herokuapp.com/login", values)
      .then((response)=>{
        localStorage.setItem('token', response.data.access_token)
        setShow(false)
      }
      )
    }
  })

  return ( 
      <div className='d-flex flex-column justify-content-center'>
        <h3 className="d-flex justify-content-center mt-5 mb-3">
          <strong>
          Log In
          </strong>
        </h3>
        <div className='d-flex mx-auto'>
          <GoogleLoginFunc/>
          <button type="button" className="btn btn-light" style={{border: "2px solid darkGray", borderRadius: "10px"}}><img src={process.env.PUBLIC_URL + "/images/apple-icon.png"} width="25px" alt=""/>Sign In</button>
        </div>
        <hr className='rounded mx-auto mt-3 hrsp' style={{width: "55%"}}/>
        <div>
          <form>
            <Input name="email_id" type="email" value={formik.values.email_id} id="email_id"  handleChange={formik.handleChange} placeholder="Enter Your Email"/>
            <Input name="password" type="password" value={formik.values.password} id="password"  handleChange={formik.handleChange} placeholder="Enter Your Password!" icon2="bi bi-eye-fill position-relative"/>
            <div className="mt-3 d-flex justify-content-center">
              <button type="submit" className="btn mb-3" style={{borderRadius: "20px", background: "#7d10bf", color: "white"}} onClick={formik.handleSubmit}>Continue</button>
            </div>
          </form>
        </div>
        <div className='d-flex my-3'>
          <Link className='ml-4'style={{color: "gray"}} onClick={()=>{setSignActive(true); setLoginActive(false)}}>Newbie? Sign Up</Link>
          <Link className='mr-4 ml-auto' style={{color: "gray"}}>Forgot Password?</Link>
        </div>
      </div>
  )
}
