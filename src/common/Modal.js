import React from 'react'
import Login from '../components/Login'

export default function Modal() {
  return (
   <>
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content rounded" style={{color: "black"}}>
          <Login/>
          </div>
      </div>
    </div>
   </>
  )
}
