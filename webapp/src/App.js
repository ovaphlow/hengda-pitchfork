import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './Home'
import SignIn from './SignIn'
import { Index as MDSIndex } from './mds'
import { Index as ZhangXiangIndex } from './zhangxiang'
import { Index as UserIndex } from './user'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/登录">
          <SignIn />
        </Route>

        <Route path="/帐项">
          <ZhangXiangIndex />
        </Route>

        <Route path="/数据管理">
          <MDSIndex />
        </Route>

        <Route path="/用户">
          <UserIndex />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
