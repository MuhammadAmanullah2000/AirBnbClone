import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import AllSpots from '../Spots/SpotsShow';
import { useHistory } from 'react-router-dom';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();
  function showAllSpots(){
    history.push('/spots')
  }
  function createASpot(){
    history.push('/spots/create')
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
      <ProfileButton user={sessionUser} />
      <button onClick={showAllSpots}>All Spots</button>
      <button onClick={createASpot}>Make a new spot</button>
      </>
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
        <button onClick={showAllSpots}>All Spots</button>
      </>
    );
  }

  return (
    <div className='box'>
    <ul>
      <li>
        <NavLink exact to="/">Home</NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
    </div>
  );
}

export default Navigation;
