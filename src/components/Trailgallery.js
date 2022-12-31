import React from 'react'
import Gallery from "react-photo-gallery";

export default function Trailgallery() {
    const photos = [
        {
          src: 'http://img1.10bestmedia.com/Images/Photos/284863/Create-Nightclub-3_54_990x660.jpg',
          width: 2,
          height: 1
        },
        {
          src: 'http://img1.10bestmedia.com/Images/Photos/284863/Create-Nightclub-3_54_990x660.jpg',
          width: 2,
          height: 1
        },
        {
          src: 'http://img1.10bestmedia.com/Images/Photos/284863/Create-Nightclub-3_54_990x660.jpg',
          width: 2,
          height: 1
        },
        {
          src: 'http://img1.10bestmedia.com/Images/Photos/284863/Create-Nightclub-3_54_990x660.jpg',
          width: 2,
          height: 1
        },
        {
          src: 'https://pbs.twimg.com/media/CwXzVqkXgAQ8UQC.jpg:large',
          width: 1,
          height: .5
        }
      ];
  return (
    <div>
    <Gallery photos={photos} />;
    </div>
  )
}
