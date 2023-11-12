import React, { useState } from 'react'
import { useFormik } from "formik"
import axios from 'axios'
import "../../css/Newsletter.css"

export default function Newsletter() {
  const [isLoading, setIsLoading] = useState(false)
  const formik = useFormik({
    initialValues: {
      email_id: '',
    },
    onSubmit: (values) => {
      setIsLoading(true);
      axios
        .post(`https://nightlife-2710.herokuapp.com/newsletter`, values)
        .then(() => {
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    },
    validate: (values) => {
      const errors = {};

      if (!values.email_id) {
        errors.email_id = 'Email address is required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email_id)) {
        errors.email_id = 'Invalid email address';
      }

      return errors;
    },
  });

  const handleButtonClick = () => {
    // Mark fields as touched to trigger validation errors
    formik.setFieldTouched('email_id', true);

    // Check if there are any validation errors before submitting
    if (Object.keys(formik.errors).length === 0) {
      formik.handleSubmit();
    }
  };

  return (
    <section className='d-md-flex justify-content-center mx-2 flex-column NewsletterSection' style={{borderRadius: "20px", height: "550px"}}>
      <div className='px-lg-5 d-flex flex-column text-center pt-5'>
        <div className='ml-md-2 flex-wrap d-flex justify-content-center pt-md-4 pb-md-0 py-4 mb-lg-0 mb-md-5'>
          <h1 className='mr-2 headerFont' style={{fontWeight: "600"}}>SUBSCRIBE TO OUR NEWSLETTER</h1>
          <p className='my-md-1 my-2 ml-md-2 px-3' style={{color: "#9D9D9D", fontWeight: "400"}}>Get notifications of events in your area and exclusive discount codes</p>
        </div>
        <div className='d-flex flex-column justify-content-center mb-md-5 mb-lg-0'>
          <div className='d-flex col-10 col-md-10 col-lg-9 mt-lg-2 mx-auto flex-column flex-md-row justify-content-center px-lg-5 px-md-2 py-lg-5 px-0 flex-wrap mb-md-0 mb-5'>
            <div className='col-lg-9 col-md-9 p-0 px-md-3'>
              <input className="NewletterInput" style={{width: "100%", borderRadius: "60px", fontSize: "14px", padding: "13px 15px", background: "transparent", color: "white"}} name="email_id" id="email_id" value={formik.values.email_id} onChange={formik.handleChange} placeholder="Enter Your Email Address"></input>
            </div>
            <button className='col-md-3 col-lg-3 mx-lg-auto mx-lg-2 btn ml-lg-2 mt-md-2 mt-3 mt-md-0 btn-events' style={{borderRadius: "40px", fontWeight: "800"}}  type="submit" onClick={handleButtonClick}>
              {!isLoading && <span>Subscribe</span>}
              {isLoading && (<span id="login-loader-span" className="spinner-border spinner-border-sm mx-1" role="status" aria-hidden="true"></span>)}
              {isLoading && (<span id="login-loading-text-span">Loading</span>)}
            </button>
            {formik.touched.email_id && formik.errors.email_id && <div className='text-danger text-center pt-3'>{formik.errors.email_id}</div>}
          </div>
        </div>
      </div>
      <div className='col px-0 pb-lg-5 pt-md-4 pt-lg-0' style={{overflow: "hidden"}}> 
        <img className="newsletterImage" src={process.env.PUBLIC_URL + "/images/Newsletter_Img.png"} alt="newsletter here"></img>
      </div> 
    </section>
  )
}
