import React, { useContext } from 'react'
import { useGoogleLogin } from '@react-oauth/google';
import { SingularContext } from '../contexts/Context';
import axios from 'axios';

export default function GoogleLoginFunc() {
  const {setShow} = useContext(SingularContext);

  const onSuccess = async (tokenResponse) => {
    try {
      const data = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          "Authorization": `Bearer ${tokenResponse.access_token}`
        }
      })
      const values={
        user_name: data?.data?.name,
        email_id: data?.data?.email,
        password: data?.data?.sub,
      }
      axios.post("https://nightlife-2710.herokuapp.com/google-signin", values)
        .then((response)=>{
          sessionStorage.setItem('token', response?.data?.access_token)
          sessionStorage.setItem('username', response?.data?.User_name)
          setShow(false)
        })
        .catch((error)=> {
          console.log(error)
        })
    } catch(error) {
      console.log(error)
    }
  }

  const login = useGoogleLogin({
    onSuccess,
  });

  return (
    <>
      <button onClick={login} type="button" className="btn btn-light mr-2" style={{border: "2px solid darkGray", borderRadius: "10px"}}>
        <img src={process.env.PUBLIC_URL + "/images/Google_Icons-09-512.webp"} width="25px" alt=""/>Sign In
      </button>
    </>
  )
}
