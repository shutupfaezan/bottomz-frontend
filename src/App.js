import './App.css';
import React from 'react';
import { Helmet } from 'react-helmet';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import ScrollToTop from './components/UserComponents/ScrollToTop';
// import AllClubs from './components/UserComponents/AllClubs';
import AllEvents from './components/UserComponents/AllEvents';
import HomePage from './components/LandingComponents/HomePage';
import SingularClubs from './components/UserComponents/SingularClubs';
import SingularEvents from './components/UserComponents/SingularEvents';
import HostWithUs from './components/UserComponents/HostWithUs';
import Checkout from './components/UserComponents/Checkout';
import TermsConditions from './components/UserComponents/TermsConditions';
import PrivacyPolicy from './components/UserComponents/PrivacyPolicy';
import TicketOutput from './components/UserComponents/TicketOutput';
import OrderHistory from './components/UserComponents/OrderHistory';
import Login from './components/UserComponents/Login';
import SignUp from './components/UserComponents/SignUp';
import ForgotPassword from './common/ForgotPassword';


// Function To change title dynamically DO NOT TOUCH

function DynamicTitle() {
  const location = useLocation();
  const currentPath = location.pathname.replace(/^\//, ''); // Remove leading slash

  let pageTitle = "BottmzUp | Find The Best Events Near You | Eventing at it's finest"; // Default title

  if (currentPath !== '') {
    const segments = currentPath.split('/');
    const lastSegment = segments[segments.length - 1];
    const formattedSegment = decodeURIComponent(lastSegment.replace(/%20/g, ' '))
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    pageTitle = `BottmzUp | ${formattedSegment}`;
  }

  return (
    <Helmet>
      <title>{pageTitle}</title>
    </Helmet>
  );
}

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <DynamicTitle />
        <Routes basename="/">
          <Route exact path="/" element={<HomePage />} />
          {/* <Route exact path="/clubs" element={<AllClubs />} /> */}
          <Route exact path="/events" element={<AllEvents />} />
          <Route exact path="/clubs/:name" element={<SingularClubs />} />
          <Route exact path="/events/:event_name" element={<SingularEvents />} />
          <Route exact path="/events/:event_name/confirmation" element={<TicketOutput />} />
          <Route exact path="/contact-us" element={<HostWithUs />} />
          <Route exact path="/events/:event_name/checkout" element={<Checkout />} />
          <Route exact path="/terms-and-conditions" element={<TermsConditions />} />
          <Route exact path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/sign-up" element={<SignUp />} />
          <Route exact path="/forgot-password" element={<ForgotPassword />} />
          <Route exact path="/order-history" element={<OrderHistory />} />
          <Route exact path="/order-history/:order_id" element={<TicketOutput />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
