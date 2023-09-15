import axios from "axios";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import RenderClubs from "../UserComponents/RenderClubs";
import "../../css/AllClubs.css";
import "../../css/ClubsRow.css";
import GlobalHeader from "../../common/GlobalHeader";
import Footer from "../../common/Footer";

export default function AllClubs() {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearhTerm] = useState();
  const [recentClubs, setRecentClubs] = useState();
  const clubList = async () => {
    return await axios.get("https://nightlife-2710.herokuapp.com/club");
  };

  useEffect(() => {
    clubList()
      .then((response) => {
        setRecentClubs(response);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <div>
        {loading && (
          <div className="d-flex justify-content-center mt-auto">
            <div className="d-flex align-items-center">
              <span>
                <img
                  src={
                    process.env.PUBLIC_URL + "/images/output-onlinegiftools.gif"
                  }
                  style={{
                    height: "100px",
                    width: "100px",
                    transform: "translate(-50%, -50%)",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                  }}
                  alt=""
                />
              </span>
            </div>
          </div>
        )}
        {!loading && (
          <>
            <GlobalHeader />
            {/* <div style={{ padding: "10px" }} className="all-clubs-hero-container"> */}
            <div
              className="mb-5 mb-2 mb-md-3 all-clubs-hero"
              // style={{
              //   height: "100vh",
              //   background: "black",
              //   position: "relative",
              //   maxHeight: "685px",
              //   borderRadius: "20px",
              //   overflow: "hidden",
              // }}
            >
              <img
                src={`${process.env.PUBLIC_URL}/images/clubsHeroBg.jpg`}
                alt="All clubs background"
                style={{
                  height: "100%",
                  width: "100%",
                  position: "absolute",
                  top: "0",
                  left: "0",
                  objectFit: "cover",
                  zIndex: "0",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                }}
              >
                <h1 className="all-clubs-heading">Explore clubs</h1>
                <p className="all-clubs-hero-content">
                  Lorem ipsum dolor sit amet consectetur. Dui iaculis nibh
                  ultricies pretium sit semper fusce. Lectus nec ipsum ultrices
                  facilisi fermentum.
                </p>
              </div>

              <div
                style={{
                  position: "absolute",
                  bottom: "56px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  maxWidth: "1220px",
                  padding: "0 20px",
                  width: "100%",
                }}
              >
                <form className="position-relative" role="search">
                  <input
                    className="form-control py-4"
                    type="search"
                    style={{
                      height: "60px",
                      fontSize: "20px",
                      paddingLeft: "66px",
                      borderRadius: "12px",
                      border: "1.5px solid rgba(255, 255, 255, 0.20)",
                      background: "rgba(255, 255, 255, 0.10)",
                      backdropFilter: "blur(32.5px)",
                      color: "white",
                      fontFamily: "Sora, sans-serif",
                    }}
                    onChange={(event) => setSearhTerm(event.target.value)}
                    placeholder="Search for ..."
                    aria-label="Search"
                  />
                  <i
                    className="bi bi-search"
                    style={{
                      position: "absolute",
                      // float: "left",
                      left: "20px",
                      borderRadius: "20px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      // width: "0px",
                      fontSize: "24px",
                      color: "white",
                    }}
                  ></i>
                </form>
              </div>
            </div>
            {/* </div> */}
            {/* <div className={`d-flex px-2 flex-wrap m-xl-5 mb-3 mb-md-5`}> */}
            <div
              // className={`px-2 m-xl-5 mb-3 mb-md-5 clubs-grid`}
              className={`clubs-grid`}
            >
              {/* eslint-disable-next-line */}
              {recentClubs?.data
                ?.reverse()
                .filter((val) => {
                  return (
                    searchTerm === undefined ||
                    searchTerm === "" ||
                    val.club_name
                      .toLowerCase()
                      .includes(searchTerm?.toLowerCase())
                  );
                })
                .map((fields, index) => {
                  return (
                    <RenderClubs key={index} identity={fields}></RenderClubs>
                  );
                })}
            </div>
            <Footer />
          </>
        )}
      </div>
    </>
  );
}
