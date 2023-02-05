import './App.css';
import AllClubs from './components/AllClubs';
import AllEvents from './components/AllEvents';
import Login from './components/Login';
import {
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import HomePage from './components/HomePage';
import SingularClubs from './components/SingularClubs';
import SingularEvents from './components/SingularEvents';
import HostWithUs from './components/HostWithUs';
import Checkout from './components/Checkout';


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
        </Routes>
      </Router>
    </>
  )
}

export default App;
