import React from 'react'
import GlobalHeader from '../../common/GlobalHeader'
import Footer from '../../common/Footer'

export default function TermsConditions() {
  return (
    <div className='bg-light position-relative'>
        <GlobalHeader/>
        <div className='p-lg-5 mx-lg-5 p-md-4 mx-md-4 p-4'>
            <h2 className='primary-header mt-4 mb-5 text-center' style={{color: 'crimson'}}>
                Terms & Conditions
            </h2>
            <div>
                <ul className='pl-3'>
                    <li className="mb-4" style={{color: "black"}}>Definitions In these terms and conditions, the following definitions apply: 
                        <p className='m-2'>- “We,” “us,” and “our” refers to the owners and operators of the club event booking platform.</p>
                        <p className='m-2'>- “You” and “your” refers to the person or organization using our platform.</p>
                        <p className='m-2'>- “Club” refers to the venue where the event will take place.</p>
                        <p className='m-2'>- “Event” refers to the function, gathering or party that will take place at the Club.</p> 
                        <p className='m-2'>- “Booking” refers to the reservation made on our platform for the event at the Club.</p>
                    </li>
                    <li className="mb-4" style={{color: "black"}}><h5 style={{fontWeight: "800"}} >Scope of Service:</h5><p>- Our platform provides a booking service for events to be held at clubs. You can browse the platform to find available clubs and make bookings for your desired event. We will provide you with confirmation of your booking and any further details you need.</p>
                    </li>
                    <li className="mb-4" style={{color: "black"}}><h5 style={{fontWeight: "800"}} >Booking Policy:</h5>
                        <p className='m-2'>- All bookings must be made through our platform and are subject to availability.</p>
                        <p className='m-2'>- You must pay a deposit to secure your booking. The deposit is non-refundable.</p>
                        <p className='m-2'>- You must pay the full amount for the booking in advance of the event. Failure to do so may result in the cancellation of the booking.</p>
                        <p className='m-2'>- Any cancellations or changes to the booking must be made in writing and will be subject to our cancellation policy.</p>
                    </li>
                    <li className="mb-4" style={{color: "black"}}><h5 style={{fontWeight: "800"}} >Cancellation Policy:</h5>
                        <p className='m-2'>- Cancellation Features have not been added in this version of the webapp so cancellation will not be allowed in any circumstances.</p>
                    </li>
                    <li className="mb-4" style={{color: "black"}}><h5 style={{fontWeight: "800"}} >Club Policies:</h5>
                        <p className='m-2'>- You must comply with the club’s policies at all times during the event.</p>
                        <p className='m-2'>- The club reserves the right to refuse entry or remove anyone from the premises who breaches the club’s policies or acts in an inappropriate manner.</p>
                        <p className='m-2'>- Any damage caused to the club during the event will be the responsibility of the person who made the booking.</p>
                    </li>
                    <li className="mb-4" style={{color: "black"}}><h5 style={{fontWeight: "800"}} >Liability:</h5>
                        <p className='m-2'>-  We are not liable for any loss or damage caused as a result of your use of our platform or any bookings made through our platform.</p>
                        <p className='m-2'>- We are not liable for any loss or damage caused as a result of the club’s policies or actions.</p>
                    </li>
                    <li className="mb-4" style={{color: "black"}}><h5 style={{fontWeight: "800"}} >Intellectual Property:</h5>
                        <p className='m-2'>- All content on our platform, including text, images, and logos, is the property of the owners and operators of the club event booking platform and is protected by copyright laws.</p>
                        <p className='m-2'>- You may not use any content on our platform without our prior written consent.</p>
                    </li>
                    <li className="mb-4" style={{color: "black"}}><h5 style={{fontWeight: "800"}} >Privacy Policy:</h5>
                        <p className='m-2'>- We will collect and use your personal information in accordance with our Privacy Policy, which is available on our platform.</p>
                        <p className='m-2'>- Read more on <a style={{color: "crimson"}} href="#/privacy-policy">Privacy Policy</a></p>
                    </li>
                    <li className="mb-4" style={{color: "black"}}><h5 style={{fontWeight: "800"}} >Governing Law and Jurisdiction:</h5>
                        <p className='m-2'>- These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which we operate.</p>
                        <p className='m-2'>- Any disputes arising out of or in connection with these terms and conditions shall be subject to the exclusive jurisdiction of the courts in that jurisdiction.</p>
                    </li>
                    <li className="mb-4" style={{color: "black"}}><h5 style={{fontWeight: "800"}} >Amendments:</h5>
                        <p className='m-2'>- We reserve the right to amend these terms and conditions at any time and without notice.</p>
                        <p className='m-2'>- Your continued use of our platform following any amendments indicates your acceptance of the amended terms and conditions.</p>
                    </li>
                </ul>
            <p style={{fontSize: "18px"}}>If you have any questions or concerns about the Terms & Conditions, please contact us at <a href='/'>info@bottmzup.com</a></p>
                <h4 className='primary-header mt-4' style={{color: "crimson"}}>By using our club event booking platform, you agree to these terms and conditions. If you do not agree with any of the given terms and conditions, please contact us to clear any doubts.</h4>
            </div>
        </div>
        <Footer/>
    </div>
  )
}
