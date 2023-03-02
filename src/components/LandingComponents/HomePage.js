import React from 'react'
import Footer from '../../common/Footer'
import Header from '../../common/Header'
import "../../css/HomePage.css"
import Featured from './Featured'
import Newsletter from './Newsletter'


export default function HomePage() {
  return (
    <>
      <Header></Header>
      <Featured></Featured>
        <Newsletter></Newsletter>
      <Footer></Footer>
    </>
  )
}
