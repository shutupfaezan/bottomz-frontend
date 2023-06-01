import React, { useState } from 'react'
import Input from '../../common/Input'
import { useFormik } from "formik"
import axios from 'axios'

export default function Newsletter() {
  const [isLoading, setIsLoading] = useState(false)
  const formik = useFormik({
    initialValues: {
      email_id: ""
    },
    onSubmit: (values)=>{
      setIsLoading(true)
      axios.post(`https://nightlife-2710.herokuapp.com/newsletter`, values)
      .then(()=>{
        setIsLoading(false)
      })
      .catch((error)=>{
        console.log(error)
      })
    }
  })
  return (
    <section className='d-md-flex justify-content-center align-items-center py-5 px-auto container-xl' style={{borderRadius: "20px"}}>
      <div className='col-md-11 col px-md-5 py-5 d-flex flex-column text-center' style={{border: "2px solid black", borderRadius: "10px", boxShadow: "7px 7px rgb(205 207 209)"}}>
        <div className='ml-2 primary-header flex-wrap d-flex justify-content-center'><h1 className='primary-header mr-2'>Subscribe</h1><h1 style={{color: "transparent", WebkitTextStroke: "0.5px black"}} className='primary-header'>Newsletter</h1></div>
        <div className='d-flex flex-column justify-content-center'>
          <small className='m-0' style={{color: "#57577a", fontSize: "16px"}}>Nightlife Explore</small>
          <small className='my-md-2 my-3 ml-2' style={{color: "#57577a"}}>Get notifications of events in your area and exclusive discount codes</small>
          <div className='d-flex col-10 col-md-9 my-2 mx-auto flex-column flex-md-row justify-content-center'><Input style={{width: "100%"}} name="email_id" id="email_id" value={formik.values.email_id} handleChange={formik.handleChange} placeholder="Enter Email to Subscribe"></Input>
          <button className='col-md-3 col-6 mx-auto mx-md-2 btn btn-primary ml-2 mt-2 mt-md-0 btn-events' style={{height: "40px", borderRadius: "40px",background: "black"}}  type="submit" onClick={formik.handleSubmit}>
            {!isLoading && <span>Subscribe</span>}
            {isLoading && (<span id="login-loader-span" className="spinner-border spinner-border-sm mx-1" role="status" aria-hidden="true"></span>)}
            {isLoading && (<span id="login-loading-text-span">Loading</span>)}
          </button>
          </div>
        </div>
      </div>  
    </section>
  )
}
