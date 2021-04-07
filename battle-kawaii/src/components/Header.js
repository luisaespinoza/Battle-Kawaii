

import React, {useEffect} from 'react';
// import './Header.scss'
import { Link } from 'react-router-dom'
import './Header.scss'
// import useRecoilState hook
import { useRecoilState } from "recoil"
// importing the atom that controls global state
import { userState } from "../recoil/atoms"

import AuthModel from "../models/AuthModel"

  const Header = () => {
    const [user, setUser] = useRecoilState(userState)
  
    useEffect(function () {
      if (localStorage.getItem("uid")) {
        AuthModel.verify().then((response) => {
          setUser(response.user)
        })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  

  // logout will set global userState to null
  function logout() {
    setUser(null)
    localStorage.clear()
  }

  
  return (
    <header>
      <div className="logo">
        <Link to={'/'}>Games!</Link>
      </div>
      <div className="links">
        <ul>
          { user ? (
            <>
              <li><Link to={'/games'}>All Games</Link></li>
              <li><Link to={'/games/new'}>Add New Game</Link></li>
              <li className="btn" onClick={ logout }>Log out</li>
            </>
          ) : (
            <>
              <li><Link to={'/login'}>Log In</Link></li>
              <li><Link to={'/register'}>Register</Link></li>
            </>
          ) }
        </ul>
      </div>
    </header>
  );
}

export default Header;
