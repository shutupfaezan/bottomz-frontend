import './App.css';
import AllClubs from './components/UserComponents/AllClubs';
import AllEvents from './components/UserComponents/AllEvents';
import Login from './components/UserComponents/Login';
import HomePage from './components/LandingComponents/HomePage';
import SingularClubs from './components/UserComponents/SingularClubs';
import SingularEvents from './components/UserComponents/SingularEvents';
import HostWithUs from './components/UserComponents/HostWithUs';
import Checkout from './components/UserComponents/Checkout';
import PromoterLogin from './components/PromoterComponents/PromoterLogin';
import PromoterDasboard from './components/PromoterComponents/PromoterDasboard';
import AutoHost from './extra/AutoHost';
import PromoterOngoingOrders from './components/PromoterComponents/PromoterOngoingOrders';
import PromoterEventStat from './components/PromoterComponents/PromoterEventStat';
import TermsConditions from './components/UserComponents/TermsConditions';
import PrivacyPolicy from './components/UserComponents/PrivacyPolicy';
import TicketOutput from './components/UserComponents/TicketOutput';
import {
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import OrderHistory from './components/UserComponents/OrderHistory';
import PromoterQRScanner from './components/PromoterComponents/PromoterQRScanner';


function App() {
  return (
    <>
      <Router>
        <Routes>
        <Route exact path="/" element={<HomePage/>}>
        </Route>
        <Route exact path="/stranger-login" element={<Login/>}>
        </Route>
        <Route exact path="/clubs" element={<AllClubs/>}>
        </Route>
        <Route exact path="/events" element={<AllEvents/>}>
        </Route>
        <Route exact path="clubs/:name" element={<SingularClubs/>}>
        </Route>
        <Route exact path="events/:event_name" element={<SingularEvents/>}>
        </Route>
        <Route exact path="events/:event_name/confirmation" element={<TicketOutput/>}>
        </Route>
        <Route exact path="/contact-us" element={<HostWithUs/>}>
        </Route>
        <Route exact path="/events/:event_name/checkout" element={<Checkout/>}>
        </Route>
        <Route exact path="/terms-and-conditions" element={<TermsConditions/>}>
        </Route>
        <Route exact path="/privacy-policy" element={<PrivacyPolicy/>}>
        </Route>
        <Route exact path="/order-history" element={<OrderHistory/>}>
        </Route>
        <Route exact path="/order-history/:order_id" element={<TicketOutput/>}>
        </Route>
        <Route exact path="/promoter-login" element={<PromoterLogin/>}>
        </Route>
        <Route exact path="/promoter-dashboard" element={<PromoterDasboard/>}>
        </Route>
        <Route exact path="/promoter-events" element={<PromoterOngoingOrders/>}>
        </Route>
        <Route exact path="/host-an-event" element={<AutoHost/>}>
        </Route>
        <Route exact path="promoter-events/:event_name" element={<PromoterEventStat/>}>
        </Route>
        <Route exact path="/qr-scanner" element={<PromoterQRScanner/>}>
        </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App;
