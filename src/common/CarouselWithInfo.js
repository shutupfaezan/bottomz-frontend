  import { useRef} from "react";
  import React from "react";
  // import { useState } from "react";
  import Carousel from "react-multi-carousel";
  import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, 
    },
  };

  const CarouselWithInfo = ({ items }) => {
    // const [currentSlide, setCurrentSlide] = useState(0);
    // const [activeSlide, setActiveSlide] = useState(0);
    const carouselRef = useRef(null);
    const navigate = useNavigate()
    // const beforeChangeHandler = (oldIndex, newIndex) => {
    //   console.log(newIndex.currentSlide - 1)
    //   setActiveSlide(newIndex.currentSlide - 1)

    // };
    
    
    // const goToSlide = (slideIndex) => {
    //   carouselRef.current.goToSlide(slideIndex);
    //   setCurrentSlide(slideIndex);
    // };
    
    return (
      <>
      <Carousel
      ref={carouselRef}
      swipeable={true}
      draggable={false}
      showDots={true}
      responsive={responsive}
      ssr={true}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={5000}
      keyBoardControl={true}
      arrows={true}
      customTransition="transform 500ms ease-in-out"
      transitionDuration={500}
      containerClass="carousel-container"
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
      // beforeChange={beforeChangeHandler}
  >
        {items?.map((item, index) => {
        const formatDate = (dateStr) => {
          const [year, month, day] = dateStr.split("-");
          const date = new Date(year, month - 1, day);
          const options = { day: 'numeric', month: 'short' };
          return date.toLocaleDateString('en-US', options);
        }    
        return(
          <div key={index} style={{height: '100%'}}>
            <div className="d-md-flex d-block w-100 p-3" style={{height: "100%"}}>
              <div className="imageContainer p-0 col-lg-6 col-12 col-md-7 mx-lg-5 my-md-5 mt-4" style={{width: "100%", border: "7px solid white", borderRadius: "15px", overflow: "hidden"}}>
                <div style={{background: `url(${item?.images_url}) no-repeat center/cover`, height: "100%", width: "100%", filter: "blur(3px)"}}></div>
                <img style={{position: "absolute", top: "50%", left: "50%",transform: "translate(-50%, -50%)", height: "100%", maxWidth: "100%"}} src={item?.images_url} alt=""/>
                </div>
                <div className="col-lg-5 p-0 col-md-5 d-flex flex-column justify-content-center pl-md-4">
                <h2 className="primary-header d-md-flex d-none mb-md-4 my-2 mt-md-0" style={{color: "white"}}>{item?.event_name}</h2>
                <p className="mb-1 d-md-flex d-none" style={{color: "white"}}><i className="fa-regular fa-paper-plane mr-2"></i>{item?.event_venue}</p>
                <p className=" d-md-flex d-none" style={{color: "white"}}><i className="fa-regular fa-calendar mr-2"></i>{item?.timings.slice(0,9)} • {formatDate(item?.date)} • {item?.day}</p>
                <div className="d-flex d-md-block mx-auto mx-md-0 mb-3 mt-1">
                  <button className="btn btn-primary px-4 rounded-pill my-3 py-2" onClick={()=>{navigate(`${item?.event_name}`)}} style={{background: "white", color: "black", fontWeight: "700"}}>See Tickets</button></div>
                </div>
                {/* <div className="col w-100"> */}
                {/* <div className="w-100 d-md-flex d-none justify-content-center align-items-center flex-column" style={{height: "100%"}}>
                  {items?.map((item, index) => {
                    console.log(activeSlide)
                    return(
                    <div className="col">
                    <div
                      key={index}
                      className={activeSlide === currentSlide === index ? "activeCarousel p-0 my-2 d-flex align-items-center" : " p-0 my-2 d-flex align-items-center"}
                      onClick={() => goToSlide(index)}
                      style={{width: "96px ", height: "56px", borderRadius: '10px'}}
                    >
                      <img src={item?.images_url} alt={item.title} style={{width: "100%", height: "100%", borderRadius: "10px"}}/>
                    </div>
                    </div>
                  )})}
                </div> */}
              {/* </div> */}

            </div>
          </div>
          )})}
        </Carousel>
            
            </>
            );
          };

  export default CarouselWithInfo;
