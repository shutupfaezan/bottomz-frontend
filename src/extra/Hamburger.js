import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


export default function Hamburger() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const tokenExists = !!sessionStorage?.token;
    setIsLoggedIn(tokenExists);
  }, []);
  
  const navigate = useNavigate()

  const closeButtonStyle = {
    background: `transparent url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3e%3cpath d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/%3e%3c/svg%3e") no-repeat`,
    width: '5px',
    height: '5px',
    marginRight: '10px',
    fontSize: '14px',
    border: 'none',
    cursor: 'pointer'
  };

  const handleNavigate = (path) => {
    navigate(path);
    document.body.style.overflow = 'auto';
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.reload();
  };
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const pathname = window.location.pathname

  return (
    <>
      <div className='rounded-circle d-flex justify-content-center' style={{background: "white", borderRadius: "60px", height: "50px", width: "50px"}}>
      <i className="fa-solid fa-bars  align-items-center justify-content-end align-self-center" style={{ color: "black", fontSize: "25px", cursor: 'pointer'}} data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"></i>
      </div>  
      <div className="offcanvas offcanvas-end d-flex" style={{width: "80%", height: "auto", zIndex: "10000", background: "rgba(53, 53, 53, 1)"}} tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel"  data-bs-no-jquery  data-bs-backdrop="true" data-bs-scroll="false">
        <div className="offcanvas-header pt-5 pb-4 px-3" style={{justifyContent: "start"}}>
          <a className="navbar-brand mx-md-5 py-0 mr-auto" style={{fontWeight: "800", width: "75%"}} href="/">
            <img style={{width: "100%"}} src={process.env.PUBLIC_URL + "/images/LOGO.svg"} alt=""></img>
          </a>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" style={closeButtonStyle}></button>
        </div>
        <div className="offcanvas-body d-flex flex-column pt-4">
          {/* Upper Sections  */}
          <div className='p-0 px-1 mb-auto'>
            <div className='text-white mb-3 py-1 px-2' style={{border: "2px solid rgba(255, 255, 255, 0.03)", background: pathname === "/" ? "white": "transparent", borderRadius: "78px"}} onClick={()=>handleNavigate("/")}>
              <div className='d-flex my-0 align-items-center'>
              <div className='p-2' style={{background:  pathname === "/" ? "black": "rgba(255, 255, 255, 0.05)", borderRadius: "50%", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <i class="fa-solid fa-house" style={{color: "white"}}></i>
              </div>
              <p className='mb-0 ml-3' style={{fontSize: "18px", color: pathname === "/" ? "black": "white"}}>Home</p>
              </div>
            </div>
            <div className='text-white mb-3 py-1 px-2' style={{border: "2px solid rgba(255, 255, 255, 0.03)", background: pathname === "/events" ? "white": "transparent", borderRadius: "78px"}} onClick={()=>handleNavigate("/events")}>
              <div className='d-flex my-0 align-items-center'>
              <div className='p-2' style={{background: pathname === "/events" ? "black": "rgba(255, 255, 255, 0.05)", borderRadius: "50%", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center"}}>
              <i class="bi bi-dice-6-fill" style={{color: "white"}}></i>
              </div>
              <p className='mb-0 ml-3' style={{fontSize: "18px", color: pathname === "/events" ? "black": "white"}}>Events</p>
              </div>
            </div>
            <div className='text-white mb-3 py-1 px-2' style={{border: "2px solid rgba(255, 255, 255, 0.03)", background: pathname === "/contact-us" ? "white": "transparent", borderRadius: "78px"}} onClick={()=>handleNavigate("/contact-us")}>
              <div className='d-flex my-0 align-items-center'>
              <div className='p-2' style={{background: pathname === "/contact-us" ? "black": "rgba(255, 255, 255, 0.05)", borderRadius: "50%", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center"}}>
              <i class="fa-solid fa-circle-question" style={{color: "white"}}></i>
              </div>
              <p className='mb-0 ml-3' style={{fontSize: "16px", color: pathname === "/contact-us" ? "black": "white"}}>Help</p>
              </div>
            </div>
           {isLoggedIn && <div className='text-white mb-3 py-1 px-2' style={{border: "2px solid rgba(255, 255, 255, 0.03)", background: pathname === "/order-history" ? "white": "transparent", borderRadius: "78px"}} onClick={()=>handleNavigate("/order-history")}>
              <div className='d-flex my-0 align-items-center'>
              <div className='p-2' style={{background: pathname === "/order-history" ? "black": "rgba(255, 255, 255, 0.05)", borderRadius: "50%", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center"}}>
              <i class="fa-solid fa-ticket" style={{color: "white"}}></i>
              </div>
              <p className='mb-0 ml-3' style={{fontSize: "16px", color: pathname === "/order-history" ? "black": "white"}}>Tickets</p>
              </div>
            </div>}
          </div>

          {/* Lower Sections */}
          <div className='p-0 px-1 mt-auto'>
            <div className='text-white mb-3 py-1' style={{border: "2px solid white", background: "transparent", borderRadius: "78px"}} onClick={()=>handleNavigate("/contact-us")}>
              <div className='d-flex my-2'>
                <p className='mb-0 mx-auto' style={{fontSize: "16px", color: "white"}}>Sell</p>
              </div>
            </div>
            {isLoggedIn === false ? <div className='mb-3 py-1' style={{border: "1px solid rgba(255, 255, 255, 0.03)", background: "white", borderRadius: "78px", color: "black", fontWeight: "700"}}  onClick={()=>handleNavigate("/login")}>
              <div className='d-flex my-2'>
                <p className='mb-0 mx-auto' style={{fontSize: "16px"}}>Sign In</p>
              </div>
            </div>
            :
            <div className='mb-3 py-1 btn-outline-danger' style={{ border: "1px solid #d9534f", borderRadius: "78px",fontWeight: "300"}}  onClick={()=>handleLogout()}>
              <div className='d-flex my-2'>
                <p className='mb-0 mx-auto' style={{fontSize: "16px"}}>Log Out</p>
              </div>
            </div>
            }
          </div>
        </div>
      </div>
    </>
  )
}
