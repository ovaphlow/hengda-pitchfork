import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'

import Home from './Home'

export const Index = () => {
  React.useEffect(() => {
    console.info(1111)
    let a = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!a) {
      window.location = '#登录'
      return
    }
  })

  return (
    <HashRouter>
      <Switch>
        <Route path="/帐项" component={Home} />
      </Switch>
    </HashRouter>
  )
}
