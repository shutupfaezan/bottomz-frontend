import React from "react";
import "../css/Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <section
      // className="pt-5 pb-4 d-flex flex-column position-relative w-100 justify-content-md-end text-black"
      className="footer">
      {/* <div className="d-flex flex-column flex-lg-row ml-3 mr-0"> */}
      <div className="footer-container">
        {/* <div className="col-xs-12 d-md-flex justify-content-center mt-md-4 mb-4 mb-md-0 pt-2 col-md-3"> */}
        <div className="footer-left">
        <img src={`${window.location.origin}/images/LOGOBLACK.svg`} alt="Bottmzup logo" style={{ maxHeight: "50px" }} />
          <div className="footer-left-content line-left">
            <p>
              Lorem ipsum dolor sit amet consectetur adipiscing elit ullamcorper
              misem porttitor vel ut quis egestas mauris sapien ipsum diam odio
              curabitur purus dolor sit amet consectur.
            </p>
            <ul className="footer-socials">
              <li>
                <a
                  style={{
                    color: "black",
                    fontSize: "24px",
                  }}
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.instagram.com/bottmzup/"
                >
                  <i class="fa-brands fa-instagram"></i>
                </a>
              </li>
              <li>
                <a
                  style={{
                    color: "black",
                    fontSize: "24px",
                  }}
                  target="_blank"
                  rel="noreferrer"
                  href="mailto:info@bottmzup.com"
                >
                  <i class="fa-regular fa-envelope"></i>
                </a>
              </li>
              <li>
                <a
                  style={{
                    color: "black",
                    fontSize: "24px",
                  }}
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.linkedin.com/company/bottmzup/"
                >
                  <i class="fa-brands fa-linkedin-in"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* <div className="col-xs-12 p-0 py-md-5 col-lg-9 col-md-12 d-flex flex-column flex-md-row"> */}
        <div className="footer-right">
          <div className="footer-right-col">
            {/* <h6 className="mb-md-3 mb-2" style={{ fontSize: "1rem" }}> */}
            <h6 style={{ fontSize: "1rem" }}>Explore</h6>
            <ul className="list-unstyled">
              <li>
                <Link
                  style={{
                    color: "black",
                    fontSize: "0.875 rem",
                    fontWeight: "400",
                  }}
                  to="/clubs"
                >
                  Clubs
                </Link>
              </li>
              <li>
                <Link
                  style={{
                    color: "black",
                    fontSize: "0.875 rem",
                    fontWeight: "400",
                  }}
                  to="/events"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  style={{
                    color: "black",
                    fontSize: "0.875 rem",
                    fontWeight: "400",
                  }}
                  to="/contact-us"
                >
                  Host With us
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-right-col">
            {/* <h6 className="mb-md-3 mb-2" style={{ fontSize: "1rem" }}> */}
            <h6 style={{ fontSize: "1rem" }}>Information</h6>
            <ul className="list-unstyled">
              <li>
                <Link
                  style={{
                    color: "black",
                    fontSize: "0.875 rem",
                    fontWeight: "400",
                  }}
                  to="/terms-and-conditions"
                >
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link
                  style={{
                    color: "black",
                    fontSize: "0.875 rem",
                    fontWeight: "400",
                  }}
                  to="/privacy-policy"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  style={{
                    color: "black",
                    fontSize: "0.875 rem",
                    fontWeight: "400",
                  }}
                  to="/contact-us"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-right-col">
            {/* <h6 className="mb-md-3 mb-2" style={{ fontSize: "1rem" }}> */}
            <h6 style={{ fontSize: "1rem" }}>Members</h6>
            <ul className="list-unstyled">
              <li>
                <Link
                  style={{
                    color: "black",
                    fontSize: "0.875 rem",
                    fontWeight: "400",
                  }}
                  to="/login"
                >
                  Log In
                </Link>
              </li>
              <li>
                <Link
                  style={{
                    color: "black",
                    fontSize: "0.875 rem",
                    fontWeight: "400",
                  }}
                  to="/sign-up"
                >
                  Sign Up
                </Link>
              </li>
              <li>
                <a
                  style={{
                    color: "black",
                    fontSize: "0.875 rem",
                    fontWeight: "400",
                  }}
                  href="https://business.bottmzup.com"
                  rel="noopener noreferrer"
                >
                  Promoter Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* <hr className="mx-auto" style={{ width: "90%" }}></hr>
      <a
        className="mb-1 d-flex justify-content-end mr-4 mr-md-5 pr-lg-3"
        href="mailto:info@bottmzup.com"
        style={{ color: "black" }}
      >
        info@bottmzup.com
      </a> */}
    </section>
  );
}
