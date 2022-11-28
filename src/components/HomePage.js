import React from 'react'
import Header from '../common/Header'
import UserBar from '../common/UserBar'
import "../css/HomePage.css"
import Featured from './Featured'
import FooterUniversal from './FooterUniversal'

export default function HomePage() {
  return (
    <>
    <Header></Header>
    <UserBar></UserBar>
    <Featured></Featured>
    <FooterUniversal></FooterUniversal>
    </>
  )
}
