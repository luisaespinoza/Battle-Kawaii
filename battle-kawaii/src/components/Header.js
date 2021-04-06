// import React, { Component } from 'react'
// import {Link} from 'react-router-dom'
// import {useRecoilState} from 'recoil'
// import { userState } from '../recoil/atoms'

// export default class Header extends Component {
//   render() {
//     return (
//       <header>
//         <h1>Battle Kawaii</h1>
//         <nav>
//           <Link>Battle Kawaii</Link>
//           <Link>My Games</Link>
//           <Link>Login</Link>
//           <Link>Logout</Link>
//         </nav>
//       </header>
//     )
//   }
// }

import React from 'react';
// import './Header.scss'
import { Link } from 'react-router-dom'

// import useRecoilState hook
import { useRecoilState } from "recoil"
// importing the atom that controls global state
import { userState } from "../recoil/atoms"

const Header = () => {
  const [user, setUser] = useRecoilState(userState)

  // write a function that sets the userState to a fake user
  function login() {
    const dbUser = {
      username: "Test user",
      avatar: "https://gamespot1.cbsistatic.com/uploads/scale_landscape/1587/15875866/3660435-avatar.jpg"
    }
    setUser(dbUser)
  }

  // logout will set global userState to null
  function logout() {
    setUser(null)
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
            <li className="btn" onClick={ login }>Log In</li>
          ) }
        </ul>
      </div>
    </header>
  );
}

export default Header;
