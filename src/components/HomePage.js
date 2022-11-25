import React from 'react'
import Header from '../common/Header'
import UserBar from '../common/UserBar'
import "../css/HomePage.css"
import ClubsRow from './ClubsRow'

export default function HomePage() {
  return (
    <>
    <Header></Header>
    <UserBar></UserBar>
    <ClubsRow></ClubsRow>
    </>
  )
}
