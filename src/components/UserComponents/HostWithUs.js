import React from 'react'
import GlobalHeader from '../../common/GlobalHeader'
import Footer from "../../common/Footer"
import { useFormik } from 'formik'
import Input from '../../common/Input'
import axios from 'axios'
import Breadcrumbs from '../../extra/Breadcrumb'
import "../../css/HostWithUs.css"
export default function HostWithUs() {

  const inputStyle = {
    display: "flex",
    padding: "8px 20px",
    gap: "12px",
    width: "100%",
    borderSelfStyles: "1px solid rgba(0, 0, 0, 0.4)" 
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      query_type: "",
      contact: null,
      description: ""
    },
    validateOnChange: false,
    validate: (values) => {
      const errors = {};

      if (!values.name) {
        errors.name = "Name is required";
      }

      if (!values.email) {
        errors.email = "Email is required";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "Please enter a valid email address";
      }

      if (!values.query_type || values.query_type === "Select") {
        errors.query_type = "Please select an enquiry type";
      }

      if (!values.contact) {
        errors.contact = "Contact number is required";
      } else if (isNaN(values.contact)) {
        errors.contact = "Please enter a valid contact number";
      }
      else if (!/^[789]\d{9}$/.test(values.contact)) {
        errors.contact = 'Invalid contact number';
      }

      if (!values.description) {
        errors.description = "Description is required";
      }

      return errors;
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
        <section className='position-relative p-1'>
          <div className='mb-4 mb-md-3 d-flex flex-column justify-content-end headerHeightModifier' style={{height: "350px", background: "black", borderRadius: '20px'}}>
            <div className='position-absolute d-none d-md-block' style={{top: "120px"}}>
                <Breadcrumbs/>
            </div>
            <div className='text-center mb-5 topHeading'>
              <h4 className="text-white px-4 px-md-0" style={{fontWeight: "700", textTransform: "uppercase"}}>Do you need help or have any questions?</h4>
              <p className="px-4 px-md-0 mt-3" style={{color: 'rgba(255, 255, 255, 0.5)'}}>Fill out this form and we will get back to you shortly!</p>
            </div>
          </div>
        </section>
        <section className='d-flex flex-column-reverse flex-md-row my-3 my-lg-5 my-md-0 pb-lg-5 pb-md-0 pt-3 px-md-4 px-lg-5'>
          <div className='col-lg-4 col-md-6 p-md-0 ContactCard' >
            <div className='p-4 mt-lg-4 mt-lg-4 mt-md-0 pl-md-3 d-flex flex-column col' style={{background: "rgba(15, 15, 15, 1)", borderRadius: "20px", height: "100%"}}>
              <h4 className='text-white px-3' style={{fontWeight: "700"}}>Contact Information</h4>
              <p className="px-3" style={{fontWeight:  "400", color: "rgba(255, 255, 255, 0.6)"}}>Contact us below to hear back from us.</p>
              <div className='position-absolute text-white d-flex flex-column px-3' style={{top: "50%", transform: "translateY(-50%)", gap: "15px", fontWeight: "400", fontSize: "14px"}}>
                <p><i class="fa-solid fa-phone-volume mr-3"></i> 8104217764</p>
                <p><i class="fa-solid fa-envelope mr-3"></i> info@bottmzup.com</p>
                <p><i class="fa-solid fa-location-dot mr-3"></i> 201/B, Vaishali Apts, Mazgaon Mumbai-10</p>
              </div>
              <div className='d-flex mt-auto  px-3' style={{columnGap: "20px"}}>
                <span className="d-flex p-2" style={{background: "white", width: "fit-content", borderRadius: "60px"}}><i class="fa-brands fa-instagram" style={{fontSize: "15px"}}></i></span>
                <span className="d-flex p-2" style={{background: "white", width: "fit-content", borderRadius: "60px"}}><i class="fa-brands fa-linkedin-in" style={{fontSize: "15px"}}></i></span>
                <span className="d-flex p-2" style={{background: "white", width: "fit-content", borderRadius: "60px"}}><i class="fa-solid fa-envelope" style={{fontSize: "15px"}}></i></span>
              </div>
              <img className="position-absolute w-100" style={{bottom: "0", left: "0"}} src={ process.env.PUBLIC_URL + "./images/Contactlines.png"} alt=""></img>
            <div>
              <img className="position-absolute"  style={{top: "0", right: "0"}} src={ process.env.PUBLIC_URL + "./images/Ellipse 23058.png"} alt=""></img>
              <img className="position-absolute"  style={{top: "0", right: "0"}} src={ process.env.PUBLIC_URL + "./images/Ellipse 23057.png"} alt=""></img>
              </div>
            </div>
          </div>
          <div className='pl-md-5 mt-4 pl-md-3 pl-2 pr-2 col-lg-8 pb-5'>
            <div className="d-flex p-3 flex-wrap pb-5" style={{rowGap: "35px"}}>
              <div className='d-flex flex-column col-lg-6 px-0 pr-lg-3 mb-2'>
                  <label className='ml-2 mb-1' style={{fontWeight: "400", fontSize: "14px", color: "rgba(0, 0, 0, 0.5)"}}>Name</label>
                  <Input name="name" handleChange={formik.handleChange} value={formik.values.name} placeholder="Enter Name" style={{...inputStyle, color: "black", iconColor: "rgba(0, 0, 0, 0.4)", fontSize: "14px"}} icon="fa-regular fa-user"></Input>
                  {formik.errors.name && (
                    <small className="text-danger ml-2">{formik.errors.name}</small>
                  )}
              </div>
              <div className='d-flex flex-column col-lg-6 px-0 pr-lg-3 mb-2'>
                  <label className='ml-2 mb-1' style={{fontWeight: "400", fontSize: "14px", color: "rgba(0, 0, 0, 0.5)"}}>Email</label>
                  <Input name="email" handleChange={formik.handleChange}  type="email" value={formik.values.email} placeholder="Enter Email" style={{...inputStyle, color: "black", iconColor: "rgba(0, 0, 0, 0.4)", fontSize: "14px"}} icon="fa-regular fa-envelope"></Input>
                  {formik.errors.email && (
                    <small className="text-danger ml-2">{formik.errors.email}</small>
                  )}
              </div>
              <div className='d-flex flex-column col-lg-6 px-0 pr-lg-3 mb-2'>
                  <label className='ml-2 mb-1' style={{fontWeight: "400", fontSize: "14px", color: "rgba(0, 0, 0, 0.5)"}}>Phone Number</label>
                  <Input name="contact" type='number' handleChange={formik.handleChange} value={formik.values.contact} placeholder="Enter Contact" style={{...inputStyle, color: "black", iconColor: "rgba(0, 0, 0, 0.4)", fontSize: "14px"}} icon="bi bi-telephone"></Input>
                  {formik.errors.contact && (
                    <small className="text-danger ml-2">{formik.errors.contact}</small>
                  )}
              </div>
              <div className='d-flex flex-column col-lg-6 px-0 pr-lg-3'>
                  <label className='ml-2 mb-1' style={{fontWeight: "400", fontSize: "14px", color: "rgba(0, 0, 0, 0.5)"}}>Choose Enquiry Type</label>
                  <div className='d-flex justify-content-center align-items-center'>
                  <select className="form-select w-100 px-3" name="query_type" id="query_type" onChange={formik.handleChange} value={formik.values.query_type} style={{borderTop: "none", borderLeft: "none", borderRight: "none", borderBottom: "1px solid rgba(0, 0, 0, 0.4)", ...inputStyle, padding: "15px 0px", fontSize: "14px", color: "black"}} >
                    <option value="" disabled>Select an enquiry type</option>
                    <option value="Ticket Trouble">Ticket Trouble</option>
                    <option value="Be a Promoter">Be a Promoter</option>
                    <option value="Forgot Promoter Credentails">Forgot Promoter Credentails</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Others">Others</option>
                  </select>
                  </div>
                  {formik.errors.query_type && (
                    <small className="text-danger ml-2">{formik.errors.query_type}</small>
                  )}
              </div>
              <div className='col pr-lg-3 p-0'>
                  <label className='ml-2 mb-1' style={{fontWeight: "400", fontSize: "14px", color: "rgba(0, 0, 0, 0.5)"}}>Description</label>
                  <textarea name="description" onChange={formik.handleChange} value={formik.values.description} placeholder="Breif explaination about the query" className="form-control" style={{color: "black", borderTop: "none", borderLeft: "none", borderRight: "none", borderBottom: "1px solid rgba(0, 0, 0, 0.4)", fontSize: "14px"}}></textarea>
                  {formik.errors.description && (
                    <small className="text-danger ml-2">{formik.errors.description}</small>
                  )}
              </div>
              <div className='d-flex w-100'>
                <button type="submit" className="btn mt-3 py-2 col-lg-3 text-white col-8 mx-auto mx-lg-0 ml-lg-auto" onClick={formik.handleSubmit} style={{background: "rgba(0, 0, 0, 1)", borderRadius: '60px'}}>Submit</button>
              </div>
              <div className='d-none d-lg-block'>
                <img className='position-absolute' style={{bottom: "40px", right: "220px"}} src={ process.env.PUBLIC_URL + "./images/Arrowvector.png"} alt=""></img>
                <p className="position-absolute text-center" style={{fontSize: "14px", bottom: "0px", right: "350px"}}>Fill the form <br/>and submit</p>
              </div>
            </div>
          </div>
        </section>
        <section className='mx-md-5 my-5 px-3 px-md-0'>
          <div className='pb-5 pt-3'  style={{background: "rgba(242, 242, 242, 1)", borderRadius: "15px"}}>
            <div className='px-md-5 px-3 mt-4'>
              <b>For trouble regarding mail on the purchases made:</b>
              <li className="mt-3 pl-3" style={{fontWeight: "100", color: "black"}}>The person who booked the ticket has a copy of it in the ticket section from the hamburger menu.</li>
            </div>
            <div className='px-md-5 px-3 mt-4'>
              <b>For requests regarding promoter access:</b>
              <div className="mt-3 pl-3">
                <li style={{fontWeight: "100", color: "black"}}>Submit a form with your email and query as "Be a promoter" and we'll reach out.</li>
                <li style={{fontWeight: "100", color: "black"}}>If you forgot your login info send a form for the same or call us (if urgent) and we'll reach out.</li>
                <li style={{fontWeight: "100", color: "black"}}>Incase of any issues or urgent requests/queries contect us on <a style={{textDecoration: "underline"}}  href="mailto:info@bottmzup.com"  target="_blank" rel="noreferrer">info@bottmzup.com</a></li>
              </div>
            </div>
          </div>
        </section>
        <Footer/>
      </div>
    </>
  )
}
