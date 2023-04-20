import React, { useState } from 'react'
import { useGoogleLogin } from '@react-oauth/google';
// import jwt_decode from "jwt-decode";
import axios from 'axios';


export default function GoogleLoginFunc() {
  const [byGoogle, setByGoogle] = useState()
  const login = useGoogleLogin({
        onSuccess: async tokenResponse => {
          try{
          const data = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
              headers: {
                  "Authorization": `Bearer ${tokenResponse.access_token}`
              }
            })
            setByGoogle(data?.data)
        } catch(err){
          console.log(err)
        }
        }
  });
  
  const values={
    name: byGoogle?.name,
    email_id: byGoogle?.email,
    password: byGoogle?.sub,
    contact: 0,
  }

    byGoogle && axios.post("https://nightlife-2710.herokuapp.com/registration", values).then((response)=>{console.log(response)})

  // var decoded = jwt_decode(credentialResponse);
  return (
    <>
    <button onClick={login} type="button" className="btn btn-light mr-2" style={{border: "2px solid darkGray", borderRadius: "10px"}}><img src={process.env.PUBLIC_URL + "/images/Google_Icons-09-512.webp"} width="25px" alt=""/>Sign In</button>
    </>
  )
}
