import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import Template from './Template'
import { Index as Index004 } from './004'

export const Index = () => {
  React.useEffect(() => {
    let a = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!a) {
      window.location = '#登录'
      return
    }
  }, [])

  return (
    <Router>
      <Switch>
        <Route exact path="/车辆专业">
          <Template />
        </Route>

        <Route path="/车辆专业/004"><Index004 /></Route>
      </Switch>
    </Router>
  )
}
