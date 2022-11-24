import React from 'react'
import Input from '../common/Input'
import { useFormik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import "../css/Login.css"

export default function Login() {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email_id: "",
      password: ""
    },
    onSubmit: (values)=> {
      axios.post("https://nightlife-2710.herokuapp.com/login", values)
      .then((response)=>{
        localStorage.setItem('token', response.data.access_token)
        navigate("/")
      }
      )
    }
  })

  return (
    <div  className='vh-100 d-flex justify-content-center pngbackground'>
      <div>
        <nav className='position-absolute'>
          <div>
            <a href="/"><img src={process.env.PUBLIC_URL + "/images/doers-solutions.jpg"} width="120" height="40" alt=""/>
            </a>
          </div><br/>
        </nav>    
      </div>
    <div className="container d-flex justify-content-center">       
            <div className='d-flex flex-column justify-content-center'>
                <div className="d-flex justify-content-center" style={{fontSize: "50px", fontWeight: "600"}}>
                  Log In
                </div>
                <div className="mt-2">
                    <button type="button" className="btn btn-light" style={{padding: "6px 90px", border: "2px solid darkGray", borderRadius: "10px"}}><img src={process.env.PUBLIC_URL + "/images/Google_Icons-09-512.webp"} width="25px" alt=""/>Sign in with google</button>
                </div>
                <div className="mt-2">
                    <button type="button" className="btn btn-light" style={{padding: "6px 94px", border: "2px solid darkGray", borderRadius: "10px"}}><img src={process.env.PUBLIC_URL + "/images/apple-icon.png"} width="25px" alt=""/>Sign in with apple</button>
                </div>
                <hr className='rounded'/>
                <form>
                <Input name="email_id" value={formik.values.email_id} id="email_id"  handleChange={formik.handleChange} placeholder="Email"/>
                <Input name="password" value={formik.values.password} id="password"  handleChange={formik.handleChange} placeholder="Password"/>
                <div className="mt-3 d-flex justify-content-center">
                <button type="submit" className="btn btn-outline-d  anger pinkpanther" style={{color: "white"}} onClick={formik.handleSubmit}>Continue</button>
                </div>
                </form>
            </div>       
      </div>
    </div>
  )
}
