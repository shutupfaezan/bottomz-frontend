import React from 'react';
import { useContext } from 'react';
import { SingularContext } from '../contexts/Context';
import Login from '../components/Login'
import Modal from 'react-bootstrap/Modal';
import SignUp from '../components/SignUp';

export default function CommonModal() {
  const handleClose = () => setShow(false);
  const {loginActive, signActive, setShow, show} = useContext(SingularContext);
  return (
   <>
    <Modal show={show} onHide={handleClose} centered>
        <div className="modal-content rounded" style={{color: "black"}}>
         {loginActive && <Login/>}
         {signActive && <SignUp/>}
        </div>
    </Modal>
   </>
  )
}
