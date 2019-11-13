import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import Template from './Template'

export const Index = () => {
  React.useEffect(() => {
    let a = JSON.parse(sessionStorage.getItem('auth_super'))
    if (!!!a) {
      window.location = '#数据管理/登录'
      return
    }
  }, [])

  return (
    <Router>
      <Switch>
        <Route exact path="/职工培训">
          <Template />
        </Route>
      </Switch>
    </Router>
  )
}
