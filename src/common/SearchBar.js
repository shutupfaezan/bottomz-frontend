import React from 'react'

export default function SearchBar() {
  return (
    <>
      <div className='w-100 d-none d-md-flex justify-content-center'>
        <form className=" d-inline-block align-items-center position-relative" style={{width: "75%"}} role="search">
          <input className="form-control w-100" type="search" style={{height: "52px", borderRadius: "25px", fontWeight: "800", color: "black", padding: "10px 110px 10px 10px"}} placeholder="Search for any venue or event" aria-label="Search"/>
          <button className="btn btn-dark position-absolute rounded-pill mt-1 mr-1" style={{top: "0px", right: "0px", padding: "10px 25px", background: "black"}}>Search</button>
        </form> 
      </div>
      <div className='w-100 d-flex d-md-none justify-content-center'>
        <form className="d-inline-block align-items-center position-relative" style={{width: "90%"}} role="search">
          <input className="form-control w-100" type="search" style={{height: "52px", borderRadius: "25px", fontWeight: "800", color: "black", padding: "10px 50px 10px 10px"}} placeholder="Search for any venue or event" aria-label="Search"/>
          <i className="bi bi-search ml-2 position-absolute rounded-circle mt-1 mr-1"  style={{fontSize: "25px", color: "white", top: "0px", right: "0px", padding: "3px 10px", background: "black"}}></i> 
        </form>
      </div>
    </>
  )
}
