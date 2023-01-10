import React from 'react'
import { useContext } from 'react';
import { SingularContext } from '../contexts/Context';
import Login from '../components/Login'
import SignUp from '../components/SignUp';

export default function Modal() {
  const {loginActive, signActive} = useContext(SingularContext);
  return (
   <>
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content rounded" style={{color: "black"}}>
         {loginActive && <Login/>}
         {signActive && <SignUp/>}
          </div>
      </div>
    </div>
   </>
  )
}
