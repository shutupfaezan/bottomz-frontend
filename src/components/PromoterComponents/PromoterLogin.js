import React, {useState} from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import {Link, useNavigate } from 'react-router-dom'

export default function PromoterLogin() {

  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email_id: "",
      password: ""
    },
    onSubmit: (values, { setSubmitting, setErrors })=> {
      let errors = {};
      // if (!values.email_id) {
      //   errors.email_id = 'Email is required';
      // }else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email_id)) {
      //   errors.email_id = 'Invalid email format';
      // }
      
      // if (!values.password) {
      //   errors.password = 'Password is required';
      // }
      if (Object.keys(errors).length !== 0) {
        setErrors(errors);
        setisLoading(false)
        setSubmitting(false);
        return;
      }
      setisLoading(true)
      axios.post("https://nightlife-2710.herokuapp.com/promoter-login", values)
      .then((response)=>{
        setisLoading(false)
        sessionStorage.setItem('promoter_token', response.data.access_token)
        navigate('/promoter-dashboard')
      }
      )
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
    }
  })
  return (
    <>
    <div className='vh-100 d-lg-flex'>
      <div className='col-lg-6 px-0' style={{background: "#F5F5F5", height: '100%'}}>
       <nav className="navbar align-items-center w-100 py-2 pt-md-3 px-3 px-lg-5 px-md-3 position-absolute" style={{backgroundColor: "#F5F5F5", color: "black", zIndex: "1"}}>
          <a className="py-3 py-md-1 px-md-5" style={{fontWeight: "800", color: "black"}} href="/"> <h3 className="primary-header m-0">BottmzUp</h3></a>
        </nav>
        <div className="d-flex flex-column px-md-5 px-lg-0" style={{height: "100%"}}>
          <div className='my-auto mb-5 px-lg-5'>
        <div className="py-2 py-md-2 px-3 px-lg-5 px-md-3">
            <h1 className="primary-header mb-0" style={{color: "transparent", WebkitTextStroke: "1px black"}}>Promoter/Club</h1>
            <h1 className="primary-header mb-0" style={{color: "black"}}>Log In</h1>
        </div>
        <div className="w-100 py-2 py-md-3 px-3 px-lg-5 px-md-3">
            <div className='col-lg-10 p-0 py-3 mb-0 py-md-1 d-flex flex-column'>
              <label className='mb-1' style={{fontSize: "14px"}}>Email:</label>
              <input className="p-lg-2 p-2" name="email_id" style={{border: "2px solid black", borderRadius: "10px",}} value={formik.values.email_id} id="email_id" onChange={formik.handleChange}></input>
              {formik.touched.email_id && formik.errors.email_id ? (
            <small className="text-danger mx-2">{formik.errors.email_id}</small>
          ) : null}
              </div>
            <div className='col-lg-10 p-0 py-0 mb-0 py-md-1 d-flex flex-column'> 
              <label className='mb-1' style={{fontSize: "14px"}}>Password:</label>
              <input className="p-lg-2 p-2" name="password" type="password" style={{border: "2px solid black", borderRadius: "10px"}} value={formik.values.password} id="password"  onChange={formik.handleChange}></input>
              {formik.touched.password && formik.errors.password ? (
              <small className="text-danger mx-2">{formik.errors.password}</small>
            ) : null}
            </div>
            <div className='col-lg-10 p-0 py-3 mb-0 mt-1 mt-lg-3 py-md-1 d-flex flex-column'>
              <button onClick={formik.handleSubmit} className='btn p-lg-2 p-3 text-white' style={{background: "black", borderRadius: "10px"}} disabled={formik.isSubmitting}>
              {isLoading && (<span id="login-loader-span" className="spinner-border spinner-border-sm mx-1" role="status" aria-hidden="true"></span>)}
                    {isLoading && (<span id="login-loading-text-span">LOADING</span>)}
                    {!isLoading && <span id="login-text-span">LOG IN</span>}
              </button>
            </div>
            <div className='col-lg-10 mt-3 d-flex justify-content-center '>
            <Link to="/host-with-us">Not a promoter? Be one now</Link>
            </div>
            </div>
          </div>
        </div>
      </div>
      <div className='col-lg-6 promoter-pic d-none d-lg-flex'>
      </div>
      <div className='col-lg-6 promoter-pic d-lg-none d-none d-md-block position-absolute' style={{height: "250px", top: "0"}}>
      </div>
    </div>
    </>
  )
}
