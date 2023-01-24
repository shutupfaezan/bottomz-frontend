import { useFormik } from 'formik'
import { useState } from 'react';
  import React from 'react'
  import axios from 'axios'
import Input from '../common/Input'
  
  
  
  export default function HostAlternative() {
    const [isLoading, setisLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      email_id: "",
      contact: "",
      message: ""
    },
    onSubmit: (values)=> {
      // console.log()
      setisLoading(true);
      axios.post("noooo", values)
      .then((response)=>{
        setisLoading(false);
      }
      )
      .catch(()=>{
        setisLoading(false)
      }
      )
    }
  })

    return (
      <div>
        <form>
        <div className='d-flex flex-column ml-lg-2 ml-2' style={{width: "95%"}}><label className='m-0 ml-lg-3 ml-2' style={{color: "#361532"}}>Name:</label><Input name="name" placeholder="Eg:- Alan Carter" style={{width: "100%"}} value={formik.values.name} handleChange={formik.handleChange} type="text"/></div>
        <div className='d-flex flex-column ml-lg-2 ml-2' style={{width: "95%"}}><label className='m-0 ml-lg-3 ml-2' style={{color: "#361532"}}>Email:</label><Input name="email_id" placeholder="Eg: alancarter12@gmail.com" style={{width: "100%"}} value={formik.values.email_id} handleChange={formik.handleChange} type="email"/></div>
        <div className='d-flex flex-column ml-lg-2 ml-2' style={{width: "95%"}}><label className='m-0 ml-lg-3 ml-2' style={{color: "#361532"}}>Contact:</label><Input name="contact" placeholder="Eg:- 810421XXXX" style={{width: "100%"}} value={formik.values.contact} handleChange={formik.handleChange} type="number"/></div>
        <div className='d-flex flex-column ml-lg-2 ml-2' style={{width: "95%"}}><label  className='m-0 ml-lg-3 ml-2' style={{color: "#361532"}}>Message:</label><textarea name="message" className="form-control ml-lg-2" value={formik.values.message} style={{borderRadius: "20px", height: "100px"}} onChange={formik.handleChange} placeholder="Type something..." aria-label="With textarea"></textarea></div>
        <div className='d-flex'>
        <button type="submit" onClick={formik.handleSubmit} className="btn mt-3 ml-3" style={{borderRadius: "20px", color: "#7d10bf", border: "1px solid #7d10bf"}}>{isLoading && (<span id="login-loader-span" className="spinner-border spinner-border-sm mx-1" role="status" aria-hidden="true"></span>)}
        {isLoading && (<span id="login-loading-text-span">Loading</span>)}
        {!isLoading && <span id="login-text-span">Continue</span>}</button>
        </div>
        </form>
      </div>
    )
  }
  
  

