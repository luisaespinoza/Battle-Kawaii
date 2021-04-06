import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { useRecoilValue } from 'recoil'
import { loggedInState } from '../recoil/selectors'

import Home from '../pages/Home'
import GameList from '../pages/GameList'
import GameShow from '../pages/GameShow'
import NewGame from '../pages/NewGame'
import Register from "../pages/Register";
import Login from "../pages/Login";

const Routes = () => {
  // get the user state with useRecoilValue
  const loggedIn = useRecoilValue(loggedInState)

  return (
    <Switch>
          <Switch>
      <Route exact path='/' component={ Home } />
      <Route exact path='/register' component={Register} />
      <Route exact path='/login' component={Login} />
      {/* this conditional checks for a valid user and renders components if found */}
      { loggedIn && (
        // we wrap routes in an additional Switch to make sure they don't render at once
        <Switch>
          <Route path="/games/new" component={ NewGame } />
          <Route path='/games/:id' component={ GameShow } />
          <Route path='/games' component={ GameList } />
        </Switch>
      ) }
    </Switch>
    </Switch>
  )
}

export default Routes