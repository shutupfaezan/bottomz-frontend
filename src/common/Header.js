import React from "react";
import "../css/Header.css"
import GlobalHeader from "./GlobalHeader";
import { useNavigate } from "react-router-dom";


export default function Header() {

  const navigate = useNavigate()

  return (
    <>
    <GlobalHeader/>
    <div className="p-md-2">
      <div className='position-relative px-lg-5 px-md-4 headerHeightClass' style={{background: "#0B0B0B"}}>
        <div className="d-flex flex-column flex-md-row position-relative justify-content-between" style={{top: "140px"}}>
          <div className="col-lg-6 mb-5">
            <h1 className="HeaderGlobal pr-5">Immerse Yourself in the Energy of Events</h1>
            <div className="px-3 mt-4 py-1" style={{borderLeft: "2px solid white", color: "white"}}>
              <p className="mb-4 pb-1">Shop millions of live events and discover can't-miss concerts, games, theater and more.</p>
              <div className="dropleft">
                <p className="m-0 mr-md-4 ml-md-auto" style={{ fontSize: "19px", cursor: "pointer" }}>
                  <small className="profile-login-btn rounded-pill" style={{ color: "black", background: "white", padding: "10px 30px", borderRadius: "20px" }}  onClick={()=> navigate("/login")}> Sign In</small>
                  <small className="rounded-pill ml-5" style={{ color: "white"}} onClick={()=> navigate("/contact-us")}>Sell <i class="fa-solid fa-arrow-right ml-3"></i></small>
                </p>
            </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="h-100">
              <img style={{width: '100%'}} src={process.env.PUBLIC_URL + "/images/HomeheaderImg.png"} alt=""/>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
