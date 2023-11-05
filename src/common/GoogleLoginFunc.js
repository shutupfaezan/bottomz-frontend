import React, { useContext, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { SingularContext } from "../contexts/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function GoogleLoginFunc() {
  const navigate = useNavigate()
  const { setShow } = useContext(SingularContext);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSuccess = async (tokenResponse) => {
    try {
      setError(null);
      setisLoading(true);
      const data = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        }
      );
      const values = {
        user_name: data?.data?.name,
        email_id: data?.data?.email,
        password: data?.data?.sub,
      };
      axios
        .post("https://nightlife-2710.herokuapp.com/google-signin", values)
        .then((response) => {
          console.log(response);
          setisLoading(false);
          sessionStorage.setItem("token", response?.data?.access_token);
          sessionStorage.setItem("username", response?.data?.User_name);
          setShow(false);
          navigate("/" )
        })
        .catch((error) => {
          setisLoading(false);
          setError(error.response.data.detail);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const login = useGoogleLogin({
    onSuccess,
  });

  return (
    <>
      <button
        type="submit"
        className="btn mb-2"
        style={{
          width: "100%",
          borderRadius: "120px",
          background: "rgba(244, 244, 245, 0.10)",
          color: "white",
          padding: "16px",
        }}
      >
        {isLoading && (
          <span
            id="login-loader-span"
            className="spinner-border spinner-border-sm mx-1"
            role="status"
            aria-hidden="true"
          ></span>
        )}
        {isLoading && <span id="login-loading-text-span">Loading</span>}
        {!isLoading && (
          <span
            id="login-text-span"
            className="d-flex align-items-center justify-content-center"
            onClick={login}
          >
            {/* See if the svg can be replaced with a png as this spoils the whole code and makes it unclean */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="22"
              viewBox="0 0 23 22"
              fill="none"
              className="mr-1"
            >
              <path
                d="M21.1708 9.08759L12.197 9.08716C11.8007 9.08716 11.4795 9.40832 11.4795 9.80458V12.6713C11.4795 13.0675 11.8007 13.3887 12.1969 13.3887H17.2504C16.6971 14.8248 15.6642 16.0275 14.3465 16.7917L16.5013 20.5219C19.9579 18.5228 22.0015 15.0152 22.0015 11.0887C22.0015 10.5296 21.9603 10.13 21.8779 9.67993C21.8152 9.33802 21.5184 9.08759 21.1708 9.08759Z"
                fill="#167EE6"
              />
              <path
                d="M10.9992 17.6962C8.52611 17.6962 6.36713 16.345 5.20758 14.3455L1.47754 16.4954C3.37573 19.7853 6.93167 22.0007 10.9992 22.0007C12.9946 22.0007 14.8774 21.4634 16.4993 20.5272V20.522L14.3445 16.7918C13.3589 17.3635 12.2183 17.6962 10.9992 17.6962Z"
                fill="#12B347"
              />
              <path
                d="M16.5001 20.5271V20.522L14.3453 16.7917C13.3597 17.3634 12.2192 17.6961 11 17.6961V22.0006C12.9954 22.0006 14.8783 21.4633 16.5001 20.5271Z"
                fill="#0F993E"
              />
              <path
                d="M4.30447 11.0004C4.30447 9.78139 4.63714 8.64093 5.20868 7.65533L1.47864 5.50537C0.53721 7.1222 0 8.9999 0 11.0004C0 13.0009 0.53721 14.8786 1.47864 16.4954L5.20868 14.3455C4.63714 13.3599 4.30447 12.2194 4.30447 11.0004Z"
                fill="#FFD500"
              />
              <path
                d="M10.9992 4.30447C12.6119 4.30447 14.0932 4.87751 15.2503 5.83071C15.5357 6.06584 15.9506 6.04887 16.2121 5.7874L18.2433 3.75621C18.5399 3.45955 18.5188 2.97395 18.2019 2.69902C16.2633 1.01723 13.741 0 10.9992 0C6.93166 0 3.37573 2.2154 1.47754 5.50526L5.20758 7.65522C6.36713 5.6557 8.52611 4.30447 10.9992 4.30447Z"
                fill="#FF4B26"
              />
              <path
                d="M15.2511 5.83071C15.5365 6.06584 15.9515 6.04887 16.2129 5.7874L18.2441 3.75621C18.5407 3.45955 18.5196 2.97395 18.2027 2.69902C16.2641 1.01718 13.7418 0 11 0V4.30447C12.6127 4.30447 14.094 4.87751 15.2511 5.83071Z"
                fill="#D93F21"
              />
            </svg>
            Sign in with Google
          </span>
        )}
      </button>
      {
        <small style={{ display: "block", color: "crimson" }}>
          {error && error}
        </small>
      }
    </>
  );
}
