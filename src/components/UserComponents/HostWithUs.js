import React from 'react'
import GlobalHeader from '../../common/GlobalHeader'
import Footer from "../../common/Footer"
import { useFormik } from 'formik'
import Input from '../../common/Input'
import axios from 'axios'


export default function HostWithUs() {

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      query_type: "",
      contact: 0,
      description: ""
    },
    onSubmit: (values)=> {
      console.log(values)
      axios.post(`https://nightlife-2710.herokuapp.com/query`, values)
    }
  })
  return (
    <>
      <div className='100vh position-relative'>
        <GlobalHeader/>
        <section className='position-relative'>
          <div className='svgbg mb-4 mb-md-3' style={{height: "200px"}}></div>
          <div className='d-md-flex justify-content-center position-absolute align-items-center w-100 px-4' style={{top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
            <div className='d-flex justify-content-center flex-column text-center flex-md-row px-md-5 mx-lg-4 mx-md-2'>
              <div className='primary-header ml-2' style={{color: "transparent", WebkitTextStroke: "1px white", fontSize: "40px"}}>Get In Touch</div>
              <div className='primary-header ml-2 text-white' style={{fontSize: "40px"}}>With Us</div>
            </div>
          </div>
        </section>
        <section className='mx-md-5 my-4'>
          <div className='px-md-5 px-3'>
            <b>Do you need help or have any questions?</b>
            <p className="mt-1" style={{fontWeight: "100"}}>Fill out this form and we will get back to you shortly!</p>
          </div>
          <div className='px-md-5 mt-4 pl-md-3 pl-2 pr-2'>
            <div className="d-flex p-3 flex-wrap" style={{border: "2px solid black", borderRadius: "10px"}}>
              <div className='d-flex flex-column col-lg-6 px-0 pr-lg-3'>
                  <label className='ml-2 mb-1' style={{fontWeight: "400"}}>Name:</label>
                  <Input name="name" handleChange={formik.handleChange} value={formik.values.name} placeholder="Enter Name"></Input>
              </div>
              <div className='d-flex flex-column col-lg-6 px-0 pr-lg-3'>
                  <label className='ml-2 mb-1' style={{fontWeight: "400"}}>Choose Enquiry Type:</label>
                  <div className='mb-2 d-flex justify-content-center align-items-center'>
                  <select className="form-select w-100" name="query_type" id="query_type" onChange={formik.handleChange} value={formik.values.query_type} style={{border: "2px solid black", borderRadius: "10px", fontSize: "12px", padding: "10px"}}>
                    <option selected value="Select">Select</option>
                    <option value="Ticket Trouble">Ticket Trouble</option>
                    <option value="Be a Promoter">Be a Promoter</option>
                    <option value="Forgot Promoter Credentails">Forgot Promoter Credentails</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Others">Others</option>
                  </select>
                  </div>
              </div>
              <div className='d-flex flex-column col-lg-6 px-0 pr-lg-3'>
                  <label className='ml-2 mb-1' style={{fontWeight: "400"}}>Email:</label>
                  <Input name="email" handleChange={formik.handleChange}  type="email" value={formik.values.email} placeholder="Enter Email"></Input>
              </div>
              <div className='d-flex flex-column col-lg-6 px-0 pr-lg-3'>
                  <label className='ml-2 mb-1' style={{fontWeight: "400"}}>Phone:</label>
                  <Input name="contact" type='number' handleChange={formik.handleChange} value={formik.values.contact} placeholder="Enter Contact"></Input>
              </div>
              <div className='col pr-lg-3 p-0'>
                  <label className='ml-2 mb-1' style={{fontWeight: "400"}}>Description:</label>
                  <textarea name="description" onChange={formik.handleChange} value={formik.values.description} placeholder="About The Event" className="form-control" style={{borderRadius: "10px", height: "100px", border: "2px solid black"}}></textarea>
              </div>
              <div className='d-flex justify-content-center w-100'>
                <button type="submit" className="btn mt-3 col px-3 py-2 text-white" onClick={formik.handleSubmit} style={{background: "black", borderRadius: '10px'}}>Submit Form</button>
              </div>
            </div>
          </div>
          <div className='px-md-5 px-3 mt-4'>
            <b>For trouble regarding mail on the purchases made:</b>
            <li className="mt-1" style={{fontWeight: "100", color: "black"}}>The person who booked the ticket has a copy of it in the ticket section from the hamburger menu.</li>
          </div>
          <div className='px-md-5 px-3 mt-4'>
            <b>For requests regarding promoter access:</b>
            <li className="mt-1 mb-0" style={{fontWeight: "100", color: "black"}}>Submit a form with your email and query as "Be a promoter" and we'll reach out.</li>
            <li className="" style={{fontWeight: "100", color: "black"}}>If you forgot your login info send a form for the same or call us (if urgent) and we'll reach out.</li>
          </div>
        </section>
        <section className='mx-md-5 my-4'>
          <p className='px-md-5 px-3'>Incase of any issues or urgent requests/queries contect us on <a style={{color: "crimson"}}  href="/">info@bottmzup.com</a></p>
        </section>
        <Footer/>
      </div>
    </>
  )
}
