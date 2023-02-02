import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <section className="pt-5 pb-4 d-flex flex-column justify-content-md-end" style={{minHeight: "325px", fontSize: "14px", maxHeight: "auto", background: "rgb(244 244 244)"}}>
   		<div className="pt-5 d-flex flex-column flex-lg-row ml-3 mr-0" style={{marginTop: "100px"}}>
           <div className="col-xs-12 mb-4 col-md-2">
            	<h4>Bottmzup</h4>
				<h5>&copy; 2023</h5>
    		</div>
			<div className="col-xs-12 p-0 col-lg-10 col-md-12 d-flex flex-column flex-md-row">
    	   	<div className='col-lg-3 col-md-3'>
    		    <h5>Explore</h5>
    		    <ul className="list-unstyled">
    			 <li><Link to="/all-clubs">Clubs</Link></li>
    			 <li><Link to="/all-events">Events</Link></li>
    			 <li><Link to="/about-us">About us</Link></li>
    			</ul>
    		</div>
    	   <div  className='col-lg-3 col-md-3'>
    		    <h5>Information</h5>
    		    <ul className="list-unstyled">
    			 <li><Link to="/terms-and-conditions">Terms and Conditions</Link></li>
    			 <li><Link to="">Log In</Link></li>
    			 <li><Link to="">Sign Up</Link></li>
    			</ul>
    		</div>
    	   <div  className='col-lg-3 col-md-3'>
    		    <h5>For Businesses</h5>
    		    <ul className="list-unstyled">
    			 <li><Link to="/host-with-us">Host with us</Link></li>
    			 <li><Link to="/host-with-us">Contact Us</Link></li>
    			 <li><Link to="about.html">Promoter Login</Link></li>
    			</ul>
    		</div>
    	   <div  className='col-lg-3 col-md-3'>
    		    <h5>Socials</h5>
    		    <ul className="list-unstyled">
    			 <li><Link to="maintenance.html">Instagram</Link></li>
    			 <li><Link to="about.html">Twitter</Link></li>
    			 <li><Link to="about.html">Email</Link></li>
    			</ul>
    		</div>
			</div>
       </div>
</section>
  )
}
