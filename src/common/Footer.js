import React from 'react'
import "../css/Footer.css"
import { Link } from 'react-router-dom'

export default function Footer() {

  return (
    <section className="pt-5 pb-4 d-flex flex-column position-relative w-100 justify-content-md-end text-white" style={{fontSize: "14px", background: "#01040D", bottom: "0"}}>
   		<div className="d-flex flex-column flex-lg-row ml-3 mr-0">
           <div className="col-xs-12 d-md-flex justify-content-center mt-md-4 mb-4 mb-md-0 pt-2 col-md-3">
            	<h1 className='primary-header'>Bottmzup</h1>
			</div>
			<div className="col-xs-12 p-0 py-md-5 col-lg-9 col-md-12 d-flex flex-column flex-md-row">
    	   	<div className='col-lg-3 col-md-3'>
    		    <div className="mb-md-3 mb-2"style={{fontSize: "1rem"}}>Explore</div>
    		    <ul className="list-unstyled">
    			 <li><Link style={{color: "white", fontSize: "0.875 rem", fontWeight: "400"}} to="/clubs">Clubs</Link></li>
    			 <li><Link style={{color: "white", fontSize: "0.875 rem", fontWeight: "400"}} to="/events">Events</Link></li>
    			 <li><Link style={{color: "white", fontSize: "0.875 rem", fontWeight: "400"}} to="/contact-us">Host With us</Link></li>
    			</ul>
    		</div>
    	   <div className='col-lg-3 col-md-3'>
    		    <div className="mbmd-3 mb-2" style={{fontSize: "1rem"}}>Information</div>
    		    <ul className="list-unstyled">
    			 <li><Link style={{color: "white", fontSize: "0.875 rem", fontWeight: "400"}} to="/terms-and-conditions">Terms and Conditions</Link></li>
    			 <li><Link style={{color: "white", fontSize: "0.875 rem", fontWeight: "400"}} to="" onClick={()=>{setShow(true); setSignActive(false); setLoginActive(true)}}>Log In</Link></li>
    			 <li><Link style={{color: "white", fontSize: "0.875 rem", fontWeight: "400"}} to="" onClick={()=>{setShow(true); setSignActive(true); setLoginActive(false)}}>Sign Up</Link></li>
    			</ul>
    		</div>
    	   <div className='col-lg-3 col-md-3'>
    		    <div className="mb-md-3 mb-2" style={{fontSize: "1rem"}}>For Businesses</div>
    		    <ul className="list-unstyled">
    			 <li><Link style={{color: "white", fontSize: "0.875 rem", fontWeight: "400"}} to="/privacy-policy">Privacy Policy</Link></li>
    			 <li><Link style={{color: "white", fontSize: "0.875 rem", fontWeight: "400"}} to="/contact-us">Contact Us</Link></li>
    			 <li><a style={{color: "white", fontSize: "0.875 rem", fontWeight: "400"}} href="https://business.bottmzup.com" rel="noopener noreferrer">Promoter Login</a></li>
    			</ul>
    		</div>
    	   <div className='col-lg-3 col-md-3'>
    		    <div className="mb-md-3 mb-2" style={{fontSize: "1rem"}}>Socials</div>
    		    <ul className="list-unstyled">
    			 <li><a style={{color: "white", fontSize: "0.875 rem", fontWeight: "400"}} target="_blank" rel="noreferrer" href="https://www.instagram.com/bottmzup/">Instagram</a></li>
    			 <li><a style={{color: "white", fontSize: "0.875 rem", fontWeight: "400"}} target="_blank" rel="noreferrer" href="https://www.linkedin.com/company/bottmzup/">LinkedIn</a></li>
    			 <li><a style={{color: "white", fontSize: "0.875 rem", fontWeight: "400"}} target="_blank" rel="noreferrer" href="mailto:info@bottmzup.com">Email</a></li>
    			</ul>
    		</div>
			</div>
       </div>
	   <hr className="mx-auto" style={{width: "90%"}}></hr>
	   <a className='mb-1 d-flex justify-content-end mr-4 mr-md-5 pr-lg-3' href="mailto:info@bottmzup.com" style={{color: "white"}}>info@bottmzup.com</a>
	</section>
  )
}
