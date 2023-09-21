import axios from "axios";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import RenderClubs from "../UserComponents/RenderClubs";
import "../../css/AllClubs.css";
import Breadcrumbs from '../../extra/Breadcrumb'
import GlobalHeader from "../../common/GlobalHeader";

export default function AllClubs() {
  const [searchTerm, setSearhTerm] = useState();
  const [recentClubs, setRecentClubs] = useState();
  const clubList = async () => {
    return await axios.get("https://nightlife-2710.herokuapp.com/club");
  };

  useEffect(() => {
    clubList()
      .then((response) => {
        setRecentClubs(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <div>
        <>
          <GlobalHeader />
          {/* Main Hero Component */}
          <div className="mb-5 mb-2 mb-md-3 all-clubs-hero">
            <img src={`${process.env.PUBLIC_URL}/images/hero-img.png`} alt="All clubs background" style={{ height: "100%", width: "100%", position: "absolute", top: "0", left: "0", objectFit: "cover", zIndex: "0"}}/>
            <div className='position-absolute d-none d-md-block' style={{top: "110px"}}>
                <Breadcrumbs/>
            </div>
            <div className="col-lg-8 all-clubs-hero-textdiv" style={{ position: "absolute", top: "58%", left: "50%", transform: "translate(-50%,-50%)"}}>
              <h1 className="text-center" style={{lineHeight: "normal", color: "white", textTransform: "uppercase", fontWeight: "800", fontSize: "60px"}}>Explore clubs</h1>
              <p className="all-clubs-hero-content" style={{fontWeight: "400"}}> These clubs have partnered exclusively with us to bring you events. Select any club to view available events are what they offer.</p>
            </div>
            {/* Search Bar Code */}
            <div className="col-lg-11" style={{ position: "absolute", bottom: "56px", left: "50%", transform: "translateX(-50%)", padding: "0 20px"}}>
              <form className="position-relative" role="search">
                <input className="form-control py-4" type="search" style={{ height: "60px", fontSize: "16px", paddingLeft: "66px", borderRadius: "12px", border: "1.5px solid rgba(255, 255, 255, 0.20)", background: "rgba(255, 255, 255, 0.10)", backdropFilter: "blur(32.5px)", color: "white", fontFamily: "Sora, sans-serif"}} onChange={(event) => setSearhTerm(event.target.value)} placeholder="Search clubs by name...." aria-label="Search"/>
                <i className="bi bi-search" style={{ position: "absolute", left: "20px", borderRadius: "20px", top: "50%", transform: "translateY(-50%)", fontSize: "24px", color: "white"}}></i>
              </form>
            </div>
          </div>
          {/* Clubs individual section */}
          <div className="px-3 px-md-5 py-md-3 p-lg-5 py-xl-5 px-xl-3">
            <div className="d-flex w-100 flex-wrap px-lg-3 px-xl-2">
              {recentClubs?.data?.reverse().filter((val) => {
                  return ( searchTerm === undefined || searchTerm === "" || val.club_name.toLowerCase().includes(searchTerm?.toLowerCase()));})
                .map((fields, index) => {
                  return (
                      <RenderClubs key={index} identity={fields}></RenderClubs>
                  );
                })}
            </div>
          </div>
        </>
      </div>
    </>
  );
}