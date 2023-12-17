  import React, { useState, useEffect} from 'react'
  import GlobalHeader from '../../common/GlobalHeader'
  import Footer from "../../common/Footer"
  // import RenderEvents from '../UserComponents/RenderEvents'
  import axios from 'axios'
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

  function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
      <div className="rounded-circle" style={{ display: "block", background: "white", position: "absolute", left: "10px", top: "150px", zIndex: "2", padding: "10px 10px"}} onClick={onClick}>
        <svg style={{margin: "10px"}} xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
      </div>
    );
  }

  const closeModal = () => setShowDatePickerModal(false)
  
  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <div className="rounded-circle" style={{ display: "block", background: "white", position: "absolute", right: "10px", top: "150px", zIndex: "2 ", padding: "10px 10px"}} onClick={onClick}>
        <svg style={{margin: "10px"}} xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
      </div>
    );
  }
  console.log(recentEvents)
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
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          innerWidth: "100%"
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
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

  // const [loading, setloading] = useState(false)
  const [filteredEvents, setFilteredEvents] = useState([])

  const fetchData = async () => {
    try {
      // setloading(true)
      const response = await axios.get("https://nightlife-2710.herokuapp.com/events")
      console.log(response?.data)
      setRecentEvents(response?.data)
      // setloading(false)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

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
        <section className="p-2" style={{height: "500px"}}>
          <div style={{height: "100%", borderRadius: "20px", backgroundImage: `url(${process.env.PUBLIC_URL}/images/AllEventsheaderImg.png)`, backgroundSize: "cover", backgroundPosition: "center"}}>
            <div style={{height: "100%", borderRadius: "20px", backgroundImage: `url(${process.env.PUBLIC_URL}/images/AllEventsLowerMask.png)`, backgroundSize: "cover", backgroundPosition: "center"}}>
              <div className="" style={{color: "white"}}>
                <div style={{paddingTop: "110px"}}>
                  <Breadcrumb/>
                  <div className='text-center mt-5 px-5 mx-5'>
                    <h1 className='headerFont' style={{fontSize: "60px"}}>Upcoming Events</h1>
                    <p className='mx-5 px-5' style={{fontWeight: "400", color: "rgba(255, 255, 255, 0.5)"}}>Spice up your day even if its a boring wednesday or chilling friday. See you nearest events, chose one and just go. These eevnts are carefully vetted to ensure public safety.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="p-2">
        <div className="d-flex mx-auto justify-content-center mt-5 mb-3" style={{ gap: "10px" }}>
          <button className="btn px-3 py-2" style={{  background: startDate && endDate ? "black" : "rgba(0, 0, 0, 0.1)", borderRadius: "60px", color: startDate && endDate ? "white" : "black", border: "1px solid rgba(0, 0, 0, 1)", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setShowDatePickerModal(true)}>
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
        </div>
          <div className="d-flex flex-wrap mb-3">
            <div className="d-flex mx-auto justify-content-center mb-5" style={{ gap: "10px"}}>
              {genres.map(genre => (
                <button className="btn px-3 py-2" style={{ background: selectedGenre === genre ? "black" : "rgba(0, 0, 0, 0.1)", borderRadius: "60px", color: selectedGenre === genre ? "white" : "black", border: "1px solid rgba(0, 0, 0, 1)", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center"}} key={genre} onClick={() => setSelectedGenre(genre)}>
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
                <p className='px-md-4 px-2 ml-2 mb-2' style={{ fontWeight: 700, fontSize: "18px" }}>
                  {formatDate(date)}
                </p>
                {events.length >= 4 ? (
                  <Slider {...settings}>
                    {events.map((event, index) => (
                      <div className="p-2 col-lg-12" key={index}>
                        <HPEvents identity={event} index={index} />
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <div className="d-flex    ">
                    {events.map((event, index) => (
                      <div className="p-2 col-lg-3" key={index}>
                        <HPEvents identity={event} index={index} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
        <Footer/>
      </div>
      </>
    )
  }
