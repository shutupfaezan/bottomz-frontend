import React, {useState} from 'react'
import Input from '../../common/Input'
import { useFormik } from 'formik'
import axios from 'axios'
import {Link, useNavigate } from 'react-router-dom'
import { BrowserView, MobileView } from 'react-device-detect'

export default function PromoterLogin() {
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email_id: "",
      password: ""
    },
    onSubmit: (values)=> {
      setisLoading(true)
      axios.post("https://nightlife-2710.herokuapp.com/club-login", values)
      .then((response)=>{
        setisLoading(false)
        sessionStorage.setItem('token', response.data.access_token)
        navigate('/promoter-dashboard')
      }
      ).catch((response)=>{
        setisLoading(false)
        console.log(response)
      }
      )
    }
  })

  return (
        <>
          <nav className='d-flex flex-column justify-content-center position-absolute mt-3' style={{top: "0px", right: "0px", left: "0px"}}>
              <h1 className='d-flex justify-content-center' style={{color: "#014765"}}>Zap Events</h1>
              <h5 className='d-flex justify-content-center text-center'>An Event Management service from Bottmzup</h5>
          </nav>
          <div className="container w-100 d-flex flex-column justify-content-center vh-100" style={{height: "100%"}}>       
            <div className='d-flex flex-column justify-content-center'>
              <div className="d-flex flex-column justify-content-center mb-3 text-center">
                <h3 style={{fontWeight: "600"}}>
                Promoter/Club Log In
                </h3>
                <Link style={{color: 'gray'}} to="/host-with-us">Not a promoter? Be one now</Link>
              </div>
              <div className='d-flex justify-content-center'>
                <MobileView  className='d-flex flex-column justify-content-center w-100'>
                  <Input icon="fa-sharp fa-solid fa-at" name="email_id" style={{marginTop: "10px"}} value={formik.values.email_id} id="email_id"  handleChange={formik.handleChange} placeholder="Enter the provided email"/>
                  <Input icon="fa-solid fa-unlock" name="password" value={formik.values.password} id="password"  handleChange={formik.handleChange} placeholder="Enter the provided password"/>
                  <div className=" mt-3 d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary" style={{borderRadius: "20px"}} onClick={formik.handleSubmit}>
                    {isLoading && (<span id="login-loader-span" className="spinner-border spinner-border-sm mx-1" role="status" aria-hidden="true"></span>)}
                    {isLoading && (<span id="login-loading-text-span">Loading</span>)}
                    {!isLoading && <span id="login-text-span">Continue</span>}
                    </button>
                  </div>
                </MobileView>
                <BrowserView className=' d-flex flex-column justify-content-center w-25'>
                  <Input icon="fa-sharp fa-solid fa-at" name="email_id" style={{marginTop: "10px"}} value={formik.values.email_id} id="email_id"  handleChange={formik.handleChange} placeholder="Enter the provided email"/>
                  <Input icon="fa-solid fa-unlock" name="password" value={formik.values.password} id="password"  handleChange={formik.handleChange} placeholder="Enter the provided password"/>
                  <div className=" mt-3 d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary w-50" style={{borderRadius: "20px",}} onClick={formik.handleSubmit}>
                    {isLoading && (<span id="login-loader-span" className="spinner-border spinner-border-sm mx-1" role="status" aria-hidden="true"></span>)}
                    {isLoading && (<span id="login-loading-text-span">Loading</span>)}
                    {!isLoading && <span id="login-text-span">Continue</span>}
                    </button>
                  </div>
                </BrowserView>
              </div>
            </div>
          </div>
        </>
  )
}