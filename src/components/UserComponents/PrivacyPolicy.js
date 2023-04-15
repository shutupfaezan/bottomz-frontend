import React from 'react'
import GlobalHeader from '../../common/GlobalHeader'
import Footer from '../../common/Footer'


export default function PrivacyPolicy() {
  return (
    <div className='bg-light position-relative'>
    <GlobalHeader/>
    <div className='p-lg-5 mx-lg-5 p-md-4 mx-md-4 p-4'>
        <h2 className='primary-header mt-4 mb-5 text-center' style={{color: 'crimson'}}>
            Privacy Policy
        </h2>
        <div>
          <p className="mb-5 mb-md-4" style={{fontSize: "18px"}}>
          This Privacy Policy sets out how we, BottmzUp, collect, use, disclose, and protect your personal information when you use our website www.bottmzup.com By accessing or using the Website, you agree to this Privacy Policy.
          </p>
            <ul className='pl-3'>
                <li className="mb-4" style={{color: "black"}}>
                <h5 style={{fontWeight: "800"}} >Personal Information:</h5>
                <p>We Collect We collect personal information about you that you voluntarily provide to us, such as your name, email address, phone number, and billing information when you create an account, make a booking, or contact us. </p>
                </li>
                <li className="mb-4" style={{color: "black"}}><h5 style={{fontWeight: "800"}} >How We Use Your Personal Information:</h5>
                    <p>We use your personal information to provide our services to you, including processing your bookings, responding to your inquiries, and sending you marketing communications if you have opted-in to receive them. We may also use your information to improve our Website, to prevent and detect fraud and unauthorized access, and to comply with legal and regulatory requirements.</p>
                </li>
                <li className="mb-4" style={{color: "black"}}><h5 style={{fontWeight: "800"}} >Disclosure of Your Personal Information:</h5>
                    <p>We may disclose your personal information to our service providers who assist us in providing our services to you, such as payment processors, marketing providers, and website hosting providers. We may also disclose your information to our partners and affiliates who provide complementary services to our Website. We will not sell or rent your personal information to third parties for their marketing purposes.</p>
                </li>
                <li className="mb-4" style={{color: "black"}}><h5 style={{fontWeight: "800"}}>Your Choices Regarding Your Personal Information:</h5>
                    <p>You may access and update your personal information through your account settings. You may also unsubscribe from our marketing communications at any time by clicking the "unsubscribe" link in the email or by contacting us. However, we may still send you administrative communications, such as confirmations, notifications, and security alerts.</p>
                </li>
                <li className="mb-4" style={{color: "black"}}><h5 style={{fontWeight: "800"}}>Cookies and Similar Technologies:</h5>
                    <p>We use cookies and similar technologies to collect information about your use of the Website, such as your preferences and browsing history. You may disable cookies in your browser settings, but this may limit your ability to use certain features of the Website.</p>
                </li>
                <li className="mb-4" style={{color: "black"}}><h5 style={{fontWeight: "800"}}>Links to Third-Party Websites:</h5>
                    <p>The Website may contain links to third-party websites that are not owned or controlled by us. We are not responsible for the privacy practices of these websites, and we encourage you to review their privacy policies before providing any personal information.</p>
                </li>
                <li className="mb-4" style={{color: "black"}}><h5 style={{fontWeight: "800"}}>Changes to this Privacy Policy:</h5>
                    <p>We may update this Privacy Policy from time to time by posting a new version on the Website. We will notify you of any material changes by email or by posting a notice on the Website. Your continued use of the Website after any changes to this Privacy Policy will constitute your acceptance of such changes.</p>
                </li>
            </ul>
            <p style={{fontSize: "18px"}}>If you have any questions or concerns about this Privacy Policy, please contact us at <a href='/'>info@bottmzup.com</a></p>
            <h4 className='primary-header mt-4' style={{color: "crimson"}}>By using our ticketing platform, you agree to these Privacy Policies. If you do not agree with any of the given policies, please contact us to clear any doubts.</h4>
        </div>
    </div>
    <Footer/>
</div>
  )
}
