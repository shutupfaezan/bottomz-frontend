import React from "react";
import { useNavigate } from "react-router-dom";

export default function RenderClubs(props) {
  const navigate = useNavigate();
  return (
    <>
    <div className="col-lg-4 col-xl-3 py-2 py-lg-3 px-2 col-md-6">
      <div className="w-100 cursor-pointer position-relative" style={{ borderRadius: "30px", border: "0px solid black", overflow: "hidden", height: "370px"}}  onClick={() => {navigate(props.identity.club_name)}}>
          <div style={{position: "absolute", width: "100%", height: "100%", top: "0", left: "0"}}>
            <img src={props.identity.images_url} className="card-img-top" style={{ borderRadius: "15px", height: "100%", width: "100%", objectFit: "cover"}} alt="..."/>
          </div>
          <div className="d-flex align-items-center club-card-rating">
            <i className="bi bi-star-fill mr-1" style={{ fontSize: "14px", color: "white" }}></i>
            {props.identity.rating.toFixed(1)}
          </div>
          <div style={{background: `url(${process.env.PUBLIC_URL}/images/svgviewer-png-output.png)`, backdropFilter: "blur(12px)", color: "white", position: "absolute", left: "0", bottom: "0", width: "100%" }}>
            <div style={{padding: "19px 25px", }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end" }}>
                <div className="d-flex" style={{ gap: "5px", flexDirection: "column" }}>
                  <b className="card-title text-truncate m-0" style={{ fontWeight: "600", fontSize: "20px" }}>
                    {props.identity.club_name}
                  </b>
                  <p className="m-0" style={{ fontSize: "14px", fontWeight: "400" }}>
                    <i className="fa-solid fa-location-dot mr-2"></i>
                    {props.identity.area}
                  </p>
                </div>
                <img src={`${process.env.PUBLIC_URL}/images/visitClub.svg`} alt="visit club" style={{ height: "35px", width: "35px"}}/>
              </div>
            </div>
          </div>
      </div>
    </div>
    </>
  );
}
