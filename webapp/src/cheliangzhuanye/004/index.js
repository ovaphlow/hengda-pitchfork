import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import List from './List'
import Save from './Save'
import SaveAlt from './SaveAlt'

export const Index = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/车辆专业/004">
          <List />
        </Route>

        <Route path="/车辆专业/004/新增">
          <Save />
        </Route>

        <Route path="/车辆专业/004/新增计划外">
          <SaveAlt />
        </Route>
      </Switch>
    </Router>
  )
}
