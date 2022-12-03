import React from 'react'

export default function Carousel() {
  return (
    <div id="carouselExampleCaptions" className="carousel slide carousel-fade" data-bs-ride="true" >
    <div className="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div className="carousel-inner">
      <div className="carousel-item active"  >
      <img src="https://live.staticflickr.com/6229/6324307004_81edf8d930_b.jpg" className="d-block w-100" style={{height: "220px"}} alt="..." /> 
      </div>
      <div className="carousel-item ">
      <img src="https://i0.wp.com/triponzy.com/blog/wp-content/uploads/2019/08/matahaari-worli.jpg?resize=1024%2C683&ssl=1" style={{height: "220px"}} className="d-block w-100" alt="..."/>
      </div>
      <div className="carousel-item">
        <img src="https://im.whatshot.in/venue/2017/May/1494655285-bombay-cocktail-twitter.jpg" className="d-block w-100" style={{height: "220px"}} alt="..."/>
      </div>
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div>
  )
}
