import React, {useState} from 'react'

export default function ExploreBar() {
    const [allClubs, setAllClubs] = useState()
    const [featured, setfeatured] = useState(true)
  return (
      <div className='mt-md-4 pl-md-3 mt-2 mb-0 mx-2 ml-4'>
      <h4 style={{color: "rgb(95 0 162)"}}><strong>Explore +</strong></h4>
      <button onClick={()=>{setfeatured(true); setAllClubs(false)}} type="button" className="btn btn-primary px-3 mr-2" style={{backgroundColor: "white", borderRadius: "20px", color: "black"}}>Featured</button>
      <button onClick={()=>{setAllClubs(true); setfeatured(false)}} type="button" className="btn btn-primary px-3 mr-2" style={{backgroundColor: "white", borderRadius: "20px", color: "black"}}>Clubs</button>
      <button onClick={()=>{}} type="button" className="btn btn-primary px-3 mr-2" style={{backgroundColor: "white", borderRadius: "20px", color: "black"}}>Events</button>
      <button onClick={()=>{}} type="button" className="btn btn-primary px-3 mr-2 mt-sm-0 mt-2" style={{backgroundColor: "white", borderRadius: "20px", color: "black"}}>Host with us</button>
    </div>
  )
}
