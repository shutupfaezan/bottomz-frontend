import React from 'react'


export default function Input(props) {

  return (
   <>
  <div>
    <div className='mt-2 d-flex justify-content-center'>
      <input className="form-control w-75" id={props.id} placeholder={props.placeholder} value={props.value} name={props.name} onChange={props.handleChange} style={{borderRadius: "40px"}}></input>
    </div>
  </div>
   </>
  )
}