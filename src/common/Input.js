import React from 'react'


export default function Input(props) {
  function hidepassword(){
    var temp = document.getElementById(props.id);
    if (temp.type === "password") {
        temp.type = "text";
    }
    else {
        temp.type = "password";
    }
  }
  return (
   <>
    <div className='mb-2 d-flex justify-content-center align-items-center' style={props.style}>
      <i className={props.icon} style={{fontSize: "22px", color: "gray", marginRight: "5px"}}></i>
      {!window.location.hash === "#/host-an-event" && <input className="form-control w-100" id={props.id} placeholder={props.placeholder} value={props.value} name={props.name} onChange={props.handleChange} type={props.type} style={{borderRadius: "20px", width: "85%"}}></input>}
      {window.location.hash === "#/host-an-event" && <input className="form-control w-100" id={props.id} placeholder={props.placeholder} value={props.value} name={props.name} onChange={props.handleChange} type={props.type}></input>}
      <i style={{float: "right", right: "35px", borderRadius: "20px", top: "0px", width: "0px", zIndex: "1", fontSize: "20px", color: "gray"}} onClick={hidepassword} className={props.icon2}></i>
  </div>
   </>
  )
}