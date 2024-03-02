import React, { useState, useEffect} from 'react'
import GlobalHeader from '../../common/GlobalHeader'
import Footer from "../../common/Footer"
// import RenderEvents from '../UserComponents/RenderEvents'
import axios from 'axios'
import { Range } from 'react-range';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import  Breadcrumb  from '../../extra/Breadcrumb';
import Modal from 'react-bootstrap/Modal';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "../../css/AllEvents.css"
// import CarouselWithInfo from '../../common/CarouselWithInfo'
import HPEvents from '../LandingComponents/HPEvents';

export default function AllEvents() {
  // eslint-disable-next-line
const [showDatePickerModal, setShowDatePickerModal] = useState(false);
const [searchTerm, setSearchTerm] = useState('')
const [recentEvents, setRecentEvents] = useState([])
const [currentSlide, setCurrentSlide] = useState(0);
const [selectedGenre, setSelectedGenre] = useState('All');
const [genres, setGenres] = useState([]);
const [startDate, setStartDate] = useState(null);
const [endDate, setEndDate] = useState(null);
const [showPriceModal, setShowPriceModal] = useState(false);
const [priceRange, setPriceRange] = useState([0, 100]); // Actual price range for filtering
const [tempPriceRange, setTempPriceRange] = useState([0, 100]); // Temporary price range for modal
const [maxPrice, setMaxPrice] = useState(100); // Maximum price from events

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div className="rounded-circle" style={{ display: "block", background: "white", position: "absolute", left: "10px", top: "150px", zIndex: "2", padding: "10px 10px"}} onClick={onClick}>
      <svg style={{margin: "10px"}} xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
    </div>
  );
}


function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div className="rounded-circle" style={{ display: "block", background: "white", position: "absolute", right: "10px", top: "150px", zIndex: "2 ", padding: "10px 10px"}} onClick={onClick}>
      <svg style={{margin: "10px"}} xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
    </div>
  );
}
console.log(recentEvents)
// setting
const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  afterChange: (current) => {setCurrentSlide(current); console.log(current)},
  nextArrow: currentSlide < recentEvents?.length - 1 ? <SampleNextArrow /> : null,
  prevArrow: currentSlide > 0 ? <SamplePrevArrow /> : null,
  responsive: [
    {
      breakpoint: 2810,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
        innerWidth: "100%"
      }
    },
    {
      breakpoint: 2300,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
        innerWidth: "100%"
      }
    },
    {
      breakpoint: 1367,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
        innerWidth: "100%"
      }
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
        innerWidth: "100%"
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1.2,
        nextArrow: false,
        prevArrow: false,
        dots: true,
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1.2,
        nextArrow: false,
        prevArrow: false,
        dots: true,
      }
    }
  ]
};

useEffect(() => {
  const allGenres = recentEvents
    .flatMap(event => event.genre.split(','))
    .map(genre => genre.trim());
  const uniqueGenres = ['All', ...new Set(allGenres)];
  setGenres(uniqueGenres);
}, [recentEvents]);

// Update filteredEvents logic to include genre filtering
  useEffect(() => {
    const filteredByGenre = recentEvents.filter(event => 
      selectedGenre === 'All' || event.genre.split(',').map(g => g.trim()).includes(selectedGenre)
    );

  const filteredByDate = filteredByGenre.filter(event => {
    if (!startDate || !endDate) return true;
    const eventDate = new Date(event.date);
    return eventDate >= startDate && eventDate <= endDate;
  });

  setFilteredEvents(filteredByDate);
}, [selectedGenre, recentEvents, startDate, endDate]);

useEffect(() => {
  const filteredByPrice = recentEvents.filter(event =>
    event.price_range >= priceRange[0] && event.price_range <= priceRange[1]
  );
  setFilteredEvents(filteredByPrice);
}, [priceRange, recentEvents]);

const applyPriceFilter = () => {
  if (tempPriceRange) {
    setPriceRange(tempPriceRange);
  }
  setShowPriceModal(false);
};

const handleRangeChange = (values) => {
  setTempPriceRange(values);
};

// const [loading, setloading] = useState(false)
const [filteredEvents, setFilteredEvents] = useState([])

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get("https://nightlife-2710.herokuapp.com/events");
      setRecentEvents(response?.data);
      const maxEventPrice = response?.data.reduce((max, event) => Math.max(max, event.price_range), 0);
      setMaxPrice(maxEventPrice);
      setPriceRange([0, maxEventPrice]);
      setTempPriceRange([0, maxEventPrice]);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };
  fetchData();
}, []);

