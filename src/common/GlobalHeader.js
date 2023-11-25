// global header new vvv

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import "../css/Header.css";
import Hamburger from "../extra/Hamburger";
import { SingularContext } from "../contexts/Context";

export default function GlobalHeader() {
  const navigate = useNavigate();
  const { setShow } = useContext(SingularContext);
  function modalswitch() {
    if (sessionStorage.token) {
      setShow(false);
    } else {
      navigate("/login");
    }
  }
  return (
    <>
      <div
        className="w-100 mx-md-auto px-3 px-md-5"
        style={{ position: "fixed", top: "30px", zIndex: "3", color: "white" }}
      >
        <nav className="navbar navbar-expand navbar-light align-items-center headerback py-3 py-md-4 px-3 px-lg-5 px-md-3 col-md-12 mx-auto nav-filter-backdrop">
          <Link
            className=" navbar-brand py-0 d-flex mx-auto logo-modulator"
            style={{ fontWeight: "800" }}
            to="/"
          >
            <img
              className="mr-2"
              src={process.env.PUBLIC_URL + "/images/LOGO.svg"}
              style={{ width: "160px", height: "35px" }}
              alt=""
            />
          </Link>
          <ul className="navbar-nav mr-2">
            {/* <li className="nav-item active d-none d-md-flex hover-underline-animation">
              <Link
                className="nav-link p-2 mx-2"
                style={{ fontSize: "19px" }}
                to="/clubs"
              >
                <small style={{ color: "white" }}>Clubs</small>
              </Link>
            </li> */}
            <li className="nav-item active d-none d-md-flex hover-underline-animation">
              <Link
                className="nav-link p-2 mx-2"
                style={{ fontSize: "19px" }}
                to="/events"
              >
                <small style={{ color: "white" }}>Browse Events</small>
              </Link>
            </li>
            <li className="nav-item active d-none d-md-block hover-underline-animation">
              <Link
                className="nav-link p-2 mx-2"
                style={{ fontSize: "19px" }}
                to="/contact-us"
              >
                <small style={{ color: "white" }}>Sell</small>
              </Link>
            </li>
          </ul>
          <div
            className="align-items-center collapse navbar-collapse text-black"
            id="navbarSupportedContent"
          >
            <div className="nav-item active d-none d-md-block hover-underline-animation ml-auto mr-2">
              <Link
                className="nav-link p-2 mx-2"
                style={{ fontSize: "19px", color: "black" }}
                to="/contact-us"
              >
                <small style={{ color: "white" }}>Help</small>
              </Link>
            </div>
            <div className="dropleft d-md-block d-none">
              {sessionStorage?.username ? (
                <div className="dropdown">
                  <p
                    style={{ fontSize: "19px", color: "black", margin: "0px" }}
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <small
                      className="mb-0 text-black hover-underline-animation cursor-pointer"
                      style={{ color: "white" }}
                    >
                      {sessionStorage?.username}
                    </small>
                  </p>
                  <ul className="dropdown-menu">
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/order-history"
                        style={{ fontWeight: "700" }}
                      >
                        <i className="fa-solid fa-ticket mr-2"></i>Tickets
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={() => {
                          sessionStorage.clear();
                          window.location.reload();
                          window.location.href("/");
                        }}
                        style={{ color: "red", fontWeight: "700" }}
                        className="dropdown-item"
                        to="/"
                      >
                        <i className="fa-solid fa-right-from-bracket mr-2"></i>
                        Log Out
                      </Link>
                    </li>
                  </ul>
                </div>
              ) : (
                <p
                  className="m-0 mr-md-4 ml-md-auto"
                  style={{ fontSize: "19px", cursor: "pointer" }}
                  onClick={modalswitch}
                >
                  <small
                    className="profile-login-btn rounded-pill"
                    style={{
                      color: "black",
                      background: "white",
                      padding: "10px 30px",
                      borderRadius: "20px",
                    }}
                  >
                    Sign In
                  </small>
                </p>
              )}
            </div>
            <div className="d-md-none d-block ml-auto">
              <Hamburger />
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
