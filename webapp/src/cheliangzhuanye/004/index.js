import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import List from './List'

export const Index = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/车辆专业/004">
          <List />
        </Route>
      </Switch>
    </Router>
  )
}
