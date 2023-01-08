import React from 'react'
import { useGoogleLogin } from '@react-oauth/google';
// import jwt_decode from "jwt-decode";
import axios from 'axios';

export default function GoogleLoginFunc() {
  const login = useGoogleLogin({
        onSuccess: async tokenResponse => {
          try{
          const data = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
              headers: {
                  "Authorization": `Bearer ${tokenResponse.access_token}`
              }
            })

            console.log(data)
        } catch(err){
          console.log(err)
        }
        }
  });
  // var decoded = jwt_decode(credentialResponse);
  return (
    <>
    <button onClick={login} type="button" className="btn btn-light mr-2" style={{border: "2px solid darkGray", borderRadius: "10px"}}><img src={process.env.PUBLIC_URL + "/images/Google_Icons-09-512.webp"} width="25px" alt=""/>Sign In</button>
    </>
  )
}
