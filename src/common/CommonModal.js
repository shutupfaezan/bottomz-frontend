import React from 'react';
import { useContext } from 'react';
import { SingularContext } from '../contexts/Context';
import Login from '../components/UserComponents/Login'
import Modal from 'react-bootstrap/Modal';
import SignUp from '../components/UserComponents/SignUp';
import ForgotPasswordStep1 from './ForgotPasswordStep1';

export default function CommonModal() {
  
  const handleClose = () => {setShow(false)};
  const {loginActive, signActive, setShow, show, forgotStep1Show} = useContext(SingularContext);
  return (
   <>
    <Modal show={show} onHide={handleClose} centered>
        <div className="modal-content rounded" style={{color: "black"}}>
         {loginActive && <Login/>}
         {signActive && <SignUp/>}
         {forgotStep1Show && <ForgotPasswordStep1/>}
        </div>
    </Modal>
   </>
  )
}
