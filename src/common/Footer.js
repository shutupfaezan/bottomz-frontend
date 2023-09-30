import React from "react";
import "../css/Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <section className="footer">
      <div className="footer-container">
        <div className="footer-left">
        <img src={`${window.location.origin}/images/LOGOBLACK.svg`} alt="Bottmzup logo" style={{ maxHeight: "50px" }} />
          <div className="footer-left-content line-left">
            <p>
              This is an evolving registered eventing and media company. We do nightlife better and smoother than everyone. We're still a developing company so any bugs or reposts are welcome. Just go to the Contact Us section and repost any bug you noticed and we'll surely get to the end of it.
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
        <div className="footer-right">
          <div className="footer-right-col">
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
    </section>
  );
}
