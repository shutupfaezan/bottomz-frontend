import React, { useState } from 'react'
import { useFormik } from "formik"
import axios from 'axios'

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
    <section className='d-md-flex justify-content-center mx-2 flex-column' style={{borderRadius: "20px", background: "black", height: "550px"}}>
      <div className='col px-md-5 d-flex flex-column text-center pt-5'>
        <div className='ml-2 flex-wrap d-flex justify-content-center pt-4'>
          <h1 className='mr-2 headerFont' style={{fontWeight: "600"}}>SUBSCRIBE TO OUR NEWSLETTER</h1>
          <p className='my-md-1 my-3 ml-2' style={{color: "#9D9D9D", fontWeight: "400"}}>Get notifications of events in your area and exclusive discount codes</p>
        </div>
        <div className='d-flex flex-column justify-content-center'>
          <div className='d-flex col-10 col-md-9 mt-2 mx-auto flex-column flex-md-row justify-content-center px-5 py-5 flex-wrap'>
            <div className='col-md-9'>
              <input style={{width: "100%", border: "1px solid white", borderRadius: "60px", fontSize: "14px", padding: "13px 15px", background: "transparent", color: "white"}} name="email_id" id="email_id" value={formik.values.email_id} onChange={formik.handleChange} placeholder="Enter Your Email Address"></input>
            </div>
            <button className='col-md-2 col-6 mx-auto mx-md-2 btn  ml-2 mt-2 mt-md-0 btn-events' style={{borderRadius: "40px",background: "white", color: "black", fontWeight: "800"}}  type="submit" onClick={handleButtonClick}>
              {!isLoading && <span>Subscribe</span>}
              {isLoading && (<span id="login-loader-span" className="spinner-border spinner-border-sm mx-1" role="status" aria-hidden="true"></span>)}
              {isLoading && (<span id="login-loading-text-span">Loading</span>)}
            </button>
            {formik.touched.email_id && formik.errors.email_id && <div className='text-danger text-center pt-3'>{formik.errors.email_id}</div>}
          </div>
        </div>
      </div>
      <div className='col px-0 pb-5'> 
        <img className="w-100" style={{height: "150px"}} src={process.env.PUBLIC_URL + "/images/Newsletter_Img.png"} alt="newsletter here"></img>
      </div> 
    </section>
  )
}
