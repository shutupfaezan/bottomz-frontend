import React from 'react'
import "../css/Footer.css"

export default function FooterUniversal() {
  return (<>
  {/* <hr className="mx-auto" style={{width: "40%"}}></hr> */}
    <div class="mt-4">
      <footer class="text-center text-white">
      <div class="container pt-4">
        <section class="mb-4">
          <a
            class="btn btn-link btn-floating btn-lg text-dark m-1"
            href="#!"
            role="button"
            data-mdb-ripple-color="dark"
            ><i class="fab fa-facebook-f"></i></a>
    
          <a
            class="btn btn-link btn-floating btn-lg text-dark m-1"
            href="#!"
            role="button"
            data-mdb-ripple-color="dark"
            ><i class="fab fa-twitter"></i></a>
    
          <a
            class="btn btn-link btn-floating btn-lg text-dark m-1"
            href="#!"
            role="button"
            data-mdb-ripple-color="dark"
            ><i class="fab fa-discord"></i></a>
    
          <a
            class="btn btn-link btn-floating btn-lg text-dark m-1"
            href="#!"
            role="button"
            data-mdb-ripple-color="dark"
            ><i class="fab fa-instagram"></i></a>
        </section>
      </div>
      <div class="text-center text-dark p-3" >
        © 2020 Copyright:
        <a class="text-dark" href="/"> BottmpsUp.com</a>
      </div>
    </footer>
      
    </div>
    </>
  )
}
