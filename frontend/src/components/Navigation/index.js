import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton.js';
import './Navigation.css';
import AllSpots from '../Spots/SpotsShow.js';
import { useHistory } from 'react-router-dom';
// import UpdatingSpot from '../Spots/UpdateSpot.js';
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAirbnb} from "@fortawesome/free-brands-svg-icons"

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();
  function showAllSpots(){
    history.push('/')
  }
  function createASpot(){
    history.push('/spots/create')
  }
  // function createABooking(){
  //   history.push('/bookings/create')
  // }
  function showAllBookings(){
    history.push('/bookings/current')
  }
  // function editing(){
  //   history.push('/spots/update')
  // }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
      {/* <button onClick={showAllSpots}>All Spots</button> */}
       <button className='airBnbButton' onClick={showAllSpots}><FontAwesomeIcon icon={faAirbnb}></FontAwesomeIcon>  airbnb</button>
      <button className='makeSpot' onClick={createASpot}>Make a new spot</button>
      {/* <button onClick={createABooking}>Make a new booking</button> */}
      <button className='showBookings'onClick={showAllBookings}>Show All Bookings</button>
      <ProfileButton user={sessionUser} />
      {/* <button onClick={editing}>Update</button> */}
      </>
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
        <button onClick={showAllSpots}><FontAwesomeIcon icon={faAirbnb}></FontAwesomeIcon></button>
      </>
    );
  }

  return (
    <div className='box'>

    <ul>
      <li>
        {/* <NavLink exact to="/">Home</NavLink> */}
        {isLoaded && sessionLinks}
      </li>
    </ul>
    </div>
  );
}

export default Navigation;
