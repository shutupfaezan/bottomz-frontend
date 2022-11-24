import React from 'react'

export default function Hamburger() {
  return (
    <>
    <i class="bi bi-list mr-3 align-items-center" type="button" style={{fontSize: "25px"}} data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"></i>
    <div class="offcanvas offcanvas-start" style={{width: "250px", background: '#fce151'}} tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
    <div class="offcanvas-header">
    <img src={process.env.PUBLIC_URL + "/images/doers-solutions.jpg"} width="140" height="50" alt=""/>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
        <div>
        <p>About us</p>
        <p>Host with us</p>
        <hr/>
        <p>Login</p>
        </div>
        {/* #f0e4af */}
    </div>
    </div>
    </>
  )
}
