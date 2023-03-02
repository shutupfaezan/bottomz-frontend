import React from 'react'
import "../css/Footer.css"
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <section className="pt-5 pb-4 d-flex flex-column justify-content-md-end text-white" style={{fontSize: "14px", background: "#01040D"}}>
   		<div className="d-flex flex-column flex-lg-row ml-3 mr-0">
           <div className="col-xs-12 d-md-flex justify-content-center mt-md-4 mb-4 mb-md-0 pt-2 col-md-3">
            	<h1 className='primary-header'>Bottmzup</h1>
			</div>
			<div className="col-xs-12 p-0 py-md-5 col-lg-9 col-md-12 d-flex flex-column flex-md-row">
    	   	<div className='col-lg-3 col-md-3'>
    		    <div className="mb-md-3 mb-2"style={{fontSize: "1rem"}}>Explore</div>
    		    <ul className="list-unstyled">
    			 <li><Link style={{color: "white", fontSize: "0.875 rem", fontWeight: "400"}} to="/all-clubs">Clubs</Link></li>
    			 <li><Link style={{color: "white", fontSize: "0.875 rem", fontWeight: "400"}} to="/all-events">Events</Link></li>
    			 <li><Link style={{color: "white", fontSize: "0.875 rem", fontWeight: "400"}} to="/about-us">About us</Link></li>
    			</ul>
    		</div>
    	   <div className='col-lg-3 col-md-3'>
    		    <div className="mbmd-3 mb-2" style={{fontSize: "1rem"}}>Information</div>
    		    <ul className="list-unstyled">
    			 <li><Link style={{color: "white", fontSize: "0.875 rem", fontWeight: "400"}} to="/terms-and-conditions">Terms and Conditions</Link></li>
    			 <li><Link style={{color: "white", fontSize: "0.875 rem", fontWeight: "400"}} to="">Log In</Link></li>
    			 <li><Link style={{color: "white", fontSize: "0.875 rem", fontWeight: "400"}} to="">Sign Up</Link></li>
    			</ul>
    		</div>
    	   <div className='col-lg-3 col-md-3'>
    		    <div className="mb-md-3 mb-2" style={{fontSize: "1rem"}}>For Businesses</div>
    		    <ul className="list-unstyled">
    			 <li><Link style={{color: "white", fontSize: "0.875 rem", fontWeight: "400"}} to="/host-with-us">Host with us</Link></li>
    			 <li><Link style={{color: "white", fontSize: "0.875 rem", fontWeight: "400"}} to="/host-with-us">Contact Us</Link></li>
    			 <li><Link style={{color: "white", fontSize: "0.875 rem", fontWeight: "400"}} to="/promoter-login">Promoter Login</Link></li>
    			</ul>
    		</div>
    	   <div className='col-lg-3 col-md-3'>
    		    <div className="mb-md-3 mb-2" style={{fontSize: "1rem"}}>Socials</div>
    		    <ul className="list-unstyled">
    			 <li><Link style={{color: "white", fontSize: "0.875 rem", fontWeight: "400"}} to="maintenance.html">Instagram</Link></li>
    			 <li><Link style={{color: "white", fontSize: "0.875 rem", fontWeight: "400"}} to="about.html">Twitter</Link></li>
    			 <li><Link style={{color: "white", fontSize: "0.875 rem", fontWeight: "400"}} to="about.html">Email</Link></li>
    			</ul>
    		</div>
			</div>
       </div>
	   <hr className="mx-auto" style={{width: "90%"}}></hr>
	   <p className='mb-1 d-flex justify-content-end mr-4 mr-md-5 pr-lg-3'>info@bottomzup.com</p>
	</section>
  )
}
