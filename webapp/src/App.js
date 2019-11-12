import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'

import Home from './Home'
import SignIn from './SignIn'
import { Index as MDSIndex } from './mds'
import { Index as ZhangXiangIndex } from './zhangxiang'
import { Index as UserIndex } from './user'

const App = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/登录">
          <SignIn />
        </Route>

        <Route exact path="/帐项">
          <ZhangXiangIndex />
        </Route>

        <Route exact path="/数据管理">
          <MDSIndex />
        </Route>

        <Route exact path="/用户">
          <UserIndex />
        </Route>
      </Switch>
    </HashRouter>
  )
}

export default App
