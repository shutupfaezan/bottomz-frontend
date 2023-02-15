import React, {useState} from 'react'
import Input from '../../common/Input'
import { useFormik } from 'formik'
import axios from 'axios'
import {Link, useNavigate } from 'react-router-dom'

export default function PromoterLogin() {
  
  // ID: fm@gmail.com
  // PASSWORD: fm123

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
        <div className='svgbg' style={{height: "100vh"}}>
          <div className="container w-100 d-flex flex-column justify-content-center" style={{height: "100%"}}>       
            <div className='d-flex flex-column justify-content-center card p-4 p-md-5 align-self-center' style={{width: "fit-content"}}>
              <div className="d-flex flex-column justify-content-center mb-3 text-center">
                <h3 style={{fontWeight: "600"}}>
                Promoter/Club Log In
                </h3>
                <Link style={{color: 'gray'}} to="/host-with-us">Not a promoter? Be one now</Link>
              </div>
              <div className='d-flex justify-content-center'>
                <div className=' d-flex flex-column justify-content-center w-100'>
                  <Input icon="fa-sharp fa-solid fa-at" name="email_id" style={{marginTop: "10px"}} value={formik.values.email_id} id="email_id"  handleChange={formik.handleChange} placeholder="Enter the provided email"/>
                  <Input icon="fa-solid fa-unlock" name="password" value={formik.values.password} id="password"  handleChange={formik.handleChange} placeholder="Enter the provided password"/>
                  <div className=" mt-3 d-flex justify-content-center">
                    <button type="button" className="btn btn-primary" style={{borderRadius: "20px",}} onClick={formik.handleSubmit}>
                    {isLoading && (<span id="login-loader-span" className="spinner-border spinner-border-sm mx-1" role="status" aria-hidden="true"></span>)}
                    {isLoading && (<span id="login-loading-text-span">Loading</span>)}
                    {!isLoading && <span id="login-text-span">Continue</span>}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </>
  )
}