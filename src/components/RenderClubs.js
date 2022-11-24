import React from 'react'

export default function RenderClubs(props) {
  return (
  <>
    <div className="card m-2 allclubs shadow" style={{width: "22rem", border: "0px", borderRadius: "20px", padding: "10px"}}>
      <img class="card-img " src="https://i0.wp.com/stanzaliving.wpcomstaging.com/wp-content/uploads/2022/04/8d5f9-shutterstock_1436812790.jpg?fit=1000%2C667&ssl=1" style={{borderRadius: "22px", marginLeft: "s"}} alt="..."/>
      
        <div className='d-flex '>
          <p  className='card-img-overlay d-flex align-items-end justify-content-center' style={{fontSize: "25px"}}>{props.identity.name}</p>
        </div>
      </div>
  </>
  )
}
