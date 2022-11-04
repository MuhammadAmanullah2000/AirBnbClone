import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session.js';
import './Navigation.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
    <div>

      <button className="profileButton" onClick={openMenu}>
        <i className="fas fa-user-circle" /> Profile
      </button>
      {showMenu && (
        // <ul>
        <div>
          <span>Username: {user.username};</span>
          <span>   Email: {user.email};  </span>
          <span>
            <button className="logOutButton" onClick={logout}>Log Out</button>
          </span>
        </div>
      )}
      </div>
    </>
  );
}

export default ProfileButton;
