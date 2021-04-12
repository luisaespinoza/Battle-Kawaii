

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
      <img className='cloud' src="https://react-kawaii.vercel.app/57b7927ff69b4a4c52239da6edd24e3e.svg" alt=""/>
        <Link to={'/'}>Home</Link>
      </div>
      <div className="links">
        <img className='cloud' src="https://react-kawaii.vercel.app/57b7927ff69b4a4c52239da6edd24e3e.svg" alt=""/>
        <ul>
          { user ? (
            <>
            {/* For planned PVP feature in the future */}
              {/* <li><Link to={'/games'}>All Games</Link></li> */}
              <li><Link to={'/games/new'}>New Game</Link></li>
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