// Normal filter by date to display
useEffect(() => {
  setFilteredEvents(
    recentEvents.filter(event =>
      event.event_name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )
}, [searchTerm, recentEvents])

const result = {}
for (const obj of filteredEvents) {
  const key = obj.date
  if (!result[key]) {
    result[key] = [obj]
  } else {
    result[key].push(obj)
  }
}
// Components that handle Date filter
const handleDateChange = (dates) => {
  const [start, end] = dates;
  setStartDate(start);
  setEndDate(end);
};

const clearDates = (e) => {
  e.stopPropagation();
  setStartDate(null);
  setEndDate(null);
};

const formatDateForDisplay = (date) => {
  if (!date) return '';
  // Format the date as 'MMM DD' (e.g., 'Dec 18')
  const options = { month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

const formatDate = (dateStr) => {
  const [year, month, day] = dateStr.split("-")
  const date = new Date(year, month - 1, day)
  const options = {year: 'numeric', month: 'long', day: 'numeric'}
  return date.toLocaleDateString('en-US', options)
}
  return (
    <>
    <div className=''>
      <GlobalHeader/>
      <section className="p-2 alleventsheader" style={{height: "500px"}}>
        <div style={{height: "100%", borderRadius: "20px", backgroundImage: `url(${process.env.PUBLIC_URL}/images/AllEventsheaderImg.png)`, backgroundSize: "cover", backgroundPosition: "center"}}>
          <div style={{height: "100%", borderRadius: "20px", backgroundImage: `url(${process.env.PUBLIC_URL}/images/AllEventsLowerMask.png)`, backgroundSize: "cover", backgroundPosition: "center"}}>
            <div className="" style={{color: "white"}}>
              <div style={{paddingTop: "110px"}}>
                <Breadcrumb/>
                <div className='text-center mt-5 px-lg-5 mx-md-5 px-4'>
                  <h1 className='headerFont headerTitle'>Upcoming Events</h1>
                  <p className='mx-md-5 px-lg-5' style={{fontWeight: "400", color: "rgba(255, 255, 255, 0.5)"}}>Say "FUCK YOU" to the world, Search for events, find one that interest you and just leave.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="p-lg-2 px-md-5 py-md-2">
      <div className='mx-3 mt-3 d-block d-md-none'><small>Filters</small></div>
        <div className="d-flex mx-md-auto justify-content-md-center mt-md-5 mt-2 mb-2 mx-3" style={{ gap: "10px" }}>
          <button className=" px-3 py-2" style={{  background: startDate && endDate ? "black" : "rgba(0, 0, 0, 0.1)", borderRadius: "60px", color: startDate && endDate ? "white" : "black", border: "2px solid rgba(0, 0, 0, 1)", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setShowDatePickerModal(true)}>
            <i className="fa-solid fa-calendar mr-2"></i>
            {startDate && endDate ? `${formatDateForDisplay(startDate)} - ${formatDateForDisplay(endDate)}` : 'Date'}
            {startDate && endDate && (
              <span onClick={(e) => clearDates(e)} style={{ paddingLeft: "10px", cursor: "pointer" }}>
                &#x2715;
              </span>
            )}
          </button>
          {showDatePickerModal && (
            <Modal show={showDatePickerModal} onHide={() => setShowDatePickerModal(false)}>
              <DatePicker selectsRange startDate={startDate} endDate={endDate} onChange={(dates) => handleDateChange(dates)} inline />
              <button className='btn col-lg-6 rounded-pill my-3 mx-auto' onClick={() => setShowDatePickerModal(false)} style={{ background: "black", color: "white" }}>Save</button>
            </Modal>
          )}
          <button 
            className="px-3 py-2" 
            style={{  
              background: priceRange[0] === 0 && priceRange[1] === maxPrice ? "rgba(0, 0, 0, 0.1)" : "black", 
              borderRadius: "60px", 
              color: priceRange[0] === 0 && priceRange[1] === maxPrice ? "black" : "white", 
              border: "2px solid rgba(0, 0, 0, 1)", 
              fontSize: "14px", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center" 
            }}
            onClick={() => setShowPriceModal(true)}
          >
          {priceRange[0] === 0 && priceRange[1] === maxPrice ? <img className='mr-2' src={process.env.PUBLIC_URL + "/images/rupeevector icon.png"} style={{width: "15px"}} alt=""></img> : <img className='mr-2' src={process.env.PUBLIC_URL + "/images/rupeevector icon_inverted.png"} style={{width: "15px"}} alt=""></img>}
          {priceRange[0] === 0 && priceRange[1] === maxPrice ? 'Price' : `₹ ${priceRange[0]} - ₹ ${priceRange[1]}`}
          </button>
          {showPriceModal && (
            <Modal show={showPriceModal} onHide={() => setShowPriceModal(false)}>
              <div className='p-3'>
                <div>
                  <p className='para-margin-pricerange' style={{fontWeight: "800", fontSize: "18px", marginBottom: "0px"}}>Price Range</p>
                  <p style={{fontSize: "14px", color: "rgba(157, 157, 157, 1)"}}>Average Price: ₹{
                    (tempPriceRange ? tempPriceRange[1] : priceRange[1]) / 2
                  }</p>
                  <button className="position-absolute d-flex justify-content-center align-items-center" style={{ height: "28px", width: "28px", border: "solid black 1px", borderRadius: "50%", backgroundColor: "transparent", color: "black", top: "10%", right: "5%"}} onClick={() => setShowPriceModal(false)}>&#x2715;</button>
                </div>
                <Range
                    step={1}
                    min={0}
                    max={maxPrice}
                    values={tempPriceRange || priceRange}
                    onChange={handleRangeChange}
                    renderTrack={({ props, children }) => (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: '6px',
                          width: '100%',
                          backgroundColor: 'rgba(224, 232, 241, 1)'
                        }}
                      >
                        {children}
                      </div>
                    )}
                    renderThumb={({ props }) => (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: '20px',
                          width: '20px',
                          backgroundColor: 'rgba(0, 98, 252, 1)',
                          border: '4px solid #fff',
                          boxShadow: "0px 4px 5px rgba(24, 39, 75, 0.08)",
                          borderRadius: '50%'
                        }}
                      >
                      </div>
                    )}
                  />
                  <p>Selected range: ₹{tempPriceRange ? tempPriceRange[0] : priceRange[0]} - ₹{tempPriceRange ? tempPriceRange[1] : priceRange[1]}</p>
                  <button className='btn' onClick={applyPriceFilter}>Apply</button>
                </div>
              </Modal>
          )}
        </div>
        <div className="d-flex flex-wrap mb-3 overflow-hidden">
          <div className='mx-3 my-2 d-block d-md-none'><small>Select by genre</small></div>
          <div className="ml-3 ml-md-0 d-flex mx-md-auto justify-content-md-center mb-5 overflow-scroll" style={{ gap: "10px"}}>
            {genres.map(genre => (
              <button className="px-3 py-2 text-nowrap" style={{ background: selectedGenre === genre ? "black" : "rgba(0, 0, 0, 0.1)", borderRadius: "60px", color: selectedGenre === genre ? "white" : "black", border: "1px solid rgba(0, 0, 0, 1)", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center"}} key={genre} onClick={() => setSelectedGenre(genre)}>
                {genre}
                {selectedGenre === genre && selectedGenre !== "All" && (
                  <span onClick={(e) => { e.stopPropagation(); setSelectedGenre('All')}} style={{ paddingLeft: "10px", cursor: "pointer" }}>
                    &#x2715;
                  </span>
                )}
              </button>
            ))}
          </div>
          {Object.entries(result).map(([date, events]) => (
            <div className="w-100 px-lg-3 mb-4" key={date}>
              <p className='px-md-4 px-4 ml-2 mb-2' style={{ fontWeight: 700, fontSize: "18px" }}>
                {formatDate(date)}
              </p>
              <div className='d-md-block px-4 px-md-0'>
              {events.length >= 4 ? (
                <Slider {...settings}>
                  {events.map((event, index) => (
                    <div className="p-2 px-md-2 col-lg-12" key={index}>
                      <HPEvents identity={event} index={index} />
                    </div>
                  ))}
                </Slider>
              ) : (
                <div className="d-md-flex">
                  {events.map((event, index) => (
                    <div className="p-2 col-lg-3 col-md-6" key={index}>
                      <HPEvents identity={event} index={index} />
                    </div>
                  ))}
                </div>
              )}
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer/>
    </div>
    </>
  )
}
