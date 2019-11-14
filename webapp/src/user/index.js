import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'

import Info from './Info'
import Signature from './Signature'

export const Index = () => {
  React.useEffect(() => {
    let a = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!a) {
      window.location = '#登录'
      return
    }
  })

  return (
    <HashRouter>
      <Switch>
        <Route exact path='/用户'>
          <Info />
        </Route>

        <Route path='/用户/用户信息'>
          <Info />
        </Route>

        <Route path='/用户/设置签名'>
          <Signature />
        </Route>
      </Switch>
    </HashRouter>
  )
}
