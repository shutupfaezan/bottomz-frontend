import React from "react";
import { useNavigate } from "react-router-dom";
import { MobileOnlyView, TabletView, BrowserView } from "react-device-detect";

export default function RenderClubs(props) {
  const navigate = useNavigate();
  return (
    <>
      <div
        // className="p-2 m-md-0 col-lg-3 col-xxl-2 col-md-6 m-lg-0"
        className="club-card"
        onClick={() => {
          navigate(props.identity.club_name);
        }}
      >
        <div
          // className="w-100 h-100 shadow cursor-pointer position-relative"
          className="w-100 h-100 cursor-pointer position-relative"
          style={{
            borderRadius: "30px",
            border: "0px solid black",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              top: "0",
              left: "0",
            }}
          >
            <img
              src={props.identity.images_url}
              className="card-img-top"
              style={{
                borderRadius: "15px",
                height: "100%",
                width: "100%",
                objectFit: "cover",
              }}
              alt="..."
            />
            {/* <BrowserView>
              <img
                src={props.identity.images_url}
                className="card-img-top"
                style={{
                  borderRadius: "15px",
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                }}
                alt="..."
              />
            </BrowserView> */}
            {/* <TabletView>
              <img
                src={props.identity.images_url}
                className="card-img-top"
                style={{
                  borderRadius: "15px",
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                }}
                alt="..."
              />
            </TabletView>
            <MobileOnlyView>
              <img
                src={props.identity.images_url}
                className="card-img-top"
                style={{
                  borderRadius: "15px",
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                }}
                alt="..."
              />
            </MobileOnlyView> */}
          </div>
          <div className="d-flex align-items-center club-card-rating">
            <i
              className="bi bi-star-fill mr-1"
              // style={{ fontSize: "13px", color: "#ffbe5b" }}
              style={{ fontSize: "24px", color: "white" }}
            ></i>
            {props.identity.rating.toFixed(1)}
          </div>
          <div
            style={{
              fill: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(12px)",
              color: "white",
              padding: "25px",
              position: "absolute",
              left: "0",
              bottom: "0",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "end",
              }}
            >
              <div
                className="d-flex justify-content-between"
                style={{ gap: "15px", flexDirection: "column" }}
              >
                <b
                  className="card-title text-truncate m-0"
                  style={{
                    fontWeight: "700",
                    fontSize: "26px",
                  }}
                >
                  {props.identity.club_name}
                </b>
                <p
                  className="m-0"
                  style={{ fontSize: "20px", fontWeight: "400" }}
                >
                  <i className="bi bi-geo mr-2"></i>
                  {props.identity.area}
                </p>
              </div>
              {/* <div className="d-flex justify-content-between">
              <p
                className="m-0"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                <i className="bi bi-clock mr-2"></i>
                {props.identity.opening_time}
              </p>
              <p
                className="m-0"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                <i className="bi bi-currency-rupee"></i>
                {props.identity.cost}
              </p>
            </div> */}
              <img
                src={`${process.env.PUBLIC_URL}/images/visitClub.svg`}
                alt="visit club"
                style={{
                  height: "45px",
                  width: "45px",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
