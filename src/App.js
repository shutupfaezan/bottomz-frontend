import './App.css';
import AllClubs from './components/UserComponents/AllClubs';
import AllEvents from './components/UserComponents/AllEvents';
import Login from './components/UserComponents/Login';
import {
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import HomePage from './components/LandingComponents/HomePage';
import SingularClubs from './components/UserComponents/SingularClubs';
import SingularEvents from './components/UserComponents/SingularEvents';
import HostWithUs from './components/UserComponents/HostWithUs';
import Checkout from './components/UserComponents/Checkout';
import PromoterLogin from './components/PromoterComponents/PromoterLogin';
import PromoterDasboard from './components/PromoterComponents/PromoterDasboard';


function App() {
  return (
    <>
      <Router>
        <Routes>
        <Route exact path="/" element={<HomePage/>}>
        </Route>
        <Route exact path="/stranger-login" element={<Login/>}>
        </Route>
        <Route exact path="/all-clubs" element={<AllClubs/>}>
        </Route>
        <Route exact path="/all-events" element={<AllEvents/>}>
        </Route>
        <Route exact path="all-clubs/:name" element={<SingularClubs/>}>
        </Route>
        <Route exact path="all-events/:event_name" element={<SingularEvents/>}>
        </Route>
        <Route exact path="all-events/:event_name/:order_id" element={<Checkout/>}>
        </Route>
        <Route exact path="/host-with-us" element={<HostWithUs/>}>
        </Route>
        <Route exact path="/promoter-login" element={<PromoterLogin/>}>
        </Route>
        <Route exact path="/promoter-dashboard" element={<PromoterDasboard/>}>
        </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App;
