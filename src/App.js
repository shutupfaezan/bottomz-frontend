import './App.css';
import AllClubs from './components/AllClubs';
import AllEvents from './components/AllEvents';
import Login from './components/Login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import HomePage from './components/HomePage';
import SingularClubs from './components/SingularClubs';
import SingularEvents from './components/SingularEvents';


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
        </Routes>
      </Router>
    </>
  )
}

export default App;
