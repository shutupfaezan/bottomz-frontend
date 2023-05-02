import React from 'react'
import Input from '../../common/Input'
import { useFormik } from 'formik'
import { useContext, useState } from 'react';
import { SingularContext } from '../../contexts/Context';
import axios from 'axios'
import { Link } from 'react-router-dom'
import GoogleLoginFunc from '../../common/GoogleLoginFunc'

export default function Login() {
  const {setSignActive, setLoginActive, setShow, setForgotStep1Show} = useContext(SingularContext);
  const [isLoading, setisLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email_id: '',
      password: '',
    },
    onSubmit: (values, { setSubmitting, setErrors }) => {
      let errors = {};
      if (!values.email_id) {
        errors.email_id = 'Email is required';
      }else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email_id)) {
        errors.email_id = 'Invalid email format';
      }
      
      if (!values.password) {
        errors.password = 'Password is required';
      }
      if (Object.keys(errors).length !== 0) {
        setErrors(errors);
        setisLoading(false)
        setSubmitting(false);
        return;
      }
      setisLoading(true)
      setSubmitting(true);
      axios.post('https://nightlife-2710.herokuapp.com/login', values)
        .then((response) => {
          sessionStorage.setItem('username', response?.data?.User_name);
          sessionStorage.setItem('token', response.data.access_token);
          setShow(false);
        })
        .catch((error) => {
          console.log(error)
          setErrors({
            password: error.response.data.detail
          });
        })
        .finally(() => {
          setisLoading(false)
          setSubmitting(false);
        });
    },
    
  });
  

  return (
      <div className='d-flex flex-column justify-content-center'>
        <h3 className="d-flex justify-content-center mt-5 mb-3">
          <strong>
          Log In
          </strong>
        </h3>
        <div className='d-flex mx-auto'>
          <GoogleLoginFunc/>
          {/* <button type="button" className="btn btn-light" style={{border: "2px solid darkGray", borderRadius: "10px"}}><img src={process.env.PUBLIC_URL + "/images/apple-icon.png"} width="25px" alt=""/>Sign In</button> */}
        </div>
        <hr className='rounded mx-auto mt-3 hrsp' style={{width: "55%"}}/>
        <div>
          <form>
            <div className=' mb-2'>
            <div className="d-flex justify-content-center"><Input name="email_id" style={{width: "85%"}} type="email" value={formik.values.email_id} id="email_id"  handleChange={formik.handleChange} placeholder="Enter Your Email" onBlur={formik.handleBlur}/></div>
            {formik.touched.email_id && formik.errors.email_id ? (
            <small className="text-danger mx-5">{formik.errors.email_id}</small>
          ) : null}
            </div>
        <div>
            <div className="d-flex justify-content-center"><Input name="password" style={{width: "85%"}} type="password" value={formik.values.password} id="password"  handleChange={formik.handleChange} placeholder="Enter Your Password!" icon2="bi bi-eye-fill position-relative" onBlur={formik.handleBlur} useInput={2}/></div>
            {formik.touched.password && formik.errors.password ? (
              <small className="text-danger mx-5">{formik.errors.password}</small>
            ) : null}
            </div>
            <div className="mt-3 d-flex justify-content-center">
              <button type="submit" className="btn mb-3" style={{borderRadius: "20px", background: "#7d10bf", color: "white"}} onClick={formik.handleSubmit} disabled={formik.isSubmitting}>
              {isLoading && (<span id="login-loader-span" className="spinner-border spinner-border-sm mx-1" role="status" aria-hidden="true"></span>)}
              {isLoading && (<span id="login-loading-text-span">Loading</span>)}
              {!isLoading && <span id="login-text-span">Continue</span>}
              </button>
            </div>
          </form>
        </div>
        <div className='d-flex my-3'>
          <Link className='ml-4'style={{color: "gray"}} onClick={()=>{setSignActive(true); setLoginActive(false)}}>Newbie? Sign Up</Link>
          <Link className='mr-4 ml-auto' style={{color: "gray"}} onClick={()=>{setForgotStep1Show(true); setLoginActive(false)}}>Forgot Password?</Link>
        </div>
      </div>
  )
}
