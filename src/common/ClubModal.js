import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useContext } from "react";
import { SingularContext } from "../contexts/Context";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function ClubModal(props) {
  const [clubItems, setClubItems] = useState(props.items || []); // set initial value for items to props.items
  const ImageType = props.type === "menu" ? "menu_images_url" : "image_url" 
  useEffect(() => {
    console.log("props.items changed:", props.items);
    setClubItems(props.items || []);
  }, [props.items]);

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

  const { clubsModal, setClubsModal } = useContext(SingularContext);

  const handleClose = () => setClubsModal(false);

  return (
    <Modal show={clubsModal} onHide={handleClose} centered maxWidth="lg">
      <Carousel
        swipeable={true}
        draggable={true}
        showDots={true}
        responsive={responsive}
        ssr={true}
        infinite={true}
        autoPlay={false}
        autoPlaySpeed={5000}
        keyBoardControl={true}
        arrows={true}
        customTransition="transform 500ms ease-in-out"
        transitionDuration={500}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {clubItems?.[ImageType]?.map((item, index) => {
          return (
            <div
              key={index}
              className="carousel-item-container"
            >
              <img className="carousel-item-image" style={{objectFit: props.type === "menu" ? "contain" : "cover" }} src={item} alt="club" />
            </div>
          );
        })}
      </Carousel>
    </Modal>
  );
}
