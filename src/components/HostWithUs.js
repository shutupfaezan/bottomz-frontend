import React from 'react'
import GlobalHeader from '../common/GlobalHeader'
import { useFormik } from 'formik'
import { useState } from 'react';
import axios from 'axios'
import Input from '../common/Input'


export default function HostWithUs() {
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
      <GlobalHeader/>
      <div className='d-lg-flex'>
      <div className='col-lg-7 pl-0 pr-3 mb-4'>
        <h3 className='mt-3 mb-4 ml-lg-3 ml-2' style={{color: "#88106f"}}>Host Your Event</h3>
        <div>
          <form>
            <div className='d-flex flex-column ml-lg-2 ml-2' style={{width: "95%"}}><label className='m-0 ml-lg-3 ml-2' style={{color: "#361532"}}>Name:</label><Input name="name" placeholder="Eg:- Faezan Makani" style={{width: "100%"}} value={formik.values.name} handleChange={formik.handleChange} type="text"/></div>
            <div className='d-flex flex-column ml-lg-2 ml-2' style={{width: "95%"}}><label className='m-0 ml-lg-3 ml-2' style={{color: "#361532"}}>Email:</label><Input name="email_id" placeholder="Eg:- faezanmakani13@gmail.com" style={{width: "100%"}} value={formik.values.email_id} handleChange={formik.handleChange} type="email"/></div>
            <div className='d-flex flex-column ml-lg-2 ml-2' style={{width: "95%"}}><label className='m-0 ml-lg-3 ml-2' style={{color: "#361532"}}>Contact:</label><Input name="contact" placeholder="Eg:- 810421XXXX" style={{width: "100%"}} value={formik.values.contact} handleChange={formik.handleChange} type="number"/></div>
            <div className='d-flex flex-column ml-lg-2 ml-2' style={{width: "95%"}}><label  className='m-0 ml-lg-3 ml-2' style={{color: "#361532"}}>Message:</label><textarea name="message" className="form-control ml-lg-2" value={formik.values.message} style={{borderRadius: "20px", height: "100px"}} onChange={formik.handleChange} placeholder="Type something..." aria-label="With textarea"></textarea></div>
            <div className='d-flex'>
              <button type="submit" onClick={formik.handleSubmit} className="btn mt-3 ml-3" style={{borderRadius: "20px", color: "#7d10bf", border: "1px solid #7d10bf"}}>{isLoading && (<span id="login-loader-span" className="spinner-border spinner-border-sm mx-1" role="status" aria-hidden="true"></span>)}
              {isLoading && (<span id="login-loading-text-span">Loading</span>)}
              {!isLoading && <span id="login-text-span">Continue</span>}</button>
              </div>
          </form>
        </div>
      </div>
      <div className='col-lg-5'>
      <h3 className='mt-3 mb-lg-5 mb-3' style={{color: "#88106f"}}>Contact Us</h3>
      <div className='d-flex align-items-center mb-2'><i class="fa-solid fa-phone mr-3" style={{fontSize: "17px"}}></i><h5 className='mb-1'>9892910090</h5></div>
      <div className='d-flex align-items-center mb-2'><i class="fa-solid fa-at mr-3" style={{fontSize: "17px"}}></i><h5 className='mb-1'>bottmzupevents@gmail.com</h5></div>
      <div className='d-flex align-items-start'><i class="fa-solid fa-location-dot mr-3" style={{fontSize: "17px"}}></i><h5 className='mb-1'>The Garage, Sun Mill Compound, 210, Senapati Bapat Marg, Lower Parel, Mumbai, Maharashtra 400013</h5></div>
      <div className='d-flex justify-content-start mt-3 ml-4 mb-4'><img src={process.env.PUBLIC_URL + "/images/garagelocation.png"} style={{width: "70%", height: "100%", borderRadius: "10px"}} alt=""></img></div>
      </div>
      </div>
    </div>
  )
}
