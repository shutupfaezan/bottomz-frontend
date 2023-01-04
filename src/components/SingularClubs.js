import React, { useEffect, useContext} from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'
import {SingularContext} from '../contexts/Context';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { BrowserView, MobileOnlyView, TabletView } from 'react-device-detect';
import MobileSingleClub from './MobileSingleClub';
import BrowserSingleClub from './BrowserSingleClub';
import TabSingleClub from './TabSingleClub';

export default function SingularClubs() {
    const {setClubVariable} = useContext(SingularContext);
    const params = useParams()
    const club = async ()=> { return await axios.get(`https://nightlife-2710.herokuapp.com/${params.name}`)}
    
    useEffect(() => {
        club()
        .then((response) => {
            setClubVariable(response?.data[0])
        })
        .catch((error) => {
            console.log(error);
        });
        //eslint-disable-next-line
    }, []);

  return (
    <>
      <BrowserView>
        <BrowserSingleClub/>
      </BrowserView>
      <TabletView>
        <TabSingleClub/>
      </TabletView>
      <MobileOnlyView>
        <MobileSingleClub/>
      </MobileOnlyView>
    </> 
  )
}
